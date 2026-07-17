import {
  Building2,
  Vote,
  Users,
  Trophy,
} from "lucide-react";

const activities = [
  {
    icon: Building2,
    title: "Organization Created",
    time: "Just now",
  },
  {
    icon: Vote,
    title: "Election Published",
    time: "5 mins ago",
  },
  {
    icon: Users,
    title: "New Nominee Added",
    time: "12 mins ago",
  },
  {
    icon: Trophy,
    title: "Voting Started",
    time: "30 mins ago",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-white">
        Recent Activity
      </h2>

      <div className="mt-6 space-y-5">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <div className="rounded-xl bg-cyan-500/10 p-3">
                <Icon
                  className="text-cyan-400"
                  size={20}
                />
              </div>

              <div>
                <p className="font-medium text-white">
                  {activity.title}
                </p>

                <p className="text-sm text-slate-400">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}