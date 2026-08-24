import { redirect } from "next/navigation";

import VotingWizard from "@/components/public/voting/VotingWizard";

import { getVotingSession } from "@/lib/voting-session";
import { getElectionSettings } from "@/lib/election-settings";
import { getVotingData } from "@/lib/public-voting";

interface PageProps {
  params: Promise<{
    electionId: string;
  }>;
}

export default async function VotePage({
  params,
}: PageProps) {
  const { electionId } = await params;

  const settings =
    await getElectionSettings(electionId);

  let voterId: string | null = null;
  let tokenId: string | null = null;

  if (
    settings?.voting_mode ===
    "secure_registration"
  ) {
    const session =
      await getVotingSession();

    if (
      !session ||
      session.electionId !==
        electionId
    ) {
      redirect(
        `/elections/${electionId}/verify`
      );
    }

    voterId = session.voterId;
    tokenId = session.tokenId;
  }

  const votingData =
    await getVotingData(
      electionId
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6 py-12">

      <VotingWizard
        electionId={electionId}
        voterId={voterId}
        tokenId={tokenId}
        categories={votingData}
      />

    </div>
  );
}