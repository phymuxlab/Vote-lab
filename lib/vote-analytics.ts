import { createAdminClient } from "@/lib/supabase/admin";
import { requireElectionOwner } from "@/lib/auth/authorization";

export async function getVoteTimeline(electionId: string) {
  await requireElectionOwner(electionId);
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("votes")
    .select("created_at")
    .eq("election_id", electionId)
    .order("created_at");
  if (error) throw error;

  const timeline: Record<string, number> = {};
  for (const vote of data ?? []) {
    const hour = new Date(vote.created_at).toLocaleTimeString([], { hour: "numeric" });
    timeline[hour] = (timeline[hour] ?? 0) + 1;
  }

  return Object.entries(timeline).map(([time, votes]) => ({ time, votes }));
}
