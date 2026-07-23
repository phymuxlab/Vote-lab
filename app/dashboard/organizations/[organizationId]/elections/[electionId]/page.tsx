import Link from "next/link";

import { Button } from "@/components/ui/button";

import PublishElectionButton from "@/components/elections/PublishElectionButton";

import VoteTimeline from "@/components/elections/VoteTimeline";
import { getVoteTimeline } from "@/lib/vote-analytics";
import TopNominees from "@/components/elections/TopNominees";
import { getTopNominees } from "@/lib/election-analytics";
import ElectionStats from "@/components/elections/ElectionStats";
import { getElectionStats } from "@/lib/election-dashboard";
import { getElection } from "@/lib/elections";
import { getCategories } from "@/lib/categories";

interface PageProps {
  params: Promise<{
    organizationId: string;
    electionId: string;
  }>;
}

export default async function ElectionDetailsPage({
  params,
}: PageProps) {
  const { organizationId, electionId } =
    await params;

  const election =
    await getElection(electionId);

  const categories =
    await getCategories(electionId);

  const stats =
    await getElectionStats(electionId);
  
  const nominees =
   await getTopNominees(electionId);
  
  const voteTimeline =
    await getVoteTimeline(electionId);

  return (
    <div className="space-y-10">

      {/* Election Hero */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 flex items-center gap-3">

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${
                  election.is_published
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {election.is_published
                  ? "Published"
                  : "Draft"}
              </span>

            </div>

            <h1 className="text-4xl font-bold text-white">
              {election.title}
            </h1>

            <p className="mt-4 max-w-3xl text-slate-400">
              {election.description}
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <PublishElectionButton
              electionId={election.id}
            />

            <Link
              href={`/dashboard/organizations/${organizationId}/elections/${electionId}/categories/create`}
            >
              <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
                + Create Category
              </Button>
            </Link>

          </div>

        </div>
      </div>
<ElectionStats
  stats={stats}
  published={election.is_published}
/>
<TopNominees nominees={nominees} />

<VoteTimeline data={voteTimeline} />

      {/* Categories */}

      {categories.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            No Categories Yet
          </h2>

          <p className="mt-3 text-slate-400">
            Create the first category for this election.
          </p>

          <Link
            href={`/dashboard/organizations/${organizationId}/elections/${electionId}/categories/create`}
            className="mt-8 inline-block"
          >
            <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
              Create First Category
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              Categories
            </h2>

            <p className="mt-2 text-slate-400">
              Manage all election categories.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/dashboard/organizations/${organizationId}/elections/${electionId}/categories/${category.id}`}
                className="group block rounded-3xl border border-slate-800 bg-slate-900 p-6 transition duration-300 hover:border-cyan-500 hover:bg-slate-800 hover:shadow-xl"
              >
                <h2 className="text-2xl font-bold text-white">
                  {category.name}
                </h2>

                <p className="mt-2 text-slate-400">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-400">
                    Max Votes: {category.max_votes}
                  </span>

                  <span className="font-medium text-cyan-400 transition group-hover:translate-x-1">
                    View →
                  </span>

                </div>

              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}