import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { Election } from "@/types/election";
import { isUuid } from "@/lib/auth/authorization";

export async function getElections(organizationId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("elections").select("*").eq("organization_id", organizationId).order("created_at", { ascending: false });
  if (error) throw error;
  return data as Election[];
}

export async function getElection(id: string) {
  if (!isUuid(id)) throw new Error("Election not found.");
  const supabase = await createClient();
  const { data, error } = await supabase.from("elections").select("*").eq("id", id).single();
  if (error) throw error;
  return data as Election;
}

export async function getPublicElectionById(id: string) {
  if (!isUuid(id)) return null;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("elections")
    .select("id, organization_id, title, description, start_date, end_date, status, is_published, allow_results, created_at, updated_at")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();
  if (error) throw error;
  return data as Election | null;
}

export async function createElection(data: { organization_id: string; title: string; description?: string | null; start_date: string; end_date: string; }) {
  const supabase = await createClient();
  const { data: election, error } = await supabase.from("elections").insert(data).select("id").single();
  if (error) throw error;
  return election;
}

export async function getPublishedElections() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("elections").select("*").eq("is_published", true).order("created_at", { ascending: false });
  if (error) throw error;
  return data as Election[];
}
