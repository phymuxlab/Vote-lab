import { createAdminClient } from "@/lib/supabase/admin";

export async function getPublicElectionStats(electionId: string) {
  const supabase = createAdminClient();
  const [{ count: totalCategories }, { count: registeredVoters }, { count: votesCast }] = await Promise.all([
    supabase.from("election_categories").select("id", { count: "exact", head: true }).eq("election_id", electionId),
    supabase.from("voters").select("id", { count: "exact", head: true }).eq("election_id", electionId),
    supabase.from("votes").select("id", { count: "exact", head: true }).eq("election_id", electionId),
  ]);
  const turnout = (registeredVoters ?? 0) > 0 ? Math.round(((votesCast ?? 0) / (registeredVoters ?? 1)) * 100) : 0;
  return { totalCategories: totalCategories ?? 0, registeredVoters: registeredVoters ?? 0, votesCast: votesCast ?? 0, turnout };
}

export async function getPublicElection(electionId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("elections").select("*").eq("id", electionId).eq("is_published", true).maybeSingle();
  if (error || !data) return null;
  return data;
}

export async function getPublicOrganization(organizationId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("organizations").select("id, name, logo_url").eq("id", organizationId).maybeSingle();
  if (error || !data) return null;
  return data;
}
