import { randomBytes } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export async function generateVotingToken(electionId: string, voterId?: string) {
  const supabase = createAdminClient();
  const token = randomBytes(4).toString("hex").toUpperCase();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const { data, error } = await supabase.from("voter_tokens").insert({
    election_id: electionId,
    voter_id: voterId ?? null,
    token,
    expires_at: expiresAt.toISOString(),
  }).select("id, election_id, voter_id, token, used, expires_at").single();

  if (error) throw error;
  return data;
}

export async function verifyVotingToken(electionId: string, token: string) {
  const supabase = createAdminClient();
  const normalized = token.replace(/[^A-Fa-f0-9]/g, "").toUpperCase();
  if (!/^[A-F0-9]{8}$/.test(normalized)) return { valid: false, reason: "Invalid token." } as const;

  const { data, error } = await supabase.from("voter_tokens").select("id, election_id, voter_id, used, expires_at, token").eq("election_id", electionId).eq("token", normalized).single();
  if (error || !data) return { valid: false, reason: "Invalid token." } as const;
  if (data.used) return { valid: false, reason: "This token has already been used." } as const;
  if (data.expires_at && new Date(data.expires_at) <= new Date()) return { valid: false, reason: "Token expired." } as const;
  return { valid: true, token: data } as const;
}

export async function markTokenAsUsed(tokenId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from("voter_tokens").update({ used: true, used_at: new Date().toISOString() }).eq("id", tokenId).eq("used", false).select("id").maybeSingle();
  if (error || !data) throw new Error("Token is no longer available.");
  return data;
}
