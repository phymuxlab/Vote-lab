import {
  Users,
  Award,
  Vote,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

interface ElectionStatsProps {
  totalCategories: number;
  registeredVoters: number;
  votesCast: number;
  turnout: number;
  votingMode: string;
}

export default function ElectionStats({
  totalCategories,
  registeredVoters,
  votesCast,
  turnout,
  votingMode,
}: ElectionStatsProps) {
  const card =
    "rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur p-8 text-center transition hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10";

  return (
    <section className="space-y-8">

      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">
          Election Overview
        </h2>

        <p className="mt-3 text-slate-400">
          Everything you need to know before voting.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className={card}>
          <Award className="mx-auto mb-5 h-12 w-12 text-cyan-400" />

          <h3 className="text-5xl font-black text-white">
            {totalCategories}
          </h3>

          <p className="mt-3 text-slate-400">
            Positions
          </p>
        </div>

        {votingMode === "secure_registration" ? (
          <div className={card}>
            <Users className="mx-auto mb-5 h-12 w-12 text-green-400" />

            <h3 className="text-5xl font-black text-white">
              {registeredVoters}
            </h3>

            <p className="mt-3 text-slate-400">
              Registered Voters
            </p>
          </div>
        ) : (
          <div className={card}>
            <ShieldCheck className="mx-auto mb-5 h-12 w-12 text-green-400" />

            <h3 className="text-3xl font-bold text-white">
              Public
            </h3>

            <p className="mt-3 text-slate-400">
              Voting Access
            </p>
          </div>
        )}

        <div className={card}>
          <Vote className="mx-auto mb-5 h-12 w-12 text-cyan-400" />

          <h3 className="text-5xl font-black text-white">
            {votesCast}
          </h3>

          <p className="mt-3 text-slate-400">
            Votes Cast
          </p>
        </div>

        <div className={card}>
          <BarChart3 className="mx-auto mb-5 h-12 w-12 text-yellow-400" />

          <h3 className="text-5xl font-black text-white">
            {turnout}%
          </h3>

          <p className="mt-3 text-slate-400">
            Turnout
          </p>
        </div>

      </div>

    </section>
  );
}