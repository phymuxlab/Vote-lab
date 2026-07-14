import Link from "next/link";

import { getPublishedElections } from "@/lib/elections";

export default async function PublicElectionsPage() {
  const elections =
    await getPublishedElections();

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <h1 className="text-5xl font-bold">
          Active Elections
        </h1>

        <p className="mt-3 text-slate-500">
          Vote in currently published elections.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {elections.map((election) => (
          <Link
            key={election.id}
            href={`/elections/${election.id}`}
            className="rounded-3xl border p-8 transition hover:border-cyan-500"
          >
            <h2 className="text-2xl font-bold">
              {election.title}
            </h2>

            <p className="mt-3 text-slate-500">
              {election.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}