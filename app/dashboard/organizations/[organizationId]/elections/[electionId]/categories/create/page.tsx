import CategoryForm from "@/components/categories/CategoryForm";

interface PageProps {
  params: Promise<{
    organizationId: string;
    electionId: string;
  }>;
}

export default async function CreateCategoryPage({
  params,
}: PageProps) {
  const {
    organizationId,
    electionId,
  } = await params;

  return (
    <CategoryForm
      organizationId={organizationId}
      electionId={electionId}
    />
  );
}