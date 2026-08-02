"use server";

import { redirect } from "next/navigation";

import { saveElectionSettings } from "@/lib/election-settings";

export async function updateElectionSettings(
  formData: FormData
) {
  const organizationId =
    formData.get("organizationId") as string;

  const electionId =
    formData.get("electionId") as string;

  await saveElectionSettings({
    election_id: electionId,

    voting_mode:
      formData.get("voting_mode"),

    require_name:
      formData.get("require_name") === "on",

    require_email:
      formData.get("require_email") === "on",

    require_phone:
      formData.get("require_phone") === "on",

    require_student_id:
      formData.get("require_student_id") ===
      "on",

    require_employee_id:
      formData.get("require_employee_id") ===
      "on",

    require_national_id:
      formData.get("require_national_id") ===
      "on",

    unique_identifier:
      formData.get("unique_identifier"),
  });

  redirect(
    `/dashboard/organizations/${organizationId}/elections/${electionId}/settings`
  );
}