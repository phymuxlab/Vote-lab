import { createAdminClient } from "@/lib/supabase/admin";
import { requireElectionOwner } from "@/lib/auth/authorization";

export async function getTopNominees(electionId: string) {
  await requireElectionOwner(electionId);
  const supabase = createAdminClient();

  const { data: categories, error: categoryError } = await supabase
    .from("election_categories")
    .select("id")
    .eq("election_id", electionId);
  if (categoryError) throw categoryError;

  const categoryIds = (categories ?? []).map((category) => category.id);
  if (!categoryIds.length) return [];

  const { data: nominees, error: nomineeError } = await supabase
    .from("nominees")
    .select("id, full_name, image_url")
    .in("category_id", categoryIds);
  if (nomineeError) throw nomineeError;

  const { data: votes, error: voteError } = await supabase
    .from("votes")
    .select("nominee_id")
    .eq("election_id", electionId);
  if (voteError) throw voteError;

  return (nominees ?? [])
    .map((nominee) => ({
      id: nominee.id,
      name: nominee.full_name,
      image_url: nominee.image_url,
      votes: (votes ?? []).filter((vote) => vote.nominee_id === nominee.id).length,
    }))
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);
}
