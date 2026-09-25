import { redirect } from "next/navigation";
interface PageProps { params: Promise<{ electionId: string; categoryId: string }> }
export default async function LegacyCategoryVotePage({ params }: PageProps) { const { electionId } = await params; redirect(`/elections/${electionId}/vote`); }
