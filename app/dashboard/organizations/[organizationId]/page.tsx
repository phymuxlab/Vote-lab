import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BarChart3, Globe2, Mail, Settings, Trophy, Vote } from "lucide-react";
import LiveActivity from "@/components/organizations/LiveActivity";
import { getRecentActivity } from "@/lib/activity";
import RecentElections from "@/components/organizations/RecentElections";
import { getRecentElections } from "@/lib/recent-elections";
import OrganizationStats from "@/components/organizations/OrganizationStats";
import { getOrganizationStats } from "@/lib/organization-dashboard";
import { getOrganization } from "@/lib/organizations";

interface PageProps { params: Promise<{ organizationId: string }>; }

export default async function OrganizationPage({ params }: PageProps) {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId);
  if (!organization) return null;
  const [activity, recentElections, stats] = await Promise.all([
    getRecentActivity(organizationId),
    getRecentElections(organizationId),
    getOrganizationStats(organizationId),
  ]);

  const cards = [
    { title: "Elections", description: "Create, publish and manage ballots", href: `/dashboard/organizations/${organizationId}/elections`, icon: Vote },
    { title: "Election content", description: "Manage categories and nominees", href: `/dashboard/organizations/${organizationId}/elections`, icon: Trophy },
    { title: "Results", description: "Open an election to review results", href: `/dashboard/organizations/${organizationId}/elections`, icon: BarChart3 },
    { title: "Settings", description: "Update identity and organisation details", href: `/dashboard/organizations/${organizationId}/settings`, icon: Settings },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(57,230,192,.14),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(108,99,255,.10),transparent_32%),#0a1423] p-6 shadow-2xl shadow-black/20 sm:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-5">
            {organization.logo_url ? <Image src={organization.logo_url} alt={`${organization.name} logo`} width={88} height={88} className="h-[88px] w-[88px] shrink-0 rounded-[1.5rem] border border-white/10 bg-slate-950 object-cover shadow-xl" /> : <div className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-[1.5rem] bg-cyan-400 text-3xl font-bold text-slate-950 shadow-xl">{organization.name.charAt(0).toUpperCase()}</div>}
            <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Organisation workspace</p><h1 className="mt-2 truncate text-3xl font-bold tracking-tight text-white sm:text-4xl">{organization.name}</h1>{organization.motto && <p className="mt-2 text-sm text-slate-400">{organization.motto}</p>}</div>
          </div>
          <Link href={`/dashboard/organizations/${organizationId}/settings`} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white hover:bg-white/[0.08]"><Settings className="h-4 w-4" /> Settings</Link>
        </div>
        <div className="relative mt-7 grid gap-4 border-t border-white/8 pt-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-3xl text-sm leading-6 text-slate-400">{organization.description || "Use this workspace to manage your elections, nominees and participation."}</p>
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">{organization.website && <a href={organization.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-2 hover:text-white"><Globe2 className="h-3.5 w-3.5" /> Website</a>}{organization.contact_email && <span className="inline-flex items-center gap-2 rounded-full border border-white/8 px-3 py-2"><Mail className="h-3.5 w-3.5" /> {organization.contact_email}</span>}</div>
        </div>
      </section>

      <OrganizationStats stats={stats} />

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2"><div className="mb-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Workspace tools</p><h2 className="mt-1 text-2xl font-bold text-white">Quick actions</h2><p className="mt-1 text-sm text-slate-500">Jump straight into the part of your election you want to manage.</p></div><div className="grid gap-4 sm:grid-cols-2">{cards.map(({ title, description, href, icon: Icon }) => <Link key={title} href={href} className="group rounded-3xl border border-white/8 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-white/[0.055]"><div className="flex items-start justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Icon className="h-5 w-5" /></div><ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:text-cyan-300" /></div><h3 className="mt-5 font-semibold text-white">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{description}</p></Link>)}</div></div>
        <div className="space-y-6"><RecentElections organizationId={organizationId} elections={recentElections} /><LiveActivity activity={activity} /></div>
      </section>
    </div>
  );
}
