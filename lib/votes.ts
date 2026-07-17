import { createClient } from "@/lib/supabase/server";

export async function castVote(data: {
  election_id: string;
  category_id: string;
  nominee_id: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    throw new Error("You must be logged in.");

  const { error } = await supabase
    .from("votes")
    .insert({
      ...data,
      voter_id: user.id,
    });

  if (error) throw error;
}
export async function getCategoryResults(
  categoryId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("nominees")
    .select(`
      *,
      votes (
        id
      )
    `)
    .eq("category_id", categoryId);

  if (error) throw error;

  return data.map((nominee) => ({
    ...nominee,
    voteCount: nominee.votes.length,
  }));
}