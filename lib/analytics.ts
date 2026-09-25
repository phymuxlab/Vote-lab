import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getVotesPerCategory() {
  const auth = await createClient();
  const { data: { user } } = await auth.auth.getUser();
  if (!user) return [];

  const admin = createAdminClient();
  const { data: organizations } = await admin.from("organizations").select("id").eq("owner_id", user.id);
  const organizationIds = (organizations ?? []).map((row) => row.id);
  if (!organizationIds.length) return [];

  const { data: elections } = await admin.from("elections").select("id").in("organization_id", organizationIds);
  const electionIds = (elections ?? []).map((row) => row.id);
  if (!electionIds.length) return [];

  const { data: categories } = await admin.from("election_categories").select("id, name").in("election_id", electionIds);
  const { data: votes } = await admin.from("votes").select("category_id").in("election_id", electionIds);
  return (categories ?? []).map((category) => ({ name: category.name, votes: (votes ?? []).filter((vote) => vote.category_id === category.id).length }));
}
