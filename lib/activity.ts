import { createClient } from "@/lib/supabase/server";

export async function getRecentActivity(
  organizationId: string
) {
  const supabase = await createClient();

  const { data: elections } = await supabase
    .from("elections")
    .select("id")
    .eq("organization_id", organizationId);

  if (!elections?.length) return [];

  const electionIds = elections.map((e) => e.id);

  const { data } = await supabase
    .from("votes")
    .select(`
      id,
      created_at,
      nominees (
        full_name,
        election_categories (
          name
        )
      )
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(10);

  return data ?? [];
}