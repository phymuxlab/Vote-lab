import { createClient } from "@/lib/supabase/server";

export async function getVoteTimeline(
  electionId: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("votes")
    .select("created_at")
    .eq("election_id", electionId)
    .order("created_at");

 if (error) {
  console.log("TIMELINE ERROR:", error);
  throw error;
}

  const timeline: Record<string, number> = {};

  data.forEach((vote) => {
    const hour = new Date(
      vote.created_at
    ).toLocaleTimeString([], {
      hour: "numeric",
    });

    timeline[hour] =
      (timeline[hour] ?? 0) + 1;
  });

  return Object.entries(timeline).map(
    ([time, votes]) => ({
      time,
      votes,
    })
  );
}