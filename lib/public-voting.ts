import { createAdminClient } from "@/lib/supabase/admin";

export async function getVotingCategories(electionId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("election_categories").select("id, election_id, name, description, max_votes, created_at").eq("election_id", electionId).order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getCategoryNominees(categoryId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("nominees").select("id, category_id, full_name, biography, image_url, created_at").eq("category_id", categoryId).order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getVotingData(electionId: string) {
  const categories = await getVotingCategories(electionId);
  return Promise.all(categories.map(async (category) => ({ ...category, nominees: await getCategoryNominees(category.id) })));
}
