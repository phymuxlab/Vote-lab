"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/storage";

export async function updateOrganization(
  formData: FormData
) {
  const supabase = await createClient();

  const organizationId = formData
    .get("organizationId")
    ?.toString();

  if (!organizationId) {
    throw new Error("Organization not found.");
  }

  const name =
    formData.get("name")?.toString() ?? "";

  const motto =
    formData.get("motto")?.toString() ?? "";

  const description =
    formData.get("description")?.toString() ?? "";

  const website =
    formData.get("website")?.toString() ?? "";

  const contact_email =
    formData.get("contact_email")?.toString() ?? "";

  const theme_color =
    formData.get("theme_color")?.toString() ??
    "#06B6D4";

  const logo =
    formData.get("logo") as File | null;

  const banner =
    formData.get("banner") as File | null;

  const updateData: Record<string, any> = {
    name,
    motto,
    description,
    website,
    contact_email,
    theme_color,
  };

  if (logo && logo.size > 0) {
    updateData.logo_url =
      await uploadImage(
        "organization-assets",
        logo,
        "logos"
      );
  }

  if (banner && banner.size > 0) {
    updateData.banner_url =
      await uploadImage(
        "organization-assets",
        banner,
        "banners"
      );
  }

  const { error } = await supabase
    .from("organizations")
    .update(updateData)
    .eq("id", organizationId);

  if (error) {
    throw error;
  }

  revalidatePath(
    `/dashboard/organizations/${organizationId}`
  );

  revalidatePath(
    `/dashboard/organizations/${organizationId}/settings`
  );

  revalidatePath("/dashboard/organizations");
}