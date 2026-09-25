import { BarChart3, Building2, CheckCircle2, Plus, Trophy, Users, Vote, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import RecentVotes from "@/components/dashboard/RecentVotes";
import StatsCard from "@/components/dashboard/StatsCard";
import VotesChart from "@/components/dashboard/VotesChart";
import TopNominees from "@/components/dashboard/TopNominees";
import QuickActions from "@/components/dashboard/QuickActions";
import { getDashboardStats } from "@/lib/dashboard";
import { getVotesPerCategory } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const [stats, chartData] = await Promise.all([getDashboardStats(), getVotesPerCategory()]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(57,230,192,.16),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(108,99,255,.12),transparent_35%),#0a1423] p-6 shadow-2xl shadow-black/20 sm:p-8 lg:p-10">
        <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
              Organiser workspace
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">Run every election from one place.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">Create polished voting experiences, manage nominees and follow participation without leaving your workspace.</p>
          </div>
          <Link href="/dashboard/organizations">
            <Button className="h-12 rounded-2xl bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300">
              <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
              Create election
              <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Workspace statistics">
        <StatsCard title="Organisations" value={stats.organizations} icon={Building2} color="bg-blue-500" />
        <StatsCard title="Elections" value={stats.elections} icon={Vote} color="bg-cyan-500" />
        <StatsCard title="Published" value={stats.published} icon={CheckCircle2} color="bg-emerald-500" />
        <StatsCard title="Categories" value={stats.categories} icon={Trophy} color="bg-amber-500" />
        <StatsCard title="Nominees" value={stats.nominees} icon={Users} color="bg-violet-500" />
        <StatsCard title="Votes" value={stats.votes} icon={BarChart3} color="bg-fuchsia-500" />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2"><VotesChart data={chartData} /></div>
        <TopNominees nominees={stats.leaderboard} />
      </section>

      <RecentVotes votes={stats.recentVotes} />
      <QuickActions />
    </div>
  );
}
