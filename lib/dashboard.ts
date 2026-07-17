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
  ] = await Promise.all([
    supabase.from("organizations").select("*", { count: "exact", head: true }),
    supabase.from("elections").select("*", { count: "exact", head: true }),
    supabase
      .from("elections")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("election_categories")
      .select("*", { count: "exact", head: true }),
    supabase.from("nominees").select("*", { count: "exact", head: true }),
    supabase.from("votes").select("*", { count: "exact", head: true }),
  ]);

  return {
    organizations: organizations.count ?? 0,
    elections: elections.count ?? 0,
    published: published.count ?? 0,
    categories: categories.count ?? 0,
    nominees: nominees.count ?? 0,
    votes: votes.count ?? 0,
  };
}