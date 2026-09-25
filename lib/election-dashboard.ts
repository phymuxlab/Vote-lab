import { createAdminClient } from "@/lib/supabase/admin";
import { requireElectionOwner } from "@/lib/auth/authorization";

export async function getElectionStats(electionId: string) {
  await requireElectionOwner(electionId);
  const supabase = createAdminClient();

  const { data: categories, error: categoryError } = await supabase
    .from("election_categories")
    .select("id")
    .eq("election_id", electionId);
  if (categoryError) throw categoryError;

  const categoryIds = (categories ?? []).map((category) => category.id);
  let nomineeCount = 0;
  if (categoryIds.length) {
    const { count, error } = await supabase
      .from("nominees")
      .select("id", { count: "exact", head: true })
      .in("category_id", categoryIds);
    if (error) throw error;
    nomineeCount = count ?? 0;
  }

  const { count: voteCount, error: voteError } = await supabase
    .from("votes")
    .select("id", { count: "exact", head: true })
    .eq("election_id", electionId);
  if (voteError) throw voteError;

  return { categories: categoryIds.length, nominees: nomineeCount, votes: voteCount ?? 0 };
}
