import { redirect } from "next/navigation";

import ResultsHero from "@/components/public/results/ResultsHero";
import ResultsSummary from "@/components/public/results/ResultsSummary";
import CategoryResults from "@/components/public/results/CategoryResults";

import { getElection } from "@/lib/elections";
import { getElectionResults } from "@/lib/results";

interface PageProps {
  params: Promise<{
    organizationId: string;
    electionId: string;
  }>;
}

interface ResultsSummaryProps {
  categories: number;
  totalVotes: number;
  winner: string;
  averageVotes: number;
}

export default async function ResultsPage({
  params,
}: PageProps) {
  const { electionId } = await params;

  const election = await getElection(electionId);

  if (!election) {
    redirect("/dashboard/elections");
  }

  const results =
    await getElectionResults(electionId);

  const totalVotes = results.reduce(
    (sum, category) => sum + category.totalVotes,
    0
  );

  const averageVotes =
  results.length === 0
    ? 0
    : Math.round(totalVotes / results.length);

  // Determine overall leading candidate
  const allNominees = results.flatMap((category) =>
    category.nominees
  );

  const overallLeader =
    allNominees.length > 0
      ? allNominees.reduce((leader, nominee) =>
          nominee.votes > leader.votes
            ? nominee
            : leader
        )
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">

      <div className="mx-auto max-w-7xl space-y-10 px-8 py-10">

        <ResultsHero
          electionTitle={election.title}
        />

        <ResultsSummary
          categories={results.length}
          totalVotes={totalVotes}
          winner={
          overallLeader
      ? overallLeader.full_name
      : "No votes yet"
  }
  averageVotes={averageVotes}
/>

        <div className="space-y-8">

          {results.map((category) => (
           <CategoryResults
  key={category.id}
  name={category.name}
  totalVotes={category.totalVotes}
  winner={category.winner}
  nominees={category.nominees}
/>
          ))}

        </div>

      </div>

    </div>
  );
}