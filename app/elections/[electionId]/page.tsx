import { redirect } from "next/navigation";

import ElectionLanding from "@/components/public/ElectionLanding";

import { getElection } from "@/lib/elections";
import { getElectionSettings } from "@/lib/election-settings";
import { getOrganization } from "@/lib/organizations";
import { getPublicElectionStats } from "@/lib/public-election";
import VotingWizard from "@/components/public/voting/VotingWizard";
import { getVotingData } from "@/lib/public-voting";

interface PageProps {
  params: Promise<{
    electionId: string;
  }>;
}

export default async function PublicElectionPage({
  params,
}: PageProps) {
  const { electionId } = await params;
  console.log("Election ID:", electionId);

  const election =
    await getElection(electionId);
    console.log(election);

  if (!election.is_published) {
    redirect("/");
  }

  const settings =
    await getElectionSettings(electionId);

  const organization =
    await getOrganization(
      election.organization_id
    );

  const stats =
    await getPublicElectionStats(
      electionId
    );

  return (
    <ElectionLanding
      election={election}
      organizationName={organization.name}
      organizationLogo={organization.logo_url}
      votingMode={
        settings?.voting_mode ?? "public"
      }
      totalCategories={
        stats.totalCategories
      }
      registeredVoters={
        stats.registeredVoters
      }
      votesCast={
        stats.votesCast
      }
      turnout={
        stats.turnout
      }
    />
  );
}