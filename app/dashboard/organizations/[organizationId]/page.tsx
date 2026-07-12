import Link from "next/link";

import {
  Vote,
  Trophy,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

interface PageProps {
  params: Promise<{
    organizationId: string;
  }>;
}

export default async function OrganizationPage({
  params,
}: PageProps) {
  const { organizationId } = await params;

  const cards = [
    {
      title: "Elections",
      description: "Manage all elections",
      href: `/dashboard/organizations/${organizationId}/elections`,
      icon: Vote,
    },
    {
      title: "Categories",
      description: "Election positions",
      href: `/dashboard/organizations/${organizationId}/categories`,
      icon: Trophy,
    },
    {
      title: "Nominees",
      description: "Manage contestants",
      href: `/dashboard/organizations/${organizationId}/nominees`,
      icon: Users,
    },
    {
      title: "Results",
      description: "View live results",
      href: `/dashboard/organizations/${organizationId}/results`,
      icon: BarChart3,
    },
    {
      title: "Settings",
      description: "Organization settings",
      href: `/dashboard/organizations/${organizationId}/settings`,
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Organization Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your elections, nominees, voters and results.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-cyan-500 hover:bg-slate-800"
            >
              <Icon
                className="mb-6 text-cyan-400 group-hover:scale-110 transition"
                size={42}
              />

              <h2 className="text-2xl font-bold text-white">
                {card.title}
              </h2>

              <p className="mt-3 text-slate-400">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}