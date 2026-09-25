import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");
  return { supabase, user };
}

export async function requireOrganizationOwner(organizationId: string) {
  if (!isUuid(organizationId)) throw new Error("Invalid organization.");

  const { supabase, user } = await requireUser();
  const { data: organization, error } = await supabase
    .from("organizations")
    .select("id, owner_id")
    .eq("id", organizationId)
    .eq("owner_id", user.id)
    .single();

  if (error || !organization) throw new Error("Forbidden");
  return { supabase, user, organization };
}

export async function requireElectionOwner(electionId: string) {
  if (!isUuid(electionId)) throw new Error("Invalid election.");

  const { supabase, user } = await requireUser();
  const { data: election, error } = await supabase
    .from("elections")
    .select("id, organization_id")
    .eq("id", electionId)
    .single();

  if (error || !election) throw new Error("Election not found.");

  const { data: organization } = await supabase
    .from("organizations")
    .select("id")
    .eq("id", election.organization_id)
    .eq("owner_id", user.id)
    .single();

  if (!organization) throw new Error("Forbidden");
  return { supabase, user, election };
}

export async function requireCategoryOwner(categoryId: string) {
  if (!isUuid(categoryId)) throw new Error("Invalid category.");
  const { supabase, user } = await requireUser();
  const { data: category } = await supabase.from("election_categories").select("id, election_id").eq("id", categoryId).single();
  if (!category) throw new Error("Category not found.");
  await requireElectionOwner(category.election_id);
  return { supabase, user, category };
}

export function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
