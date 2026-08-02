import { createClient } from "@/lib/supabase/server";

export async function getVotingCategories(
  electionId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("election_id", electionId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data;
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

  if (error) throw error;

  return data;
}

export async function getVotingData(
  electionId: string
) {
  const categories =
    await getVotingCategories(
      electionId
    );

  const data = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      nominees:
        await getCategoryNominees(
          category.id
        ),
    }))
  );

  return data;
}