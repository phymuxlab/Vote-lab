import Image from "next/image";

import { getCategory } from "@/lib/categories";
import { getCategoryResults } from "@/lib/votes";
import RealtimeResults from "@/components/voting/RealtimeResults";

interface PageProps {
  params: Promise<{
    organizationId: string;
    electionId: string;
    categoryId: string;
  }>;
}

export default async function ResultsPage({
  params,
}: PageProps) {
  const { categoryId } = await params;

  const category = await getCategory(categoryId);

  const nominees = await getCategoryResults(categoryId);

  const totalVotes = nominees.reduce(
    (sum, nominee) => sum + nominee.voteCount,
    0
  );

  const sortedNominees = [...nominees].sort(
    (a, b) => b.voteCount - a.voteCount
  );

  const isTie =
    sortedNominees.length > 1 &&
    sortedNominees[0].voteCount ===
      sortedNominees[1].voteCount;

  return (
    <div className="space-y-10">
      <RealtimeResults categoryId={categoryId} />
      <div>
        <h1 className="text-4xl font-bold text-white">
          {category.name} Results
        </h1>

        <p className="mt-2 text-slate-400">
          Live election results
        </p>

        <p className="mt-4 text-lg font-semibold text-cyan-400">
          Total Votes: {totalVotes}
        </p>
      </div>

      <div className="space-y-6">
        {sortedNominees.map((nominee, index) => {
          const percent =
            totalVotes === 0
              ? 0
              : (
                  (nominee.voteCount /
                    totalVotes) *
                  100
                ).toFixed(1);

          return (
            <div
              key={nominee.id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500"
            >
              <div className="flex items-center gap-5">
                {nominee.image_url ? (
                  <Image
                    src={nominee.image_url}
                    alt={nominee.full_name}
                    width={70}
                    height={70}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-slate-800 text-3xl">
                    👤
                  </div>
                )}

                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    {index === 0 && (
                      <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                        {isTie ? "🤝 Tie" : "🏆 Winner"}
                      </span>
                    )}

                    {index === 1 && (
                      <span className="rounded-full bg-slate-300 px-3 py-1 text-xs font-bold text-black">
                        🥈 2nd
                      </span>
                    )}

                    {index === 2 && (
                      <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                        🥉 3rd
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-white">
                    {nominee.full_name}
                  </h2>

                  <p className="mt-1 text-slate-400">
                    {nominee.biography}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-bold text-cyan-400">
                    {nominee.voteCount}
                  </p>

                  <p className="text-sm text-slate-400">
                    Votes
                  </p>
                </div>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-500 transition-all duration-700"
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex justify-between text-sm">
                <span className="text-slate-500">
                  Vote Share
                </span>

                <span className="font-semibold text-cyan-400">
                  {percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}