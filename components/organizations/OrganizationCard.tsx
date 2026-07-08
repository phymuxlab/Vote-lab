import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

import type { Organization } from "@/types/organization";

interface Props {
  organization: Organization;
}

export default function OrganizationCard({
  organization,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500">
      <Building2 className="mb-5 h-10 w-10 text-cyan-400" />

      <h2 className="text-xl font-bold text-white">
        {organization.name}
      </h2>

      <p className="mt-2 line-clamp-2 text-sm text-slate-400">
        {organization.description ||
          "No description provided."}
      </p>

      <Link
        href={`/dashboard/organizations/${organization.id}`}
        className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:underline"
      >
        View Organization

        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}