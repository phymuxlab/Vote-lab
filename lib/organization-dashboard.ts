import { createAdminClient } from "@/lib/supabase/admin";
import { requireOrganizationOwner } from "@/lib/auth/authorization";

export async function getOrganizationStats(organizationId: string) {
  await requireOrganizationOwner(organizationId);
  const supabase = createAdminClient();

  const { count: elections, error: electionError } = await supabase
    .from("elections")
    .select("id", { head: true, count: "exact" })
    .eq("organization_id", organizationId);
  if (electionError) throw electionError;

  const { data: electionRows, error: electionRowsError } = await supabase
    .from("elections")
    .select("id")
    .eq("organization_id", organizationId);
  if (electionRowsError) throw electionRowsError;

  const ids = (electionRows ?? []).map((e) => e.id);
  if (!ids.length) return { elections: elections ?? 0, categories: 0, nominees: 0, votes: 0 };

  const { data: categoryRows, error: categoryError } = await supabase
    .from("election_categories")
    .select("id")
    .in("election_id", ids);
  if (categoryError) throw categoryError;

  const categoryIds = (categoryRows ?? []).map((c) => c.id);
  if (!categoryIds.length) return { elections: elections ?? 0, categories: 0, nominees: 0, votes: 0 };

  const { data: nomineeRows, error: nomineeError } = await supabase
    .from("nominees")
    .select("id")
    .in("category_id", categoryIds);
  if (nomineeError) throw nomineeError;

  const nomineeIds = (nomineeRows ?? []).map((n) => n.id);
  let votes = 0;
  if (nomineeIds.length) {
    const { count, error: voteError } = await supabase
      .from("votes")
      .select("id", { head: true, count: "exact" })
      .in("nominee_id", nomineeIds);
    if (voteError) throw voteError;
    votes = count ?? 0;
  }

  return {
    elections: elections ?? 0,
    categories: categoryIds.length,
    nominees: nomineeIds.length,
    votes,
  };
}
