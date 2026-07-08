import Link from "next/link";
import { Plus } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { getOrganizations } from "@/lib/services/organization.service";

import OrganizationCard from "@/components/organizations/OrganizationCard";
import EmptyOrganizations from "@/components/organizations/EmptyOrganizations";

import { Button } from "@/components/ui/button";

export default async function OrganizationsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const organizations = await getOrganizations(user.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Organizations
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your organizations.
          </p>
        </div>

        <Link href="/dashboard/organizations/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Organization
          </Button>
        </Link>
      </div>

      {organizations.length === 0 ? (
        <EmptyOrganizations />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {organizations.map((organization) => (
            <OrganizationCard
              key={organization.id}
              organization={organization}
            />
          ))}
        </div>
      )}
    </div>
  );
}