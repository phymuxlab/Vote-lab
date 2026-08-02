"use server";
import { createVotingSession } from "@/lib/voting-session";
import { redirect } from "next/navigation";

import { verifyVotingToken } from "@/lib/voter-tokens";

export async function verifyTokenAction(
  electionId: string,
  formData: FormData
) {
  const token = String(
    formData.get("token") ?? ""
  )
    .trim()
    .toUpperCase();

  if (!token) {
    return {
      success: false,
      message: "Please enter your voting token.",
    };
  }

  const result = await verifyVotingToken(
    electionId,
    token
  );

  if (!result.valid) {
    return {
      success: false,
      message: result.reason,
    };
  }

await createVotingSession(
  electionId,
  result.token.id
);

redirect(`/elections/${electionId}/vote`);
}