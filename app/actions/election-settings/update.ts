"use server";

import { redirect } from "next/navigation";
import { saveElectionSettings, type VotingMode } from "@/lib/election-settings";
import { requireElectionOwner } from "@/lib/auth/authorization";

export async function updateElectionSettings(formData: FormData) {
  const organizationId = String(formData.get("organizationId") ?? "");
  const electionId = String(formData.get("electionId") ?? "");
  await requireElectionOwner(electionId);

  if (!organizationId) throw new Error("Organization not found.");

  const votingMode: VotingMode = formData.get("voting_mode") === "secure_registration"
    ? "secure_registration"
    : "public";

  await saveElectionSettings({
    election_id: electionId,
    voting_mode: votingMode,
    require_name: formData.get("require_name") === "on",
    require_email: formData.get("require_email") === "on",
    require_phone: formData.get("require_phone") === "on",
    require_student_id: formData.get("require_student_id") === "on",
    require_employee_id: formData.get("require_employee_id") === "on",
    require_national_id: formData.get("require_national_id") === "on",
    unique_identifier: String(formData.get("unique_identifier") ?? "email"),
  });

  redirect(`/dashboard/organizations/${organizationId}/elections/${electionId}/settings`);
}
