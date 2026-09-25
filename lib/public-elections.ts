import { createAdminClient } from "@/lib/supabase/admin";
import type { Election } from "@/types/election";

export async function getPublicElections() {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("elections").select("id, organization_id, title, description, start_date, end_date, status, is_published, allow_results, created_at, updated_at").eq("is_published", true).order("created_at", { ascending: false });
  if (error) throw error;
  return data as Election[];
}
