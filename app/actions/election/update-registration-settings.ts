"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function updateRegistrationSettings(
  formData: FormData
) {
  const supabase = await createClient();

  const electionId =
    formData.get("electionId")?.toString() ?? "";

  const votingMode =
    formData.get("voting_mode")?.toString() ??
    "public";

  const uniqueIdentifier =
    formData
      .get("unique_identifier")
      ?.toString() ?? null;

  const { error } = await supabase
    .from("election_registration_settings")
    .upsert({
      election_id: electionId,
      voting_mode: votingMode,
      unique_identifier: uniqueIdentifier,
    });

  if (error) {
    throw error;
  }

  revalidatePath(
    `/dashboard/organizations`
  );
}