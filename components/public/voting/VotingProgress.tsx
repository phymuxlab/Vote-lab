interface VotingProgressProps {
  current: number;
  total: number;
}

export default function VotingProgress({
  current,
  total,
}: VotingProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Cast Your Vote
          </h2>

          <p className="mt-1 text-slate-400">
            Category {current} of {total}
          </p>

        </div>

        <div className="rounded-xl bg-slate-800 px-5 py-3">

          <span className="text-lg font-semibold text-cyan-400">
            {Math.round(percentage)}%
          </span>

        </div>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}