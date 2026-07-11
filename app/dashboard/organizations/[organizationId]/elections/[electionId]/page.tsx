import { getElection } from "@/lib/elections";

interface PageProps {
  params: Promise<{
    organizationId: string;
    electionId: string;
  }>;
}

export default async function ElectionPage({
  params,
}: PageProps) {
  const { electionId } = await params;

  const election = await getElection(electionId);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          {election.title}
        </h1>

        <p className="mt-2 text-slate-400">
          {election.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Categories</p>
          <h2 className="mt-2 text-3xl font-bold text-white">0</h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Nominees</p>
          <h2 className="mt-2 text-3xl font-bold text-white">0</h2>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-400">Votes Cast</p>
          <h2 className="mt-2 text-3xl font-bold text-white">0</h2>
        </div>
      </div>
    </div>
  );
}