import Link from "next/link";

import { getElection } from "@/lib/elections";
import { getCategories } from "@/lib/categories";

interface PageProps {
  params: Promise<{
    electionId: string;
  }>;
}

export default async function PublicElectionPage({
  params,
}: PageProps) {
  const { electionId } = await params;

  const election =
    await getElection(electionId);

  const categories =
    await getCategories(electionId);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-14">
        <h1 className="text-5xl font-bold">
          {election.title}
        </h1>

        <p className="mt-4 text-lg text-slate-500">
          {election.description}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/elections/${electionId}/${category.id}`}
            className="rounded-3xl border border-slate-200 bg-white p-8 transition hover:border-cyan-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="text-2xl font-bold">
              {category.name}
            </h2>

            <p className="mt-3 text-slate-500">
              {category.description}
            </p>

            <div className="mt-8 flex items-center justify-between">
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-500">
                Max Votes: {category.max_votes}
              </span>

              <span className="font-medium text-cyan-500">
                View →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}