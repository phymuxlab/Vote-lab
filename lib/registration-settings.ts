import { createClient } from "@/lib/supabase/server";

export async function getRegistrationSettings(
  electionId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("election_registration_settings")
    .select("*")
    .eq("election_id", electionId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data;
}

export async function getRegistrationFields(
  electionId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("election_registration_fields")
    .select("*")
    .eq("election_id", electionId)
    .order("display_order");

  if (error) throw error;

  return data ?? [];
}