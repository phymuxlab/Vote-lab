"use server";

import { redirect } from "next/navigation";
import { createElection } from "@/lib/elections";
import { saveElectionSettings, type VotingMode } from "@/lib/election-settings";
import { requireOrganizationOwner } from "@/lib/auth/authorization";
import { cleanText, requiredText, safeDate } from "@/lib/validation";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function createElectionAction(formData: FormData) {
  const organizationId = requiredText(formData.get("organization_id"), "Organization", 64);
  await requireOrganizationOwner(organizationId);
  await enforceRateLimit(`create-election:${organizationId}`, 10, 3600);

  const title = requiredText(formData.get("title"), "Election title", 120);
  const description = cleanText(formData.get("description"), 1000) || null;
  const startDate = safeDate(formData.get("start_date"), "Start date");
  const endDate = safeDate(formData.get("end_date"), "End date");
  if (new Date(endDate) <= new Date(startDate)) throw new Error("End date must be after start date.");

  const votingMode = formData.get("voting_mode") === "secure_registration"
    ? "secure_registration"
    : "public" as VotingMode;

  const election = await createElection({
    organization_id: organizationId,
    title,
    description,
    start_date: startDate,
    end_date: endDate,
  });

  try {
    await saveElectionSettings({
      election_id: election.id,
      voting_mode: votingMode,
      require_name: true,
      require_email: true,
      require_phone: false,
      require_student_id: false,
      require_employee_id: false,
      require_national_id: false,
      unique_identifier: "email",
    });
  } catch (error) {
    const { supabase } = await requireOrganizationOwner(organizationId);
    await supabase.from("elections").delete().eq("id", election.id);
    throw error;
  }

  redirect(`/dashboard/organizations/${organizationId}/elections/${election.id}`);
}
