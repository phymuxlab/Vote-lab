import {
  Award,
  Vote,
  Trophy,
  Users,
} from "lucide-react";

interface ResultsSummaryProps {
  categories: number;
  totalVotes: number;
  winner: string;
  averageVotes: number;
}

export default function ResultsSummary({
  categories,
  totalVotes,
  winner,
  averageVotes,
}: ResultsSummaryProps) {
  const card =
    "rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur p-8 transition hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10";

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <div className={card}>
        <Award className="mb-4 h-10 w-10 text-cyan-400" />

        <h2 className="text-4xl font-black text-white">
          {categories}
        </h2>

        <p className="mt-2 text-slate-400">
          Categories
        </p>
      </div>

      <div className={card}>
        <Vote className="mb-4 h-10 w-10 text-green-400" />

        <h2 className="text-4xl font-black text-white">
          {totalVotes}
        </h2>

        <p className="mt-2 text-slate-400">
          Votes Cast
        </p>
      </div>

      <div className={card}>
        <Trophy className="mb-4 h-10 w-10 text-yellow-400" />

        <h2 className="text-2xl font-bold text-white break-words">
          {winner}
        </h2>

        <p className="mt-2 text-slate-400">
          Leading Candidate
        </p>
      </div>

      <div className={card}>
        <Users className="mb-4 h-10 w-10 text-purple-400" />

        <h2 className="text-4xl font-black text-white">
          {averageVotes}
        </h2>

        <p className="mt-2 text-slate-400">
          Avg Votes / Category
        </p>
      </div>

    </section>
  );
}