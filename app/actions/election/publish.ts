"use server";

import { revalidatePath } from "next/cache";
import { requireElectionOwner } from "@/lib/auth/authorization";

export async function publishElection(id: string) {
  const { supabase } = await requireElectionOwner(id);
  const { error } = await supabase
    .from("elections")
    .update({ is_published: true, status: "published" })
    .eq("id", id);

  if (error) throw new Error("Unable to publish election.");
  revalidatePath("/dashboard");
  revalidatePath(`/elections/${id}`);
}
