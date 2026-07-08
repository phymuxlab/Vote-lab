import DashboardCard from "@/components/dashboard/DashboardCard";
import { createClient } from "@/lib/supabase/server";

import {
  Vote,
  Users,
  Trophy,
  BarChart3,
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-slate-400">
          {user?.email ?? "No user logged in"}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Total Elections"
          value="12"
          icon={Vote}
          color="bg-cyan-600"
        />

        <DashboardCard
          title="Registered Voters"
          value="3,248"
          icon={Users}
          color="bg-green-600"
        />

        <DashboardCard
          title="Awards"
          value="8"
          icon={Trophy}
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Votes Cast"
          value="15,674"
          icon={BarChart3}
          color="bg-purple-600"
        />
      </div>
    </div>
  );
}