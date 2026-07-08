"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function createOrganization(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const name = formData.get("name") as string;

  const description =
    (formData.get("description") as string) ?? "";

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const { error } = await supabase
    .from("organizations")
    .insert({
      owner_id: user.id,
      name,
      slug,
      description,
    });

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath("/dashboard/organizations");

  return {
    success: true,
  };
}