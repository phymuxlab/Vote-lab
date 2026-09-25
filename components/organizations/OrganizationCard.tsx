import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Settings2 } from "lucide-react";
import type { Organization } from "@/types/organization";

interface Props { organization: Organization; }

export default function OrganizationCard({ organization }: Props) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.035] shadow-xl shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.05]">
      <div className="relative h-24 overflow-hidden bg-gradient-to-br from-cyan-400/15 via-slate-900 to-indigo-500/15">
        <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
      <div className="relative px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="-mt-9 flex items-end justify-between gap-3">
          {organization.logo_url ? (
            <Image src={organization.logo_url} alt={`${organization.name} logo`} width={72} height={72} className="h-[72px] w-[72px] rounded-2xl border-4 border-[#0a1423] bg-slate-900 object-cover shadow-xl" />
          ) : (
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border-4 border-[#0a1423] bg-cyan-400 text-xl font-bold text-slate-950 shadow-xl" aria-hidden="true">
              {organization.name.charAt(0).toUpperCase()}
            </div>
          )}
          <Link href={`/dashboard/organizations/${organization.id}/settings`} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-950/70 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:text-white focus-visible:opacity-100" aria-label={`Settings for ${organization.name}`}>
            <Settings2 className="h-4 w-4" />
          </Link>
        </div>
        <h2 className="mt-5 text-xl font-semibold tracking-tight text-white">{organization.name}</h2>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">{organization.description || "No description provided."}</p>
        <Link href={`/dashboard/organizations/${organization.id}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          Open organisation <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
