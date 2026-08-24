import NomineeResultCard from "./NomineeResultCard";
import CategoryWinner from "./CategoryWinner";

interface Nominee {
  id: string;
  full_name: string;
  votes: number;
  percentage: number;
}

interface CategoryResultsProps {
  name: string;
  totalVotes: number;

  winner: {
    full_name: string;
    votes: number;
    percentage: number;
  } | null;

  nominees: Nominee[];
}

export default function CategoryResults({
  name,
  totalVotes,
  winner,
  nominees,
}: CategoryResultsProps) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            {name}
          </h2>

          <p className="mt-2 text-slate-400">
            {totalVotes} Total Votes
          </p>

        </div>

      </div>

      <CategoryWinner winner={winner} />

      <div className="space-y-5">

        {nominees.map((nominee, index) => (
          <NomineeResultCard
            key={nominee.id}
            rank={index + 1}
            fullName={nominee.full_name}
            votes={nominee.votes}
            percentage={nominee.percentage}
          />
        ))}

      </div>

    </section>
  );
}