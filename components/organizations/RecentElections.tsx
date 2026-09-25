import Link from "next/link";
import { ArrowUpRight, Vote } from "lucide-react";

interface RecentElection { id: string; title: string; created_at: string; status: string; }
interface Props { organizationId: string; elections: RecentElection[]; }

export default function RecentElections({ organizationId, elections }: Props) {
  return <section className="rounded-3xl border border-white/8 bg-white/[0.035] p-5 sm:p-6">
    <div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Activity</p><h2 className="mt-1 text-xl font-semibold text-white">Recent elections</h2></div><Vote className="h-5 w-5 text-cyan-300" /></div>
    {elections.length === 0 ? <p className="text-sm text-slate-500">No elections created yet.</p> : <div className="space-y-2">{elections.map((election) => <Link key={election.id} href={`/dashboard/organizations/${organizationId}/elections/${election.id}`} className="group flex items-center justify-between gap-3 rounded-2xl border border-white/6 bg-slate-950/40 p-4 hover:border-cyan-400/20 hover:bg-white/[0.04]"><div className="min-w-0"><h3 className="truncate font-medium text-white">{election.title}</h3><p className="mt-1 text-xs text-slate-500">{new Date(election.created_at).toLocaleDateString()}</p></div><div className="flex items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${election.status === "published" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>{election.status}</span><ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-cyan-300" /></div></Link>)}</div>}
  </section>;
}
