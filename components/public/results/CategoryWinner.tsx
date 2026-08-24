import { Crown, Trophy } from "lucide-react";

interface CategoryWinnerProps {
  winner: {
    full_name: string;
    votes: number;
    percentage: number;
  } | null;
}

export default function CategoryWinner({
  winner,
}: CategoryWinnerProps) {
  if (!winner || winner.votes === 0) {
    return (
      <div className="mb-8 rounded-3xl border border-dashed border-slate-700 bg-slate-900/60 p-8 text-center">
        <Trophy className="mx-auto mb-4 h-10 w-10 text-slate-500" />

        <h3 className="text-xl font-bold text-white">
          No Winner Yet
        </h3>

        <p className="mt-2 text-slate-400">
          Voting is still in progress. No votes have been recorded for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8 overflow-hidden rounded-3xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-slate-900 to-slate-900 p-8">

      <div className="flex items-center justify-between">

        <div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-1 text-sm font-semibold text-yellow-300">

            <Crown className="h-4 w-4" />

            Winner

          </div>

          <h2 className="text-3xl font-black text-white">
            {winner.full_name}
          </h2>

          <p className="mt-3 text-slate-400">
            Currently leading this category.
          </p>

        </div>

        <div className="text-right">

          <h3 className="text-5xl font-black text-yellow-400">
            {winner.votes}
          </h3>

          <p className="text-slate-400">
            Votes
          </p>

          <p className="mt-3 text-xl font-bold text-cyan-400">
            {winner.percentage}%
          </p>

        </div>

      </div>

    </div>
  );
}