"use server";

import { revalidatePath } from "next/cache";

import { castVote } from "@/lib/votes";

export async function castVoteAction(
  formData: FormData
) {
  await castVote({
    election_id:
      formData.get("election_id") as string,

    category_id:
      formData.get("category_id") as string,

    nominee_id:
      formData.get("nominee_id") as string,
  });

  revalidatePath("/");
}