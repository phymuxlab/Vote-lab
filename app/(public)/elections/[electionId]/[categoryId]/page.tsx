import Image from "next/image";

import { getCategory } from "@/lib/categories";
import { getNominees } from "@/lib/nominees";
import VoteButton from "@/components/voting/VoteButton";

interface PageProps {
  params: Promise<{
    electionId: string;
    categoryId: string;
  }>;
}

export default async function CategoryVotingPage({
  params,
}: PageProps) {
  const {
    electionId,
    categoryId,
  } = await params;

  const category =
    await getCategory(categoryId);

  const nominees =
    await getNominees(categoryId);

  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-14">
        <h1 className="text-5xl font-bold">
          {category.name}
        </h1>

        <p className="mt-4 text-slate-500">
          {category.description}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {nominees.map((nominee) => (
          <div
            key={nominee.id}
            className="rounded-3xl border bg-white p-8 shadow-sm transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            {nominee.image_url ? (
              <Image
                src={nominee.image_url}
                alt={nominee.full_name}
                width={140}
                height={140}
                sizes="140px"
                className="mx-auto rounded-full object-cover"
              />
            ) : (
              <div className="mx-auto flex h-[140px] w-[140px] items-center justify-center rounded-full bg-slate-800 text-5xl">
                👤
              </div>
            )}

            <h2 className="mt-6 text-center text-2xl font-bold">
              {nominee.full_name}
            </h2>

            <p className="mt-3 text-center text-slate-500">
              {nominee.biography}
            </p>

            <div className="mt-8">
              <VoteButton
                electionId={electionId}
                categoryId={categoryId}
                nomineeId={nominee.id}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}