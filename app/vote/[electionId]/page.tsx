import { redirect } from "next/navigation";
interface PageProps { params: Promise<{ electionId: string }> }
export default async function LegacyVotePage({ params }: PageProps) { const { electionId } = await params; redirect(`/elections/${electionId}`); }
