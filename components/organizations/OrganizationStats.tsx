import { BarChart3, Trophy, Users, Vote } from "lucide-react";

interface Props { stats: { elections: number; categories: number; nominees: number; votes: number; }; }

export default function OrganizationStats({ stats }: Props) {
  const cards = [
    { title: "Elections", value: stats.elections, icon: Vote },
    { title: "Categories", value: stats.categories, icon: Trophy },
    { title: "Nominees", value: stats.nominees, icon: Users },
    { title: "Votes", value: stats.votes, icon: BarChart3 },
  ];
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(({ title, value, icon: Icon }) => <div key={title} className="rounded-3xl border border-white/8 bg-white/[0.035] p-5"><div className="flex items-center justify-between"><div><p className="text-sm text-slate-500">{title}</p><p className="mt-2 text-3xl font-bold text-white">{value.toLocaleString()}</p></div><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Icon className="h-5 w-5" /></div></div></div>)}</div>;
}
