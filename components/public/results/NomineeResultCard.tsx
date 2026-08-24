import { Crown, Medal, Award } from "lucide-react";

import WinnerBadge from "./WinnerBadge";

interface NomineeResultCardProps {
  rank: number;
  fullName: string;
  votes: number;
  percentage: number;
}

export default function NomineeResultCard({
  rank,
  fullName,
  votes,
  percentage,
}: NomineeResultCardProps) {
  const rankIcon =
    rank === 1 ? (
      <Crown className="h-6 w-6 text-yellow-400" />
    ) : rank === 2 ? (
      <Medal className="h-6 w-6 text-slate-300" />
    ) : rank === 3 ? (
      <Award className="h-6 w-6 text-amber-700" />
    ) : null;

  return (
    <div
      className={`rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
        rank === 1
          ? "border-yellow-500/40 bg-gradient-to-r from-yellow-500/10 to-slate-900"
          : "border-slate-800 bg-slate-900"
      }`}
    >
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800">
            {rankIcon}
          </div>

          <div>

            <h3 className="text-xl font-bold text-white">
              {fullName}
            </h3>

            <p className="mt-1 text-slate-400">
              {votes} Vote{votes !== 1 ? "s" : ""}
            </p>

          </div>

        </div>

        {rank === 1 && <WinnerBadge />}

      </div>

      <div className="mt-6">

        <div className="mb-2 flex justify-between text-sm">

          <span className="text-slate-400">
            Vote Share
          </span>

          <span className="font-semibold text-cyan-400">
            {percentage}%
          </span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-800">

          <div
            className={`h-full rounded-full transition-all duration-700 ${
              rank === 1
                ? "bg-yellow-400"
                : "bg-cyan-500"
            }`}
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}