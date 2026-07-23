import { createClient } from "@/lib/supabase/server";

export async function getElectionStats(
  electionId: string
) {
  const supabase = await createClient();

  const [{ count: categories }, { count: nominees }, { count: votes }] =
    await Promise.all([
      supabase
        .from("election_categories")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("election_id", electionId),

      supabase
        .from("nominees")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("election_id", electionId),

      supabase
        .from("votes")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("election_id", electionId),
    ]);

  return {
    categories: categories ?? 0,
    nominees: nominees ?? 0,
    votes: votes ?? 0,
  };
}