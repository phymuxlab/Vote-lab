"use server";

import { redirect } from "next/navigation";
import { createNominee } from "@/lib/nominees";
import { requireCategoryOwner } from "@/lib/auth/authorization";
import { cleanText, requiredText } from "@/lib/validation";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function createNomineeAction(formData: FormData) {
  const organizationId = requiredText(formData.get("organization_id"), "Organization", 64);
  const electionId = requiredText(formData.get("election_id"), "Election", 64);
  const categoryId = requiredText(formData.get("category_id"), "Category", 64);

  const { category } = await requireCategoryOwner(categoryId);
  if (category.election_id !== electionId) throw new Error("Category does not belong to this election.");

  await enforceRateLimit(`create-nominee:${electionId}`, 100, 3600);

  const fullName = requiredText(formData.get("full_name"), "Nominee name", 120);
  const biography = cleanText(formData.get("biography"), 2000);
  const imageUrl = cleanText(formData.get("image_url"), 2048);

  if (imageUrl && !/^https:\/\//i.test(imageUrl)) {
    throw new Error("Nominee image URL must use HTTPS.");
  }

  await createNominee({
    category_id: categoryId,
    full_name: fullName,
    biography,
    image_url: imageUrl,
  });

  redirect(`/dashboard/organizations/${organizationId}/elections/${electionId}`);
}
