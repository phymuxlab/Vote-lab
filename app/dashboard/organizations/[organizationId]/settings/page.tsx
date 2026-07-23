import { getOrganization } from "@/lib/organizations";

import OrganizationSettingsForm from "@/components/organizations/OrganizationSettingsForm";

interface PageProps {
  params: Promise<{
    organizationId: string;
  }>;
}

export default async function OrganizationSettingsPage({
  params,
}: PageProps) {
  const { organizationId } = await params;

  const organization =
    await getOrganization(organizationId);

  if (!organization) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Organization Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Update your organization's branding and information.
        </p>
      </div>

      <OrganizationSettingsForm
        organization={organization}
      />
    </div>
  );
}