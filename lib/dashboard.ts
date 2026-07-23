import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  const [
    organizations,
    elections,
    published,
    categories,
    nominees,
    votes,
    topNominees,
    recentVotes,
  ] = await Promise.all([
    supabase
      .from("organizations")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("elections")
      .select("*", { count: "exact", head: true }),

    supabase
       .from("elections")
       .select("*", { count: "exact", head: true })
        .eq("is_published", true),

    supabase
      .from("election_categories")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("nominees")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("votes")
      .select("*", { count: "exact", head: true }),

    supabase
      .from("nominees")
      .select(
        `
        id,
        full_name,
        votes(id)
      `
      ),

    supabase
      .from("votes")
      .select(
        `
        id,
        created_at,
        nominee:nominee_id(full_name)
      `
      )
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const leaderboard =
    (topNominees.data ?? [])
      .map((nominee) => ({
        id: nominee.id,
        full_name: nominee.full_name,
        voteCount: nominee.votes?.length ?? 0,
      }))
      .sort((a, b) => b.voteCount - a.voteCount)
      .slice(0, 5);

  return {
    organizations: organizations.count ?? 0,
    elections: elections.count ?? 0,
    published: published.count ?? 0,
    categories: categories.count ?? 0,
    nominees: nominees.count ?? 0,
    votes: votes.count ?? 0,

    leaderboard,

    recentVotes: recentVotes.data ?? [],
  };
}