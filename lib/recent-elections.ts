import { createClient } from "@/lib/supabase/server";

export async function getRecentElections(
  organizationId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("elections")
    .select("*")
    .eq("organization_id", organizationId)
    .order("created_at", {
      ascending: false,
    })
    .limit(5);

  if (error) {
    throw error;
  }

  return data;
}