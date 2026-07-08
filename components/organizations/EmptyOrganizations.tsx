import Link from "next/link";
import { Building2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function EmptyOrganizations() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 py-20 text-center">
      <Building2 className="mb-6 h-16 w-16 text-slate-500" />

      <h2 className="text-2xl font-semibold text-white">
        No organizations yet
      </h2>

      <p className="mt-3 max-w-md text-slate-400">
        Create your first organization to start managing
        elections, awards and voting events.
      </p>

      <Link
        href="/dashboard/organizations/create"
        className="mt-8"
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Organization
        </Button>
      </Link>
    </div>
  );
}