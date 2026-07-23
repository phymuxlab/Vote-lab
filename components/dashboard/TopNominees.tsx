interface TopNomineesProps {
  nominees: {
    id: string;
    full_name: string;
    voteCount: number;
  }[];
}

export default function TopNominees({
  nominees,
}: TopNomineesProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        🏆 Top Nominees
      </h2>

      <div className="space-y-4">
        {nominees.map((nominee, index) => (
          <div
            key={nominee.id}
            className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : `#${index + 1}`}
              </div>

              <div>
                <p className="font-semibold text-white">
                  {nominee.full_name}
                </p>

                <p className="text-sm text-slate-400">
                  {nominee.voteCount} Votes
                </p>
              </div>
            </div>

            <div className="text-cyan-400 font-bold">
              {nominee.voteCount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}