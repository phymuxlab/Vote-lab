import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type VotingMode = "public" | "secure_registration";

export async function getElectionSettings(electionId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("election_settings").select("*").eq("election_id", electionId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getPublicVotingMode(electionId: string): Promise<VotingMode> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("election_settings")
    .select("voting_mode")
    .eq("election_id", electionId)
    .maybeSingle();
  if (error) throw new Error("Election settings are unavailable.");
  return data?.voting_mode === "secure_registration" ? "secure_registration" : "public";
}

export async function getPublicRegistrationSettings(electionId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("election_settings").select("voting_mode, require_name, require_email, require_phone, require_student_id, require_employee_id, require_national_id, unique_identifier").eq("election_id", electionId).maybeSingle();
  if (error) throw new Error("Registration settings are unavailable.");
  return data;
}

export async function saveElectionSettings(settings: { election_id: string; voting_mode?: VotingMode; require_name?: boolean; require_email?: boolean; require_phone?: boolean; require_student_id?: boolean; require_employee_id?: boolean; require_national_id?: boolean; unique_identifier?: string | null; }) {
  const supabase = await createClient();
  const { error } = await supabase.from("election_settings").upsert(settings, { onConflict: "election_id" });
  if (error) throw error;
}
