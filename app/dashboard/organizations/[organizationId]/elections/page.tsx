import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getElections } from "@/lib/elections";

interface PageProps {
  params: Promise<{
    organizationId: string;
  }>;
}

export default async function ElectionsPage({
  params,
}: PageProps) {
  const { organizationId } = await params;

  const elections = await getElections(organizationId);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Elections
          </h1>

          <p className="mt-2 text-slate-400">
            Manage elections for this organization.
          </p>
        </div>

        <Link
          href={`/dashboard/organizations/${organizationId}/elections/create`}
        >
          <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
            Create Election
          </Button>
        </Link>
      </div>

      {elections.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
          <h2 className="text-xl font-semibold text-white">
            No Elections Yet
          </h2>

          <p className="mt-2 text-slate-400">
            Create your first election.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {elections.map((election) => (
            <Link
                key={election.id}
                href={`/dashboard/organizations/${organizationId}/elections/${election.id}`}
                className="block rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500 hover:bg-slate-800"
            >
              <h2 className="text-2xl font-bold text-white">
                {election.title}
              </h2>

              <p className="mt-2 text-slate-400">
                {election.description}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                  {election.status}
                </span>

                <span className="text-sm text-slate-500">
                  {new Date(
                    election.start_date
                  ).toLocaleDateString()}
                </span>
             </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}