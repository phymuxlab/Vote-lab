import ElectionForm from "@/components/elections/ElectionForm";

interface PageProps {
  params: Promise<{
    organizationId: string;
  }>;
}

export default async function CreateElectionPage({
  params,
}: PageProps) {
  const { organizationId } = await params;

  return (
    <ElectionForm
      organizationId={organizationId}
    />
  );
}