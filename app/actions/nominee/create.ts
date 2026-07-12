"use server";

import { redirect } from "next/navigation";

import { createNominee } from "@/lib/nominees";

export async function createNomineeAction(
  formData: FormData
) {
  const organizationId =
    formData.get("organization_id") as string;

  const electionId =
    formData.get("election_id") as string;

  const categoryId =
    formData.get("category_id") as string;

  const full_name =
    formData.get("full_name") as string;

  const biography =
    formData.get("biography") as string;

  const image_url =
    formData.get("image_url") as string;

  await createNominee({
    category_id: categoryId,
    full_name,
    biography,
    image_url,
  });

  redirect(
    `/dashboard/organizations/${organizationId}/elections/${electionId}/categories/${categoryId}`
  );
}