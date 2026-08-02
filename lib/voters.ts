import { randomBytes } from "crypto";

import { createClient } from "@/lib/supabase/server";

export interface RegisterVoterData {
  election_id: string;

  full_name?: string;

  email?: string;

  phone?: string;

  student_id?: string;

  employee_id?: string;

  national_id?: string;
}

/**
 * Generates a unique Vote Lab token.
 */
function generateVotingToken() {
  return `VL-${randomBytes(4)
    .toString("hex")
    .toUpperCase()}`;
}

/**
 * Get election settings.
 */
export async function getElectionSettings(
  electionId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("election_settings")
    .select("*")
    .eq("election_id", electionId)
    .single();

  if (error) throw error;

  return data;
}

/**
 * Check if voter already exists.
 */
export async function voterExists(
  electionId: string,
  field: string,
  value: string
) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("voters")
    .select("id")
    .eq("election_id", electionId)
    .eq(field, value)
    .maybeSingle();

  return !!data;
}

/**
 * Register voter.
 */
export async function registerVoter(
  voter: RegisterVoterData
) {
  const settings =
    await getElectionSettings(
      voter.election_id
    );

  const uniqueField =
    settings.unique_identifier;

  const uniqueValue =
    (voter as any)[uniqueField];

  if (!uniqueValue) {
    throw new Error(
      `${uniqueField} is required.`
    );
  }

  const exists =
    await voterExists(
      voter.election_id,
      uniqueField,
      uniqueValue
    );

  if (exists) {
    throw new Error(
      "You have already registered for this election."
    );
  }

  const token =
    generateVotingToken();

  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("voters")
      .insert({
        ...voter,
        voting_token: token,
      })
      .select()
      .single();

  if (error) throw error;

  return data;
}

/**
 * Validate a voting token.
 */
export async function validateVotingToken(
  token: string
) {
  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("voters")
      .select("*")
      .eq("voting_token", token)
      .single();

  if (error) return null;

  if (data.token_used) {
    return null;
  }

  return data;
}

/**
 * Mark token as used.
 */
export async function consumeVotingToken(
  voterId: string
) {
  const supabase =
    await createClient();

  const { error } =
    await supabase
      .from("voters")
      .update({
        token_used: true,
      })
      .eq("id", voterId);

  if (error) throw error;
}