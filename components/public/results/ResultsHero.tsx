import { Trophy } from "lucide-react";

interface ResultsHeroProps {
  electionTitle: string;
}

export default function ResultsHero({
  electionTitle,
}: ResultsHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-10">

      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10 flex items-center gap-6">

        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-500/20">
          <Trophy className="h-10 w-10 text-cyan-400" />
        </div>

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Election Results
          </p>

          <h1 className="mt-2 text-4xl font-black text-white">
            {electionTitle}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Live vote totals, rankings and election statistics.
          </p>

        </div>

      </div>

    </section>
  );
}