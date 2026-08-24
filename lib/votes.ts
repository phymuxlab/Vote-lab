import { createClient } from "@/lib/supabase/server";

import { getVotingSession, clearVotingSession } from "@/lib/voting-session";
import { markTokenAsUsed } from "@/lib/voter-tokens";

export async function castVote(data: {
  election_id: string;
  category_id: string;
  nominee_id: string;
}) {
  const session =
    await getVotingSession();

  if (!session) {
    throw new Error(
      "Voting session not found."
    );
  }

  if (
    session.electionId !==
    data.election_id
  ) {
    throw new Error(
      "Invalid voting session."
    );
  }

  const supabase =
    await createClient();

  // Prevent duplicate voting in this category

  const {
    data: existingVote,
  } = await supabase
    .from("votes")
    .select("id")
    .eq("voter_id", session.voterId)
    .eq("category_id", data.category_id)
    .maybeSingle();

  if (existingVote) {
    throw new Error(
      "You have already voted in this category."
    );
  }

  const { error } =
    await supabase
      .from("votes")
      .insert({
        election_id:
          data.election_id,

        category_id:
          data.category_id,

        nominee_id:
          data.nominee_id,

        voter_id:
          session.voterId,
      });

  if (error) throw error;

  // Consume the one-time token

  await markTokenAsUsed(
    session.tokenId
  );

  // Remove browser session

  await clearVotingSession();
}

export async function getCategoryResults(
  categoryId: string
) {
  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("nominees")
      .select(
        `
        *,
        votes (
          id
        )
      `
      )
      .eq(
        "category_id",
        categoryId
      );

  if (error) throw error;

  return data.map((nominee) => ({
    ...nominee,
    voteCount:
      nominee.votes.length,
  }));
}