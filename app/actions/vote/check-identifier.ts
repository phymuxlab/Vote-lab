"use server";

import { checkUniqueIdentifier, normalizeIdentifier } from "@/lib/voters";
import { enforceRateLimit } from "@/lib/rate-limit";

export interface CheckIdentifierResult { available: boolean; message: string; }

export async function checkIdentifierAction(electionId: string, field: string, value: string): Promise<CheckIdentifierResult> {
  const normalized = normalizeIdentifier(field, value);
  if (!electionId || !field || !normalized) return { available: false, message: "Enter your identifier." };
  try {
    await enforceRateLimit(`check-identifier:${electionId}:${normalized}`, 10, 900);
    return await checkUniqueIdentifier(electionId, field, normalized);
  } catch (error) {
    return { available: false, message: error instanceof Error ? error.message : "Unable to check this identifier." };
  }
}
