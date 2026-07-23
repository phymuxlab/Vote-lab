import {
  Trophy,
  Users,
  Vote,
  CheckCircle,
} from "lucide-react";

interface Props {
  stats: {
    categories: number;
    nominees: number;
    votes: number;
  };

  published: boolean;
}

export default function ElectionStats({
  stats,
  published,
}: Props) {
  const cards = [
    {
      title: "Categories",
      value: stats.categories,
      icon: Trophy,
      color: "bg-yellow-500",
    },
    {
      title: "Nominees",
      value: stats.nominees,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Votes",
      value: stats.votes,
      icon: Vote,
      color: "bg-cyan-500",
    },
    {
      title: "Status",
      value: published
        ? "Published"
        : "Draft",
      icon: CheckCircle,
      color: published
        ? "bg-green-500"
        : "bg-orange-500",
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
            <div
              className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${card.color}`}
            >
              <Icon
                className="text-white"
                size={22}
              />
            </div>

            <p className="text-sm text-slate-400">
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