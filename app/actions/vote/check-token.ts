"use server";

import { verifyVotingToken } from "@/lib/voter-tokens";
import { enforceRateLimit } from "@/lib/rate-limit";

export interface CheckTokenResult {
  valid: boolean;
  message?: string;
}

export async function checkTokenAction(
  electionId: string,
  token: string
): Promise<CheckTokenResult> {
  const normalizedToken = token
    .trim()
    .toUpperCase();

  if (!normalizedToken) {
    return {
      valid: false,
    };
  }

  // Your generated tokens are 8 hexadecimal characters.
  if (!/^[A-F0-9]{8}$/.test(normalizedToken)) {
    return {
      valid: false,
      message: "Token must contain 8 characters.",
    };
  }

  try {
    await enforceRateLimit(`verify-token:${electionId}`, 30, 900);
    const result = await verifyVotingToken(
      electionId,
      normalizedToken
    );

    if (!result.valid) {
      return {
        valid: false,
        message: result.reason,
      };
    }

    return {
      valid: true,
      message:
        "Token verified. You can continue.",
    };
  } catch {
    return {
      valid: false,
      message:
        "Unable to verify token. Please try again.",
    };
  }
}