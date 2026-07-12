import { createClient } from "@/lib/supabase/server";
import type { Nominee } from "@/types/nominee";

export async function getNominees(
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

  return data as Nominee[];
}

export async function getNominee(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("nominees")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Nominee;
}

export async function createNominee(data: {
  category_id: string;
  full_name: string;
  biography?: string;
  image_url?: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("nominees")
    .insert(data);

  if (error) throw error;
}