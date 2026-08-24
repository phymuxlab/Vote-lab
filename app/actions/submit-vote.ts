"use server";

import { createClient } from "@/lib/supabase/server";

import {
  getVotingSession,
  clearVotingSession,
} from "@/lib/voting-session";

import { verifyVotingToken } from "@/lib/voter-tokens";

interface VoteSelection {
  categoryId: string;
  nomineeId: string;
}

interface SubmitVoteInput {
  electionId: string;
  votes: VoteSelection[];
}

export async function submitVote({
  electionId,
  votes,
}: SubmitVoteInput) {
  /*
   * --------------------------------------------------
   * 1. Validate voting session
   * --------------------------------------------------
   */

  const session = await getVotingSession();

  if (!session) {
    return {
      success: false,
      message: "Voting session expired.",
    };
  }

  if (session.electionId !== electionId) {
    return {
      success: false,
      message: "Invalid voting session.",
    };
  }

  /*
   * --------------------------------------------------
   * 2. Validate submitted votes
   * --------------------------------------------------
   */

  if (!votes || votes.length === 0) {
    return {
      success: false,
      message: "Please select at least one option.",
    };
  }

  /*
   * Remove accidental duplicate category
   * submissions.
   */

  const categoryIds = votes.map(
    (vote) => vote.categoryId
  );

  const uniqueCategoryIds = new Set(
    categoryIds
  );

  if (
    uniqueCategoryIds.size !==
    categoryIds.length
  ) {
    return {
      success: false,
      message:
        "A category cannot contain multiple selections.",
    };
  }

  /*
   * --------------------------------------------------
   * 3. Create database client
   * --------------------------------------------------
   */

  const supabase = await createClient();

  /*
   * --------------------------------------------------
   * 4. Verify election
   * --------------------------------------------------
   */

  const {
    data: election,
    error: electionError,
  } = await supabase
    .from("elections")
    .select(
      "id, status, is_published, start_date, end_date"
    )
    .eq("id", electionId)
    .single();

  if (electionError || !election) {
    console.error(
      "ELECTION VALIDATION ERROR:",
      electionError
    );

    return {
      success: false,
      message:
        "Unable to verify this election.",
    };
  }

  /*
   * Election must be published.
   */

  if (!election.is_published) {
    return {
      success: false,
      message:
        "This election is not currently available.",
    };
  }

  /*
   * Check election status if your system
   * uses the status field.
   */

  if (
    election.status !== "published" &&
    election.status !== "active"
  ) {
    return {
      success: false,
      message:
        "This election is not currently open for voting.",
    };
  }

  /*
   * Check start date.
   */

  if (
    election.start_date &&
    new Date(election.start_date) >
      new Date()
  ) {
    return {
      success: false,
      message:
        "Voting has not started yet.",
    };
  }

  /*
   * Check end date.
   */

  if (
    election.end_date &&
    new Date(election.end_date) <=
      new Date()
  ) {
    return {
      success: false,
      message:
        "This election has ended.",
    };
  }

  /*
   * --------------------------------------------------
   * 5. Verify voter
   * --------------------------------------------------
   */

  const {
    data: voter,
    error: voterError,
  } = await supabase
    .from("voters")
    .select("id, election_id")
    .eq("id", session.voterId)
    .single();

  if (
    voterError ||
    !voter ||
    voter.election_id !== electionId
  ) {
    console.error(
      "VOTER VALIDATION ERROR:",
      voterError
    );

    return {
      success: false,
      message:
        "Invalid voter session.",
    };
  }

  /*
   * --------------------------------------------------
   * 6. Verify token directly against database
   * --------------------------------------------------
   */

  const tokenResult =
    await verifyVotingToken(
      electionId,
      session.tokenId
        ? await getTokenValue(
            supabase,
            session.tokenId
          )
        : ""
    );

  if (!tokenResult.valid) {
    return {
      success: false,
      message:
        tokenResult.reason ||
        "Invalid voting token.",
    };
  }

  /*
   * Make sure the token belongs to this voter.
   */

  if (
    tokenResult.token.voter_id !==
    session.voterId
  ) {
    return {
      success: false,
      message:
        "Voting token does not belong to this voter.",
    };
  }

  /*
   * Make sure the token being used is the
   * same token stored in the voting session.
   */

  if (
    tokenResult.token.id !==
    session.tokenId
  ) {
    return {
      success: false,
      message:
        "Invalid voting session token.",
    };
  }

  /*
   * --------------------------------------------------
   * 7. Prevent duplicate voting
   * --------------------------------------------------
   */

  const {
    data: existingVotes,
    error: existingVoteError,
  } = await supabase
    .from("votes")
    .select("id")
    .eq("election_id", electionId)
    .eq("voter_id", session.voterId)
    .limit(1);

  if (existingVoteError) {
    console.error(
      "EXISTING VOTE CHECK ERROR:",
      existingVoteError
    );

    return {
      success: false,
      message:
        "Unable to verify voting status.",
    };
  }

  if (
    existingVotes &&
    existingVotes.length > 0
  ) {
    return {
      success: false,
      message:
        "You have already voted.",
    };
  }

  /*
   * --------------------------------------------------
   * 8. Validate categories
   * --------------------------------------------------
   */

  const {
    data: categories,
    error: categoriesError,
  } = await supabase
    .from("election_categories")
    .select(
      "id, election_id, max_votes"
    )
    .eq("election_id", electionId);

  if (categoriesError) {
    console.error(
      "CATEGORY VALIDATION ERROR:",
      categoriesError
    );

    return {
      success: false,
      message:
        "Unable to verify election categories.",
    };
  }

  const categoryMap = new Map(
    (categories ?? []).map(
      (category) => [
        category.id,
        category,
      ]
    )
  );

  /*
   * Every submitted category must belong
   * to this election.
   */

  for (const vote of votes) {
    const category =
      categoryMap.get(
        vote.categoryId
      );

    if (!category) {
      return {
        success: false,
        message:
          "One or more selected categories are invalid.",
      };
    }

    /*
     * Current VotingWizard supports one nominee
     * per category.
     */

    if (
      category.max_votes &&
      category.max_votes < 1
    ) {
      return {
        success: false,
        message:
          "This category is not currently available for voting.",
      };
    }
  }

  /*
   * --------------------------------------------------
   * 9. Validate nominees
   * --------------------------------------------------
   */

  const nomineeIds = votes.map(
    (vote) => vote.nomineeId
  );

  const {
    data: nominees,
    error: nomineesError,
  } = await supabase
    .from("nominees")
    .select(
      "id, category_id"
    )
    .in("id", nomineeIds);

  if (nomineesError) {
    console.error(
      "NOMINEE VALIDATION ERROR:",
      nomineesError
    );

    return {
      success: false,
      message:
        "Unable to verify selected nominees.",
    };
  }

  const nomineeMap = new Map(
    (nominees ?? []).map(
      (nominee) => [
        nominee.id,
        nominee,
      ]
    )
  );

  /*
   * Every nominee must:
   *
   * 1. Exist
   * 2. Belong to the submitted category
   */

  for (const vote of votes) {
    const nominee =
      nomineeMap.get(
        vote.nomineeId
      );

    if (!nominee) {
      return {
        success: false,
        message:
          "One or more selected nominees are invalid.",
      };
    }

    if (
      nominee.category_id !==
      vote.categoryId
    ) {
      return {
        success: false,
        message:
          "A selected nominee does not belong to its category.",
      };
    }
  }

  /*
   * --------------------------------------------------
   * 10. Build validated vote records
   * --------------------------------------------------
   */

  const records = votes.map(
    (vote) => ({
      election_id: electionId,
      category_id: vote.categoryId,
      nominee_id: vote.nomineeId,
      voter_id: session.voterId,
    })
  );

  /*
   * --------------------------------------------------
   * 11. Insert votes
   * --------------------------------------------------
   */

  const {
    error: insertError,
  } = await supabase
    .from("votes")
    .insert(records);

  if (insertError) {
    console.error(
      "VOTE INSERT ERROR:",
      insertError
    );

    return {
      success: false,
      message:
        "Unable to submit your vote. Please try again.",
    };
  }

  /*
   * --------------------------------------------------
   * 12. Mark token as used
   * --------------------------------------------------
   */

  try {
    await markTokenAsUsedSafely(
      supabase,
      session.tokenId
    );
  } catch (error) {
    /*
     * The vote has already been recorded.
     *
     * Do not tell the voter that the vote failed,
     * because that could cause them to submit
     * another vote.
     */

    console.error(
      "TOKEN CONSUMPTION ERROR:",
      error
    );
  }

  /*
   * --------------------------------------------------
   * 13. Clear voting session
   * --------------------------------------------------
   */

  await clearVotingSession();

  /*
   * --------------------------------------------------
   * 14. Success
   * --------------------------------------------------
   */

  return {
    success: true,
  };
}

/*
 * ==================================================
 * Helper: get token value
 * ==================================================
 *
 * We deliberately look the token up by its database
 * ID rather than trusting a token value sent from
 * the browser.
 */

async function getTokenValue(
  supabase: Awaited<
    ReturnType<typeof createClient>
  >,
  tokenId: string
) {
  if (!tokenId) {
    return "";
  }

  const {
    data,
    error,
  } = await supabase
    .from("voter_tokens")
    .select("token")
    .eq("id", tokenId)
    .single();

  if (error || !data) {
    return "";
  }

  return data.token;
}

/*
 * ==================================================
 * Helper: safely consume token
 * ==================================================
 */

async function markTokenAsUsedSafely(
  supabase: Awaited<
    ReturnType<typeof createClient>
  >,
  tokenId: string
) {
  if (!tokenId) {
    throw new Error(
      "Missing voting token."
    );
  }

  const {
    data,
    error,
  } = await supabase
    .from("voter_tokens")
    .update({
      used: true,
      used_at:
        new Date().toISOString(),
    })
    .eq("id", tokenId)
    .eq("used", false)
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error(
      "Token was already used."
    );
  }

  return data;
}