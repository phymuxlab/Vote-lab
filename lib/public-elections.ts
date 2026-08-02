import { createClient } from "@/lib/supabase/server";
import type { Election } from "@/types/election";

export async function getPublicElections() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("elections")
    .select("*")
    .eq("is_published", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data as Election[];
}