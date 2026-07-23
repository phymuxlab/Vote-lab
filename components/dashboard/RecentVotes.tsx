interface RecentVote {
  id: string;
  created_at: string;
}

interface RecentVotesProps {
  votes: RecentVote[];
}

export default function RecentVotes({
  votes,
}: RecentVotesProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Recent Activity
        </h2>

        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
          LIVE
        </span>
      </div>

      <div className="space-y-4">
        {votes.length === 0 ? (
          <p className="text-slate-400">
            No voting activity yet.
          </p>
        ) : (
          votes.map((vote) => (
            <div
              key={vote.id}
              className="flex items-center gap-4 rounded-2xl bg-slate-800 p-4 transition hover:bg-slate-700"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
                🗳️
              </div>

              <div className="flex-1">
                <p className="font-semibold text-white">
                  Vote Recorded
                </p>

                <p className="text-sm text-slate-400">
                  {new Date(vote.created_at).toLocaleString()}
                </p>
              </div>

              <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}