import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/types/category";

export async function getCategories(
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

  if (error) throw error;

  return data as Category[];
}

export async function getCategory(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("election_categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Category;
}

export async function createCategory(data: {
  election_id: string;
  name: string;
  description?: string;
  max_votes?: number;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("election_categories")
    .insert(data);

  if (error) throw error;
}