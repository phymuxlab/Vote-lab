import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Plus, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getElections } from "@/lib/elections";
import { getOrganization } from "@/lib/organizations";

interface PageProps { params: Promise<{ organizationId: string }>; }

export default async function ElectionsPage({ params }: PageProps) {
  const { organizationId } = await params;
  const [elections, organization] = await Promise.all([getElections(organizationId), getOrganization(organizationId)]);

  return (
    <div className="space-y-6">
      <div><Link href={`/dashboard/organizations/${organizationId}`} className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"><ArrowLeft className="h-4 w-4" /> {organization?.name ?? "Organisation"}</Link>
        <section className="flex flex-col gap-5 rounded-[1.75rem] border border-white/8 bg-white/[0.035] p-6 sm:p-7 lg:flex-row lg:items-end lg:justify-between"><div><div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300"><Vote className="h-4 w-4" /> Ballot workspace</div><h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Elections</h1><p className="mt-2 text-sm leading-6 text-slate-500">Create and manage every election for {organization?.name ?? "this organisation"}.</p></div><Link href={`/dashboard/organizations/${organizationId}/elections/create`}><Button className="h-11 rounded-xl bg-cyan-400 px-4 font-semibold text-slate-950 hover:bg-cyan-300"><Plus className="mr-2 h-4 w-4" /> Create election <ArrowUpRight className="ml-2 h-4 w-4" /></Button></Link></section>
      </div>

      {elections.length === 0 ? <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/[0.02] p-12 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Vote className="h-6 w-6" /></div><h2 className="mt-5 text-xl font-semibold text-white">No elections yet</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Create your first election and choose between Public Voting and Secure Voting during setup.</p></div> : <div className="grid gap-4">{elections.map((election) => <Link key={election.id} href={`/dashboard/organizations/${organizationId}/elections/${election.id}`} className="group rounded-[1.5rem] border border-white/8 bg-white/[0.035] p-5 transition hover:border-cyan-400/25 hover:bg-white/[0.05] sm:p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="truncate text-lg font-semibold text-white sm:text-xl">{election.title}</h2><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${election.status === "published" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>{election.status}</span></div><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{election.description || "No description provided."}</p></div><div className="flex shrink-0 items-center gap-4 text-xs text-slate-500"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {new Date(election.start_date).toLocaleDateString()}</span><span className="hidden rounded-full border border-white/8 px-3 py-2 text-slate-400 sm:inline-flex">Manage</span><ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-cyan-300" /></div></div></Link>)}</div>}
    </div>
  );
}
