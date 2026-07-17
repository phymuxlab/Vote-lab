import {
  Building2,
  Vote,
  Trophy,
  Users,
  BarChart3,
  CheckCircle,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import { getDashboardStats } from "@/lib/dashboard";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back to Vote Lab.
        </p>
      </div>

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
    </div>
  );
}