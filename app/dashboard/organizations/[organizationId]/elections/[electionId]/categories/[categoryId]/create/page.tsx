import NomineeForm from "@/components/nominees/NomineeForm";

interface PageProps {
  params: Promise<{
    organizationId: string;
    electionId: string;
    categoryId: string;
  }>;
}

export default async function CreateNomineePage({
  params,
}: PageProps) {
  const {
    organizationId,
    electionId,
    categoryId,
  } = await params;

  return (
    <NomineeForm
      organizationId={organizationId}
      electionId={electionId}
      categoryId={categoryId}
    />
  );
}