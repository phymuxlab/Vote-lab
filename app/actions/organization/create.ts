"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/storage";
import { cleanText, normaliseEmail, optionalText, safeHexColour, safeUrl } from "@/lib/validation";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function createOrganization(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  await enforceRateLimit(`create-organization:${user.id}`, 10, 3600);

  const name = cleanText(formData.get("name"), 120);
  if (!name) throw new Error("Organization name is required.");

  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
  const slug = `${baseSlug || "organization"}-${crypto.randomUUID().slice(0, 8)}`;
  const contactEmailRaw = cleanText(formData.get("contact_email"), 254);
  const contactEmail = contactEmailRaw ? normaliseEmail(contactEmailRaw) : null;

  const { data: organization, error } = await supabase
    .from("organizations")
    .insert({
      owner_id: user.id,
      name,
      slug,
      description: optionalText(formData.get("description"), 1000),
      motto: optionalText(formData.get("motto"), 160),
      website: safeUrl(formData.get("website")),
      contact_email: contactEmail,
      theme_color: safeHexColour(formData.get("theme_color") ?? "#06B6D4"),
    })
    .select("id")
    .single();

  if (error || !organization) throw new Error("Unable to create organization.");

  try {
    const logo = formData.get("logo") as File | null;
    const logoUrl = logo?.size ? await uploadImage("organization-assets", logo, organization.id, "logos") : null;

    if (logoUrl) {
      const { error: assetError } = await supabase
        .from("organizations")
        .update({ logo_url: logoUrl })
        .eq("id", organization.id);
      if (assetError) throw assetError;
    }
  } catch (error) {
    await supabase.from("organizations").delete().eq("id", organization.id);
    throw error instanceof Error ? error : new Error("Unable to save organization assets.");
  }

  revalidatePath("/dashboard/organizations");
  redirect("/dashboard/organizations");
}
