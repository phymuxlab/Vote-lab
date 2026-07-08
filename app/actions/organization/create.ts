"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function createOrganization(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name")?.toString().trim();

  const description =
    formData.get("description")?.toString().trim() ?? "";

  if (!name) {
    throw new Error("Organization name is required.");
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const { error } = await supabase
    .from("organizations")
    .insert({
      owner_id: user.id,
      name,
      slug,
      description,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/organizations");

  redirect("/dashboard/organizations");
}