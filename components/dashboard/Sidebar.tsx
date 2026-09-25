"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  LayoutDashboard,
  UserRound,
  Vote,
} from "lucide-react";
import LogoutButton from "./LogoutButton";

const links = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Organisations", href: "/dashboard/organizations", icon: Building2 },
  { name: "Published elections", href: "/vote", icon: Vote },
  { name: "Profile", href: "/dashboard/profile", icon: UserRound },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-[272px] flex-col border-r border-white/8 bg-[#07111f]/95 px-4 py-5 shadow-2xl shadow-black/20 backdrop-blur-xl md:flex">
      <Link href="/dashboard" className="mb-7 flex items-center rounded-2xl px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
        <Image src="/votelab-logo.svg" alt="Vote Lab" width={166} height={42} priority />
      </Link>

      <div className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Workspace
      </div>

      <nav className="flex-1 space-y-1.5" aria-label="Dashboard navigation">
        {links.map(({ name, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-medium transition ${
                active
                  ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/15"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
            >
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-slate-950/10" : "bg-white/[0.04] group-hover:bg-white/[0.07]"}`}>
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              {name}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-white">Organiser workspace</p>
            <p className="mt-0.5 truncate text-[11px] text-slate-500">Manage every ballot in one place</p>
          </div>
        </div>
        <div className="mt-4 border-t border-white/8 pt-3">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
