"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { getVotingSession, clearVotingSession } from "@/lib/voting-session";
import { getOrCreatePublicBallot } from "@/lib/public-voting-session";
import { enforceRateLimit } from "@/lib/rate-limit";

interface VoteSelection { categoryId: string; nomineeId: string; }
interface SubmitVoteInput { electionId: string; votes: VoteSelection[]; }

export async function submitVote({ electionId, votes }: SubmitVoteInput) {
  if (!electionId || !votes?.length) return { success: false, message: "Please select at least one option." };
  const categoryIds = votes.map((vote) => vote.categoryId);
  if (new Set(categoryIds).size !== categoryIds.length) return { success: false, message: "A category cannot contain multiple selections." };

  try {
    const supabase = createAdminClient();
    const { data: settings } = await supabase.from("election_settings").select("voting_mode").eq("election_id", electionId).maybeSingle();
    const secure = settings?.voting_mode === "secure_registration";

    if (secure) {
      const session = await getVotingSession();
      if (!session || session.electionId !== electionId) return { success: false, message: "Voting session expired." };
      await enforceRateLimit(`submit-vote:${session.voterId}:${electionId}`, 3, 900);

      const { error } = await supabase.rpc("submit_secure_ballot", {
        p_election_id: electionId,
        p_voter_id: session.voterId,
        p_token_id: session.tokenId,
        p_votes: votes.map((vote) => ({ category_id: vote.categoryId, nominee_id: vote.nomineeId })),
      });
      if (error) return { success: false, message: safeVoteError(error.message) };
      await clearVotingSession();
      return { success: true };
    }

    const ballot = await getOrCreatePublicBallot(electionId);
    if (ballot.existing) return { success: false, message: "This browser session has already submitted a ballot for this election." };
    await enforceRateLimit(`public-vote:${electionId}:${ballot.nonce}`, 2, 900);

    const { error } = await supabase.rpc("submit_public_ballot", {
      p_election_id: electionId,
      p_ballot_nonce: ballot.nonce,
      p_votes: votes.map((vote) => ({ category_id: vote.categoryId, nominee_id: vote.nomineeId })),
    });
    if (error) return { success: false, message: safeVoteError(error.message) };
    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes("Too many requests")) {
      return { success: false, message: "Too many attempts. Please wait and try again." };
    }
    return { success: false, message: "Unable to submit your vote. Please try again." };
  }
}

function safeVoteError(message: string) {
  const value = message.toLowerCase();
  if (value.includes("already voted") || value.includes("already submitted")) return "You have already submitted a ballot for this election.";
  if (value.includes("ended")) return "This election has ended.";
  if (value.includes("not open")) return "This election is not currently open for voting.";
  if (value.includes("invalid")) return "One or more selections are invalid.";
  return "Unable to submit your vote. Please try again.";
}
