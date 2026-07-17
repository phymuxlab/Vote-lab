import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <p className="mt-2 text-slate-400">
        Frequently used actions.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <Link href="/dashboard/organizations">
          <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
            Create Organization
          </Button>
        </Link>

        <Link href="/dashboard/organizations">
          <Button variant="outline">
            Manage Elections
          </Button>
        </Link>

        <Link href="/dashboard/profile">
          <Button variant="outline">
            Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}