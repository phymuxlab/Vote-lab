import { createAdminClient } from "@/lib/supabase/admin";
import { getVotingSession, clearVotingSession } from "@/lib/voting-session";

export async function castVote(data: { election_id: string; category_id: string; nominee_id: string }) {
  const session = await getVotingSession();
  if (!session || session.electionId !== data.election_id) throw new Error("Voting session not found.");

  const supabase = createAdminClient();
  const { error } = await supabase.rpc("submit_secure_ballot", {
    p_election_id: data.election_id,
    p_voter_id: session.voterId,
    p_token_id: session.tokenId,
    p_votes: [{ category_id: data.category_id, nominee_id: data.nominee_id }],
  });
  if (error) throw new Error("Unable to submit vote.");
  await clearVotingSession();
}

export async function getCategoryResults(categoryId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("nominees")
    .select(`id, full_name, biography, image_url, votes(id)`)
    .eq("category_id", categoryId);
  if (error) throw error;
  return (data ?? []).map((nominee) => ({ ...nominee, voteCount: nominee.votes.length }));
}
