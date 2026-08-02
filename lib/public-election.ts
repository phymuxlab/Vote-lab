import { createClient } from "@/lib/supabase/server";

export async function getPublicElectionStats(
  electionId: string
) {
  const supabase = await createClient();

  // Categories (positions)
  const { count: totalCategories } = await supabase
    .from("election_categories")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("election_id", electionId);

  // Registered voters
  const { count: registeredVoters } = await supabase
    .from("voters")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("election_id", electionId);

  // Votes cast
  const { count: votesCast } = await supabase
    .from("votes")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("election_id", electionId);

  const turnout =
    (registeredVoters ?? 0) > 0
      ? Math.round(
          ((votesCast ?? 0) /
            (registeredVoters ?? 1)) *
            100
        )
      : 0;

  return {
    totalCategories:
      totalCategories ?? 0,

    registeredVoters:
      registeredVoters ?? 0,

    votesCast:
      votesCast ?? 0,

    turnout,
  };
}