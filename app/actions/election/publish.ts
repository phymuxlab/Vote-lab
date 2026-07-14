"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function publishElection(id: string) {
  const supabase = await createClient();

  await supabase
    .from("elections")
    .update({
      is_published: true,
    })
    .eq("id", id);

  revalidatePath("/dashboard");
}