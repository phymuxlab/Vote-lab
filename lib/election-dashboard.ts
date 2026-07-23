import { createClient } from "@/lib/supabase/server";

export async function getElectionStats(
  electionId: string
) {
  const supabase = await createClient();

  // Get categories for this election
  const {
    data: categories,
    error: categoryError,
  } = await supabase
    .from("election_categories")
    .select("id")
    .eq("election_id", electionId);

  if (categoryError) {
    console.log(
      "CATEGORY STATS ERROR:",
      categoryError
    );
    throw categoryError;
  }

  const categoryIds =
    categories?.map(
      (category) => category.id
    ) ?? [];


  // Count nominees through category_id
  let nomineeCount = 0;

  if (categoryIds.length > 0) {
    const {
      count,
      error: nomineeError,
    } = await supabase
      .from("nominees")
      .select("*", {
        count: "exact",
        head: true,
      })
      .in("category_id", categoryIds);

    if (nomineeError) {
      console.log(
        "NOMINEE STATS ERROR:",
        nomineeError
      );
      throw nomineeError;
    }

    nomineeCount = count ?? 0;
  }


  // Votes already have election_id
  const {
    count: voteCount,
    error: voteError,
  } = await supabase
    .from("votes")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("election_id", electionId);

  if (voteError) {
    console.log(
      "VOTE STATS ERROR:",
      voteError
    );
    throw voteError;
  }


  return {
    categories: categoryIds.length,
    nominees: nomineeCount,
    votes: voteCount ?? 0,
  };
}