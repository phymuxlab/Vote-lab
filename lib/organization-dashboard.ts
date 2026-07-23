import { createClient } from "@/lib/supabase/server";

export async function getOrganizationStats(
  organizationId: string
) {
  const supabase = await createClient();

  const { count: elections } = await supabase
    .from("elections")
    .select("*", {
      head: true,
      count: "exact",
    })
    .eq("organization_id", organizationId);

  const electionIds =
    (
      await supabase
        .from("elections")
        .select("id")
        .eq("organization_id", organizationId)
    ).data ?? [];

  const ids = electionIds.map((e) => e.id);

  let categories = 0;
  let nominees = 0;
  let votes = 0;

  if (ids.length) {
    const categoryQuery =
      await supabase
        .from("election_categories")
        .select("id", {
          head: true,
          count: "exact",
        })
        .in("election_id", ids);

    categories = categoryQuery.count ?? 0;

    const categoryIds =
      (
        await supabase
          .from("election_categories")
          .select("id")
          .in("election_id", ids)
      ).data ?? [];

    const cIds = categoryIds.map((c) => c.id);

    if (cIds.length) {
      const nomineeQuery =
        await supabase
          .from("nominees")
          .select("*", {
            head: true,
            count: "exact",
          })
          .in("category_id", cIds);

      nominees = nomineeQuery.count ?? 0;

      const nomineeIds =
        (
          await supabase
            .from("nominees")
            .select("id")
            .in("category_id", cIds)
        ).data ?? [];

      const nIds = nomineeIds.map((n) => n.id);

      if (nIds.length) {
        const voteQuery =
          await supabase
            .from("votes")
            .select("*", {
              head: true,
              count: "exact",
            })
            .in("nominee_id", nIds);

        votes = voteQuery.count ?? 0;
      }
    }
  }

  return {
    elections: elections ?? 0,
    categories,
    nominees,
    votes,
  };
}