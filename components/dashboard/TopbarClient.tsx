"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Building2, Vote, UserRound, ChevronRight } from "lucide-react";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

const links = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Organisations", href: "/dashboard/organizations", icon: Building2 },
  { name: "Published elections", href: "/vote", icon: Vote },
  { name: "Profile", href: "/dashboard/profile", icon: UserRound },
];

function getHeader(pathname: string) {
  if (pathname === "/dashboard") return ["Dashboard", "Your organiser workspace"];
  if (pathname === "/dashboard/profile") return ["Profile", "Manage your account details"];
  if (pathname === "/dashboard/organizations") return ["Organisations", "Manage your voting communities"];
  if (pathname.endsWith("/elections/create")) return ["Create election", "Set up the ballot and voting access"];
  if (pathname.includes("/elections/") && pathname.endsWith("/settings")) return ["Election settings", "Configure voting and registration"];
  if (pathname.includes("/elections/") && pathname.endsWith("/results")) return ["Results", "Review election performance"];
  if (pathname.includes("/elections/")) return ["Election", "Manage categories, nominees and results"];
  if (pathname.endsWith("/settings")) return ["Organisation settings", "Manage identity and preferences"];
  if (pathname.includes("/organizations/") && pathname.endsWith("/elections")) return ["Elections", "Manage elections for this organisation"];
  if (pathname.includes("/organizations/") && pathname.includes("/categories/")) return ["Category", "Manage nominees and results"];
  if (pathname.includes("/organizations/")) return ["Organisation", "Manage your organisation workspace"];
  return ["Vote Lab", "Organiser workspace"];
}

export default function TopbarClient({ email }: { email: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [title, subtitle] = getHeader(pathname);
  const initial = email?.trim().charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#07111f]/95 backdrop-blur-xl">
      <div className="flex min-h-[72px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] md:hidden"
            aria-label="Open dashboard navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/dashboard" className="flex shrink-0 items-center md:hidden" aria-label="Vote Lab dashboard home">
            <Image src="/votelab-logo.svg" alt="Vote Lab" width={128} height={34} priority className="h-8 w-auto" />
          </Link>

          <div className="hidden min-w-0 items-center gap-3 md:flex">
            <div className="h-9 w-px bg-white/10" aria-hidden="true" />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <span>Workspace</span>
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="truncate text-slate-400">{title}</span>
              </div>
              <h1 className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl">{title}</h1>
              <p className="hidden text-xs text-slate-500 sm:block">{subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden max-w-[220px] truncate rounded-full border border-white/8 bg-white/[0.035] px-3 py-2 text-xs text-slate-400 lg:block">
            {email ?? "Signed in"}
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-bold text-cyan-300" aria-label="Account">
            {initial}
          </div>
          <div className="hidden sm:block"><LogoutButton /></div>
        </div>
      </div>

      <div className="hidden border-t border-white/[0.06] px-4 pb-3 md:block lg:px-8">
        <div className="flex items-center gap-1.5 pt-2 text-xs text-slate-500">
          <span>Workspace</span>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-slate-400">{title}</span>
          <span className="hidden text-slate-600 sm:inline">·</span>
          <span className="hidden truncate text-slate-600 sm:inline">{subtitle}</span>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Dashboard navigation">
          <button className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label="Close navigation" />
          <aside className="relative flex h-full w-[min(86vw,320px)] flex-col border-r border-white/10 bg-[#07111f] px-4 py-5 shadow-[20px_0_60px_rgba(0,0,0,.45)]">
            <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.035] px-3 py-2">
              <Image src="/votelab-logo.svg" alt="Vote Lab" width={142} height={37} priority />
              <button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 text-slate-300" aria-label="Close dashboard navigation">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 space-y-1.5" aria-label="Mobile dashboard navigation">
              {links.map(({ name, href, icon: Icon }) => {
                const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
                return (
                  <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-2xl px-3.5 py-3.5 text-sm font-medium ${active ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/10" : "text-slate-300 hover:bg-white/5"}`}>
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-slate-950/10" : "bg-white/[0.04]"}`}>
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    {name}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto rounded-2xl border border-white/8 bg-white/[0.035] p-3"><LogoutButton /></div>
          </aside>
        </div>
      )}
    </header>
  );
}
