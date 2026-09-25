import { notFound } from "next/navigation";
import ElectionLanding from "@/components/public/ElectionLanding";
import { getPublicElectionById } from "@/lib/elections";
import { getPublicVotingMode } from "@/lib/election-settings";
import { getPublicOrganization, getPublicElectionStats } from "@/lib/public-election";

interface PageProps { params: Promise<{ electionId: string }>; }

export default async function PublicElectionPage({ params }: PageProps) {
  const { electionId } = await params;
  const election = await getPublicElectionById(electionId);
  if (!election) notFound();
  const organization = await getPublicOrganization(election.organization_id);
  if (!organization) notFound();
  const [votingMode, stats] = await Promise.all([getPublicVotingMode(electionId), getPublicElectionStats(electionId)]);
  return <ElectionLanding election={election} organizationName={organization.name} organizationLogo={organization.logo_url} votingMode={votingMode} totalCategories={stats.totalCategories} registeredVoters={stats.registeredVoters} votesCast={stats.votesCast} turnout={stats.turnout} />;
}
