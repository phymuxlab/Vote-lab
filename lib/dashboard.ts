import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getDashboardStats() {
  const authClient = await createClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const admin = createAdminClient();
  const { data: organizations, error: orgError } = await admin.from("organizations").select("id").eq("owner_id", user.id);
  if (orgError) throw orgError;
  const organizationIds = (organizations ?? []).map((row) => row.id);
  if (!organizationIds.length) return emptyStats();

  const { data: elections, error: electionError } = await admin.from("elections").select("id, is_published").in("organization_id", organizationIds);
  if (electionError) throw electionError;
  const electionIds = (elections ?? []).map((row) => row.id);
  if (!electionIds.length) return { ...emptyStats(), organizations: organizationIds.length };

  const [{ count: categories }, { data: categoryRows }, { count: votes }] = await Promise.all([
    admin.from("election_categories").select("id", { count: "exact", head: true }).in("election_id", electionIds),
    admin.from("election_categories").select("id").in("election_id", electionIds),
    admin.from("votes").select("id", { count: "exact", head: true }).in("election_id", electionIds),
  ]);

  const categoryIds = (categoryRows ?? []).map((row) => row.id);

  const { data: nominees } = categoryIds.length
    ? await admin
        .from("nominees")
        .select("id, full_name, votes(id)")
        .in("category_id", categoryIds)
    : { data: [] };

  type DashboardNominee = {
    id: string;
    full_name: string | null;
    votes: { id: string }[] | null;
  };

  const leaderboard = (nominees ?? [])
    .map((nominee: DashboardNominee) => ({
      id: nominee.id,
      full_name: nominee.full_name,
      voteCount: nominee.votes?.length ?? 0,
    }))
    .sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, 5);
  const { data: recentVotes } = await admin.from("votes").select("id, created_at, nominee:nominee_id(full_name)").in("election_id", electionIds).order("created_at", { ascending: false }).limit(10);

  return {
    organizations: organizationIds.length,
    elections: electionIds.length,
    published: (elections ?? []).filter((e) => e.is_published).length,
    categories: categories ?? 0,
    nominees: nominees?.length ?? 0,
    votes: votes ?? 0,
    leaderboard,
    recentVotes: recentVotes ?? [],
  };
}

function emptyStats() {
  return { organizations: 0, elections: 0, published: 0, categories: 0, nominees: 0, votes: 0, leaderboard: [], recentVotes: [] };
}
