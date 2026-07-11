"use server";

import { redirect } from "next/navigation";

import { createElection } from "@/lib/elections";

export async function createElectionAction(
  formData: FormData
) {
  const organization_id =
    formData.get("organization_id") as string;

  const title =
    formData.get("title") as string;

  const description =
    formData.get("description") as string;

  const start_date =
    formData.get("start_date") as string;

  const end_date =
    formData.get("end_date") as string;

  await createElection({
    organization_id,
    title,
    description,
    start_date,
    end_date,
  });

 redirect(`/dashboard/organizations/${organization_id}/elections`);
}