import Link from "next/link";

import { Button } from "@/components/ui/button";

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

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            {election.title}
          </h1>

          <p className="mt-2 text-slate-400">
            {election.description}
          </p>
        </div>

        <Link
          href={`/dashboard/organizations/${organizationId}/elections/${electionId}/categories/create`}
        >
          <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
            + Create Category
          </Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            No Categories Yet
          </h2>

          <p className="mt-3 text-slate-400">
            Create the first category for this election.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
              <h2 className="text-2xl font-bold text-white">
                {category.name}
              </h2>

              <p className="mt-2 text-slate-400">
                {category.description}
              </p>

              <div className="mt-6">
                <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-400">
                  Max Votes: {category.max_votes}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}