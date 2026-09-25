import Link from "next/link";

interface Props {
  organizationId: string;
}

export default function OrganizationNav({ organizationId }: Props) {
  const links = [
    { label: "Overview", href: `/dashboard/organizations/${organizationId}` },
    { label: "Elections", href: `/dashboard/organizations/${organizationId}/elections` },
    { label: "Settings", href: `/dashboard/organizations/${organizationId}/settings` },
  ];

  return (
    <nav aria-label="Organisation navigation" className="flex gap-2 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 p-2">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
