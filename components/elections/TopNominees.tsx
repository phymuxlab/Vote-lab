import Image from "next/image";
import { Trophy } from "lucide-react";

interface Nominee {
  id: string;
  name: string;
  image_url: string | null;
  votes: number;
}

interface Props {
  nominees: Nominee[];
}

export default function TopNominees({
  nominees,
}: Props) {
  const sorted = [...nominees]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/20">
          <Trophy className="text-yellow-400" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Top Nominees
          </h2>

          <p className="text-sm text-slate-400">
            Current leaders
          </p>
        </div>

      </div>

      <div className="space-y-4">

        {sorted.length === 0 ? (
          <p className="text-slate-400">
            No nominees yet.
          </p>
        ) : (
          sorted.map((nominee, index) => (
            <div
              key={nominee.id}
              className="flex items-center justify-between rounded-2xl bg-slate-800 p-4"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
                  {index + 1}
                </div>

                {nominee.image_url ? (
                  <Image
                    src={nominee.image_url}
                    alt={nominee.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 font-bold text-white">
                    {nominee.name.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-white">
                    {nominee.name}
                  </h3>

                  <p className="text-sm text-slate-400">
                    Rank #{index + 1}
                  </p>
                </div>

              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-cyan-400">
                  {nominee.votes}
                </p>

                <p className="text-xs text-slate-400">
                  votes
                </p>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}