import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="group rounded-3xl border border-white/8 bg-white/[0.035] p-5 shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.055] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{value.toLocaleString()}</p>
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${color}`}>
          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
      </div>
      <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/5">
        <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 transition-all duration-500 group-hover:w-3/4" />
      </div>
    </div>
  );
}
