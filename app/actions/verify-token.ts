"use server";

import { redirect } from "next/navigation";
import { createVotingSession } from "@/lib/voting-session";
import { verifyVotingToken } from "@/lib/voter-tokens";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function verifyTokenAction(
  electionId: string,
  _prevState: { success: boolean; message?: string },
  formData: FormData,
) {
  const token = String(formData.get("token") ?? "").trim().toUpperCase();

  if (!token) {
    return { success: false, message: "Please enter your voting token." };
  }

  if (!/^[A-F0-9]{8}$/.test(token)) {
    return { success: false, message: "Token must contain 8 characters." };
  }

  try {
    await enforceRateLimit(`verify-token:${electionId}:${token}`, 8, 900);
    await enforceRateLimit(`verify-token-election:${electionId}`, 30, 900);
  } catch {
    return { success: false, message: "Too many attempts. Please wait and try again." };
  }

  const result = await verifyVotingToken(electionId, token);

  if (!result.valid) {
    return { success: false, message: result.reason };
  }

  if (!result.token.voter_id) {
    return { success: false, message: "This token is not linked to a voter." };
  }

  await createVotingSession(electionId, result.token.voter_id, result.token.id);
  redirect(`/elections/${electionId}/vote`);
}
