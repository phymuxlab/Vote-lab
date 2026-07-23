interface Props {
  activity: any[];
}

export default function LiveActivity({
  activity,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Live Activity
        </h2>

        <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
          LIVE
        </span>
      </div>

      {activity.length === 0 ? (
        <p className="text-slate-400">
          No activity yet.
        </p>
      ) : (
        <div className="space-y-4">
          {activity.map((vote) => (
            <div
              key={vote.id}
              className="rounded-xl bg-slate-800 p-4"
            >
              <p className="font-semibold text-white">
                🗳️ Vote Recorded
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {vote.nominees?.full_name}
              </p>

              <p className="mt-2 text-xs text-slate-500">
                {new Date(
                  vote.created_at
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}