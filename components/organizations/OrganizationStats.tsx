import {
  Vote,
  Trophy,
  Users,
  BarChart3,
} from "lucide-react";

interface Props {
  stats: {
    elections: number;
    categories: number;
    nominees: number;
    votes: number;
  };
}

export default function OrganizationStats({
  stats,
}: Props) {
  const cards = [
    {
      title: "Elections",
      value: stats.elections,
      icon: Vote,
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: Trophy,
    },
    {
      title: "Nominees",
      value: stats.nominees,
      icon: Users,
    },
    {
      title: "Votes",
      value: stats.votes,
      icon: BarChart3,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
          >
            <Icon
              className="mb-4 text-cyan-400"
              size={34}
            />

            <p className="text-slate-400">
              {card.title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
}