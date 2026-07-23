import Link from "next/link";

interface Props {
  organizationId: string;
  elections: any[];
}

export default function RecentElections({
  organizationId,
  elections,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Elections
      </h2>

      {elections.length === 0 ? (
        <p className="text-slate-400">
          No elections created yet.
        </p>
      ) : (
        <div className="space-y-4">
          {elections.map((election) => (
            <Link
              key={election.id}
              href={`/dashboard/organizations/${organizationId}/elections/${election.id}`}
              className="block rounded-2xl border border-slate-800 bg-slate-800 p-4 transition hover:border-cyan-500"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">
                    {election.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {new Date(
                      election.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    election.status === "published"
                      ? "bg-green-500/20 text-green-400"
                      : election.status === "draft"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {election.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}