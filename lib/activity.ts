import { createAdminClient } from "@/lib/supabase/admin";
import { requireOrganizationOwner } from "@/lib/auth/authorization";

export async function getRecentActivity(organizationId: string) {
  await requireOrganizationOwner(organizationId);
  const supabase = createAdminClient();

  const { data: elections, error: electionError } = await supabase
    .from("elections")
    .select("id")
    .eq("organization_id", organizationId);
  if (electionError) throw electionError;

  const electionIds = (elections ?? []).map((e) => e.id);
  if (!electionIds.length) return [];

  const { data, error } = await supabase
    .from("votes")
    .select("id, created_at, nominees:nominee_id(full_name)")
    .in("election_id", electionIds)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) throw error;
  return data ?? [];
}
