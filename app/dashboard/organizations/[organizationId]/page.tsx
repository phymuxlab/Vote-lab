import Link from "next/link";
import Image from "next/image";

import {
  Vote,
  Trophy,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

import LiveActivity from "@/components/organizations/LiveActivity";
import { getRecentActivity } from "@/lib/activity";
import RecentElections from "@/components/organizations/RecentElections";
import { getRecentElections } from "@/lib/recent-elections";
import OrganizationStats from "@/components/organizations/OrganizationStats";
import { getOrganizationStats } from "@/lib/organization-dashboard";
import { getOrganization } from "@/lib/organizations";

interface PageProps {
  params: Promise<{
    organizationId: string;
  }>;
}

export default async function OrganizationPage({
  params,
}: PageProps) {
  const { organizationId } = await params;

  const organization = await getOrganization(
    organizationId
  );

  if (!organization) {
    return null;
  }

  const activity =
  await getRecentActivity(organizationId);

  const recentElections =
  await getRecentElections(organizationId);

  const stats = await getOrganizationStats(
  organizationId
);

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

      {/* Organization Hero */}

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">

        {/* Banner */}

        <div className="relative h-64 w-full bg-slate-800">

          {organization.banner_url ? (
           <img
           src={organization.banner_url}
            alt={organization.name}
            className="h-full w-full object-cover"
          />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background: `linear-gradient(135deg, ${
                  organization.theme_color ||
                  "#06B6D4"
                }, #0f172a)`,
              }}
            />
          )}

        </div>

        <div className="relative px-8 pb-8">

          {/* Logo */}

          <div className="-mt-16 mb-6">

            {organization.logo_url ? (
              <Image
                src={organization.logo_url}
                alt={organization.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-slate-900 bg-slate-900 object-cover shadow-xl"
              />
            ) : (
              <div
                className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-4 border-slate-900 text-5xl font-bold text-white shadow-xl"
                style={{
                  backgroundColor:
                    organization.theme_color ||
                    "#06B6D4",
                }}
              >
                {organization.name
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

          </div>

          <h1 className="text-4xl font-bold text-white">
            {organization.name}
          </h1>

          {organization.motto && (
            <p className="mt-2 text-lg italic text-cyan-400">
              {organization.motto}
            </p>
          )}

          <p className="mt-5 max-w-3xl text-slate-400">
            {organization.description ||
              "No description has been added yet."}
          </p>

          <div className="mt-6 flex flex-wrap gap-6">

            {organization.website && (
              <a
                href={organization.website}
                target="_blank"
                className="font-medium text-cyan-400 hover:underline"
              >
                🌐 {organization.website}
              </a>
            )}

            {organization.contact_email && (
              <span className="text-slate-300">
                ✉ {organization.contact_email}
              </span>
            )}

          </div>

        </div>

      </div>

      <OrganizationStats stats={stats} />

     {/* Dashboard Section */}

<div className="grid gap-8 xl:grid-cols-3">

  {/* LEFT SIDE */}

  <div className="xl:col-span-2">

    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <p className="mt-2 text-slate-400">
        Manage every part of your organization from one place.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Link
            key={card.title}
            href={card.href}
            className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:border-cyan-500 hover:bg-slate-800 hover:shadow-xl"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
              <Icon
                className="text-cyan-400 transition group-hover:scale-110"
                size={28}
              />
            </div>

            <h2 className="text-xl font-bold text-white">
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

  {/* RIGHT SIDE */}

  <div className="space-y-8">

    <RecentElections
      organizationId={organizationId}
      elections={recentElections}
    />

    <LiveActivity
      activity={activity}
    />

  </div>

</div>

    </div>
  );
}