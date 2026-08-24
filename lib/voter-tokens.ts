import { randomBytes } from "crypto";

import { createClient } from "@/lib/supabase/server";

export async function generateVotingToken(
  electionId: string,
  voterId?: string
) {
  const supabase = await createClient();

  const token = randomBytes(4)
    .toString("hex")
    .toUpperCase();

  const expiresAt = new Date();

  // Token expires after 24 hours
  expiresAt.setHours(
    expiresAt.getHours() + 24
  );

  const { data, error } = await supabase
    .from("voter_tokens")
    .insert({
      election_id: electionId,
      voter_id: voterId ?? null,
      token,
      expires_at:
        expiresAt.toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function verifyVotingToken(
  electionId: string,
  token: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("voter_tokens")
    .select("*")
    .eq("election_id", electionId)
    .eq("token", token)
    .single();

  if (error || !data) {
    return {
      valid: false,
      reason: "Invalid token.",
    };
  }

  if (data.used) {
    return {
      valid: false,
      reason:
        "This token has already been used.",
    };
  }

  if (
    data.expires_at &&
    new Date(data.expires_at) < new Date()
  ) {
    return {
      valid: false,
      reason: "Token expired.",
    };
  }

  return {
    valid: true,
    token: data,
  };
}

export async function markTokenAsUsed(
  tokenId: string
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("voter_tokens")
    .update({
      used: true,
      used_at: new Date().toISOString(),
    })
    .eq("id", tokenId);

  if (error) {
    throw error;
  }
}