import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Nominee } from "@/types/nominee";
import { requireCategoryOwner } from "@/lib/auth/authorization";

export async function getNominees(categoryId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("nominees").select("*").eq("category_id", categoryId).order("created_at", { ascending: true });
  if (error) throw error;
  return data as Nominee[];
}

export async function createNominee(data: { category_id: string; full_name: string; biography?: string; image_url?: string }) {
  const supabase = await createClient();
  const { error } = await supabase.from("nominees").insert(data);
  if (error) throw error;
}

export async function getNomineesWithVotes(categoryId: string) {
  await requireCategoryOwner(categoryId);
  const supabase = createAdminClient();
  const { data: nominees, error: nomineeError } = await supabase.from("nominees").select("*").eq("category_id", categoryId).order("created_at", { ascending: true });
  if (nomineeError) throw nomineeError;
  const { data: votes, error: voteError } = await supabase.from("votes").select("nominee_id").eq("category_id", categoryId);
  if (voteError) throw voteError;
  return (nominees ?? []).map((nominee) => ({ ...nominee, votes: Array((votes ?? []).filter((vote) => vote.nominee_id === nominee.id).length).fill({}) }));
}
