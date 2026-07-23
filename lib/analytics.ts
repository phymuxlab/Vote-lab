import { createClient } from "@/lib/supabase/server";

export async function getVotesPerCategory() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("election_categories")
    .select("id, name");

  const { data: votes } = await supabase
    .from("votes")
    .select("category_id");

  return (
    categories?.map((category) => ({
      name: category.name,
      votes:
        votes?.filter(
          (vote) => vote.category_id === category.id
        ).length ?? 0,
    })) ?? []
  );
}