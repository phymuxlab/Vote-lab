"use server";

import { redirect } from "next/navigation";

import { createCategory } from "@/lib/categories";

export async function createCategoryAction(
  formData: FormData
) {
  const organizationId =
    formData.get("organization_id") as string;

  const election_id =
    formData.get("election_id") as string;

  const name =
    formData.get("name") as string;

  const description =
    formData.get("description") as string;

  const max_votes = Number(
    formData.get("max_votes")
  );

  await createCategory({
    election_id,
    name,
    description,
    max_votes,
  });

  redirect(
    `/dashboard/organizations/${organizationId}/elections/${election_id}`
  );
}