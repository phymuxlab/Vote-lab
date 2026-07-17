import {
  Building2,
  Vote,
  Trophy,
  Users,
  BarChart3,
  CheckCircle,
} from "lucide-react";

import DashboardCharts from "@/components/dashboard/DashboardCharts";
import StatsCard from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

import { getDashboardStats } from "@/lib/dashboard";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="rounded-3xl border border-slate-800 bg-gradient-to-r from-cyan-600/20 via-slate-900 to-slate-900 p-8">
        <h1 className="text-4xl font-bold text-white">
          Welcome back 👋
        </h1>

        <p className="mt-3 max-w-2xl text-slate-300">
          Monitor your organizations, elections and voting
          activities from one beautiful dashboard.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Organizations"
          value={stats.organizations}
          icon={Building2}
          color="bg-blue-600"
        />

        <StatsCard
          title="Elections"
          value={stats.elections}
          icon={Vote}
          color="bg-cyan-600"
        />

        <StatsCard
          title="Published"
          value={stats.published}
          icon={CheckCircle}
          color="bg-green-600"
        />

        <StatsCard
          title="Categories"
          value={stats.categories}
          icon={Trophy}
          color="bg-yellow-500"
        />

        <StatsCard
          title="Nominees"
          value={stats.nominees}
          icon={Users}
          color="bg-purple-600"
        />

        <StatsCard
          title="Votes"
          value={stats.votes}
          icon={BarChart3}
          color="bg-pink-600"
        />
      </div>
      <DashboardCharts />

    <div className="grid gap-8 xl:grid-cols-3"></div>
      {/* Bottom Section */}
      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <QuickActions />
        </div>

        <RecentActivity />
      </div>
    </div>
  );
}