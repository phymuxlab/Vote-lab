import { createAdminClient } from "@/lib/supabase/admin";
import { requireElectionOwner } from "@/lib/auth/authorization";

export async function getElectionResults(electionId: string) {
  await requireElectionOwner(electionId);
  const supabase = createAdminClient();
  const { data: categories, error: categoryError } = await supabase.from("election_categories").select("*").eq("election_id", electionId).order("created_at");
  if (categoryError) throw categoryError;

  return Promise.all((categories ?? []).map(async (category) => {
    const { data: nominees, error: nomineeError } = await supabase.from("nominees").select("*").eq("category_id", category.id).order("created_at");
    if (nomineeError) throw nomineeError;
    const nomineeResults = await Promise.all((nominees ?? []).map(async (nominee) => {
      const { count, error } = await supabase.from("votes").select("id", { count: "exact", head: true }).eq("nominee_id", nominee.id);
      if (error) throw error;
      return { ...nominee, votes: count ?? 0 };
    }));
    const totalVotes = nomineeResults.reduce((sum, nominee) => sum + nominee.votes, 0);
    const rankedNominees = nomineeResults.map((nominee) => ({ ...nominee, percentage: totalVotes === 0 ? 0 : Number(((nominee.votes / totalVotes) * 100).toFixed(1)) })).sort((a, b) => b.votes - a.votes);
    return { ...category, totalVotes, winner: rankedNominees[0] ?? null, nominees: rankedNominees };
  }));
}
