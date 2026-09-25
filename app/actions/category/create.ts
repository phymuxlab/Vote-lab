"use server";

import { redirect } from "next/navigation";
import { createCategory } from "@/lib/categories";
import { requireElectionOwner } from "@/lib/auth/authorization";
import { cleanText, requiredText } from "@/lib/validation";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function createCategoryAction(formData: FormData) {
  const organizationId = requiredText(formData.get("organization_id"), "Organization", 64);
  const electionId = requiredText(formData.get("election_id"), "Election", 64);
  await requireElectionOwner(electionId);
  await enforceRateLimit(`create-category:${electionId}`, 30, 3600);

  const name = requiredText(formData.get("name"), "Category name", 120);
  const description = cleanText(formData.get("description"), 1000);
  const maxVotes = Number(formData.get("max_votes") ?? 1);
  if (!Number.isInteger(maxVotes) || maxVotes < 1 || maxVotes > 50) throw new Error("Maximum votes must be between 1 and 50.");

  await createCategory({ election_id: electionId, name, description, max_votes: maxVotes });
  redirect(`/dashboard/organizations/${organizationId}/elections/${electionId}`);
}
