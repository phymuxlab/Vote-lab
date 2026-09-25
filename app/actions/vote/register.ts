"use server";

import { registerVoter } from "@/lib/voters";
import { generateVotingToken } from "@/lib/voter-tokens";
import { enforceRateLimit } from "@/lib/rate-limit";

export interface RegisterVoterState {
  success: boolean;
  message?: string;
  token?: string;
  electionId?: string;
}

export async function registerVoterAction(_prevState: RegisterVoterState, formData: FormData): Promise<RegisterVoterState> {
  const electionId = String(formData.get("election_id") ?? "").trim();
  if (!electionId) return { success: false, message: "Invalid election." };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const uniqueKey = `${electionId}:${email || String(formData.get("student_id") ?? formData.get("phone") ?? "").trim()}`;

  try {
    await enforceRateLimit(`register-voter:${uniqueKey}`, 5, 900);
    await enforceRateLimit(`register-voter-election:${electionId}`, 50, 900);
    const privacyAcknowledged = formData.get("privacy_acknowledged") === "on";
    if (!privacyAcknowledged) return { success: false, message: "Please acknowledge the privacy notice before registering." };

    const voter = await registerVoter({
      election_id: electionId,
      full_name: String(formData.get("full_name") ?? "").trim() || undefined,
      email: email || undefined,
      phone: String(formData.get("phone") ?? "").trim() || undefined,
      student_id: String(formData.get("student_id") ?? "").trim() || undefined,
      employee_id: String(formData.get("employee_id") ?? "").trim() || undefined,
      national_id: String(formData.get("national_id") ?? "").trim() || undefined,
    });

    const token = await generateVotingToken(voter.election_id, voter.id);
    return { success: true, token: token.token, electionId: voter.election_id, message: "Registration successful. Your voting token has been generated." };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to complete registration.";
    if (message.includes("already registered") || message.includes("not available for registration")) return { success: false, message: "Registration could not be completed with these details. If you already registered, use your voting token to continue." };
    if (message.includes("Too many requests")) return { success: false, message };
    return { success: false, message: "Unable to complete registration. Please check your details and try again." };
  }
}
