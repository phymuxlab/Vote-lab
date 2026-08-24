import { createClient } from "@/lib/supabase/server";

export async function getElectionResults(
  electionId: string
) {
  const supabase = await createClient();

  // Fetch all categories
  const { data: categories, error: categoryError } =
    await supabase
      .from("election_categories")
      .select("*")
      .eq("election_id", electionId)
      .order("created_at");

  if (categoryError) throw categoryError;

  const results = await Promise.all(
    (categories ?? []).map(async (category) => {
      // Fetch nominees in this category
      const { data: nominees, error: nomineeError } =
        await supabase
          .from("nominees")
          .select("*")
          .eq("category_id", category.id)
          .order("created_at");

      if (nomineeError) throw nomineeError;

      // Count votes for each nominee
      const nomineeResults = await Promise.all(
        (nominees ?? []).map(async (nominee) => {
          const { count, error } = await supabase
            .from("votes")
            .select("*", {
              count: "exact",
              head: true,
            })
            .eq("nominee_id", nominee.id);

          if (error) throw error;

          return {
            ...nominee,
            votes: count ?? 0,
          };
        })
      );

      // Total votes in this category
      const totalVotes = nomineeResults.reduce(
        (sum, nominee) => sum + nominee.votes,
        0
      );

      // Add percentage for each nominee
      const rankedNominees = nomineeResults
        .map((nominee) => ({
          ...nominee,
          percentage:
            totalVotes === 0
              ? 0
              : Number(
                  (
                    (nominee.votes / totalVotes) *
                    100
                  ).toFixed(1)
                ),
        }))
        .sort((a, b) => b.votes - a.votes);

      // First nominee after sorting is the winner
      const winner =
        rankedNominees.length > 0
          ? rankedNominees[0]
          : null;

      return {
        ...category,
        totalVotes,
        winner,
        nominees: rankedNominees,
      };
    })
  );

  return results;
}