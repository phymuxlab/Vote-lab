import Link from "next/link";
import { ArrowUpRight, Building2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getOrganizations } from "@/lib/services/organization.service";
import OrganizationCard from "@/components/organizations/OrganizationCard";
import EmptyOrganizations from "@/components/organizations/EmptyOrganizations";
import { Button } from "@/components/ui/button";

export default async function OrganizationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const organizations = await getOrganizations(user.id);

  return (
    <div className="space-y-7">
      <section className="flex flex-col gap-5 rounded-[1.75rem] border border-white/8 bg-white/[0.035] p-6 sm:p-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300"><Building2 className="h-4 w-4" /> Workspace</div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Organisations</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Create and manage the communities that own your elections.</p>
        </div>
        <Link href="/dashboard/organizations/create">
          <Button className="h-11 rounded-xl bg-cyan-400 px-4 font-semibold text-slate-950 hover:bg-cyan-300"><Plus className="mr-2 h-4 w-4" /> Create organisation <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
        </Link>
      </section>

      {organizations.length === 0 ? <EmptyOrganizations /> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{organizations.map((organization) => <OrganizationCard key={organization.id} organization={organization} />)}</div>}
    </div>
  );
}
