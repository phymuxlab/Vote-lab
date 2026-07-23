import { createClient } from "@/lib/supabase/server";

export async function getTopNominees(
  electionId: string
) {
  const supabase = await createClient();

  // Get categories belonging to this election
  const { data: categories, error: categoryError } =
    await supabase
      .from("election_categories")
      .select("id")
      .eq("election_id", electionId);

  if (categoryError) throw categoryError;

  if (!categories?.length) return [];

  const categoryIds = categories.map(
    (category) => category.id
  );

  // Get nominees in those categories
  const { data: nominees, error } = await supabase
    .from("nominees")
    .select(`
      id,
      full_name,
      image_url
    `)
    .in("category_id", categoryIds);

  if (error) throw error;

  // Count votes for each nominee
  const { data: votes } = await supabase
    .from("votes")
    .select("nominee_id");

  return (nominees ?? [])
    .map((nominee) => ({
      id: nominee.id,
      name: nominee.full_name,
      image_url: nominee.image_url,
      votes:
        votes?.filter(
          (vote) => vote.nominee_id === nominee.id
        ).length ?? 0,
    }))
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);
}