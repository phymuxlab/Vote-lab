import Link from "next/link";

interface Props {
  organizationId: string;
}

export default function OrganizationNav({
  organizationId,
}: Props) {
  const links = [
    {
      label: "Overview",
      href: `/dashboard/organizations/${organizationId}`,
    },
    {
      label: "Elections",
      href: `/dashboard/organizations/${organizationId}/elections`,
    },
    {
      label: "Categories",
      href: `/dashboard/organizations/${organizationId}/categories`,
    },
    {
      label: "Nominees",
      href: `/dashboard/organizations/${organizationId}/nominees`,
    },
    {
      label: "Results",
      href: `/dashboard/organizations/${organizationId}/results`,
    },
    {
      label: "Settings",
      href: `/dashboard/organizations/${organizationId}/settings`,
    },
  ];

  return (
    <nav className="flex gap-3 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 p-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}