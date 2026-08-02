import { createClient } from "@/lib/supabase/server";

export async function getElectionSettings(
  electionId: string
) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("election_settings")
    .select("*")
    .eq("election_id", electionId)
    .maybeSingle();

  return data;
}

export async function saveElectionSettings(
  settings: any
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("election_settings")
    .upsert(settings, {
      onConflict: "election_id",
    });

  if (error) throw error;
}