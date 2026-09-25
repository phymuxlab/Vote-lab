import OrganizationSettingsForm from "@/components/organizations/OrganizationSettingsForm";
import { getOrganization } from "@/lib/organizations";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ organizationId: string }>;
}

export default async function OrganizationSettingsPage({ params }: PageProps) {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId);

  if (!organization) notFound();

  return <OrganizationSettingsForm organization={organization} />;
}
