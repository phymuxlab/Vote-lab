import Link from "next/link";

import { Button } from "@/components/ui/button";

import { getCategory } from "@/lib/categories";
import { getNominees } from "@/lib/nominees";

interface PageProps {
  params: Promise<{
    organizationId: string;
    electionId: string;
    categoryId: string;
  }>;
}

export default async function CategoryPage({
  params,
}: PageProps) {
  const {
    organizationId,
    electionId,
    categoryId,
  } = await params;

  const category =
    await getCategory(categoryId);

  const nominees =
    await getNominees(categoryId);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            {category.name}
          </h1>

          <p className="mt-2 text-slate-400">
            {category.description}
          </p>
        </div>

        <Link
          href={`/dashboard/organizations/${organizationId}/elections/${electionId}/categories/${categoryId}/create`}
        >
          <Button className="bg-cyan-500 text-black hover:bg-cyan-400">
            + Add Nominee
          </Button>
        </Link>
      </div>

      {nominees.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
          <h2 className="text-2xl font-bold text-white">
            No Nominees Yet
          </h2>

          <p className="mt-3 text-slate-400">
            Add the first nominee for this category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {nominees.map((nominee) => (
            <div
              key={nominee.id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 text-3xl text-cyan-400">
                👤
              </div>

              <h2 className="text-2xl font-bold text-white">
                {nominee.full_name}
              </h2>

              <p className="mt-2 text-slate-400">
                {nominee.biography}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}