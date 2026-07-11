import { createClient } from "@/lib/supabase/server";
import type { Election } from "@/types/election";

export async function getElections(
  organizationId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("elections")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Election[];
}

export async function createElection(data: {
  organization_id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("elections")
    .insert(data);

  if (error) throw error;
}