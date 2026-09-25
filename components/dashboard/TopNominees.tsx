import { Medal, Trophy } from "lucide-react";

interface TopNomineesProps { nominees: { id: string; full_name: string; voteCount: number }[]; }

export default function TopNominees({ nominees }: TopNomineesProps) {
  return <div className="rounded-3xl border border-white/8 bg-white/[0.035] p-5 sm:p-6"><div className="mb-5 flex items-center gap-2"><Trophy className="h-5 w-5 text-amber-300" /><h2 className="text-xl font-semibold text-white">Top nominees</h2></div><div className="space-y-2">{nominees.map((nominee, index) => <div key={nominee.id} className="flex items-center justify-between rounded-2xl border border-white/6 bg-slate-950/35 p-4"><div className="flex min-w-0 items-center gap-3"><div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${index === 0 ? "bg-amber-400/15 text-amber-300" : "bg-white/5 text-slate-400"}`}>{index < 3 ? <Medal className="h-4 w-4" /> : `#${index + 1}`}</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{nominee.full_name}</p><p className="mt-0.5 text-xs text-slate-500">{nominee.voteCount.toLocaleString()} votes</p></div></div><span className="font-semibold text-cyan-300">{nominee.voteCount.toLocaleString()}</span></div>)}</div></div>;
}
