import { createClient } from "@/lib/supabase/server";
import type { Organization } from "@/types/organization";

export async function getOrganizations(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Organization[];
}

export async function getOrganization(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Organization;
}

export async function createOrganization(data: {
  owner_id: string;
  name: string;
  slug: string;
  description?: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("organizations")
    .insert(data);

  if (error) throw error;
}