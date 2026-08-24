import { createClient } from "@/lib/supabase/server";

export async function getVotingCategories(
  electionId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("election_categories")
    .select("*")
    .eq("election_id", electionId)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error("Categories Error:", error);
    throw error;
  }

  return data ?? [];
}

export async function getCategoryNominees(
  categoryId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("nominees")
    .select("*")
    .eq("category_id", categoryId)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error("Nominees Error:", error);
    throw error;
  }

  return data ?? [];
}

export async function getVotingData(
  electionId: string
) {
  const categories =
    await getVotingCategories(electionId);

  return Promise.all(
    categories.map(async (category) => ({
      ...category,
      nominees: await getCategoryNominees(
        category.id
      ),
    }))
  );
}