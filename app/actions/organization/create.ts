"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/storage";

export async function createOrganization(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name")?.toString().trim();

  if (!name) {
    throw new Error("Organization name is required.");
  }

  const description =
    formData.get("description")?.toString() ?? "";

  const motto =
    formData.get("motto")?.toString() ?? "";

  const website =
    formData.get("website")?.toString() ?? "";

  const contact_email =
    formData.get("contact_email")?.toString() ?? "";

  const theme_color =
    formData.get("theme_color")?.toString() ?? "#06B6D4";

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const logo = formData.get("logo") as File | null;
  const banner = formData.get("banner") as File | null;

  let logo_url = "";
  let banner_url = "";

  if (logo && logo.size > 0) {
    logo_url = await uploadImage(
      "organization-assets",
      logo,
      "logos"
    );
  }

  if (banner && banner.size > 0) {
    banner_url = await uploadImage(
      "organization-assets",
      banner,
      "banners"
    );
  }

  const { error } = await supabase
    .from("organizations")
    .insert({
      owner_id: user.id,
      name,
      slug,
      description,
      motto,
      website,
      contact_email,
      theme_color,
      logo_url,
      banner_url,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/organizations");

  redirect("/dashboard/organizations");
}