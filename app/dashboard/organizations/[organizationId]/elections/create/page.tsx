import { notFound } from "next/navigation";
import ElectionForm from "@/components/elections/ElectionForm";
import { requireOrganizationOwner } from "@/lib/auth/authorization";

interface PageProps {
  params: Promise<{ organizationId: string }>;
}

export default async function CreateElectionPage({ params }: PageProps) {
  const { organizationId } = await params;

  try {
    await requireOrganizationOwner(organizationId);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl py-2">
      <ElectionForm organizationId={organizationId} />
    </main>
  );
}
