import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";

import { getCategory } from "@/lib/categories";
import { getNominees } from "@/lib/nominees";

interface PageProps {
  params: Promise<{
    electionId: string;
    categoryId: string;
  }>;
}

export default async function PublicCategoryPage({
  params,
}: PageProps) {
  const { categoryId } = await params;

  const category = await getCategory(categoryId);

  if (!category) {
    notFound();
  }

  const nominees = await getNominees(categoryId);

  return (
    <div className="mx-auto max-w-6xl space-y-10">

      {/* Header */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

        <h1 className="text-4xl font-bold text-white">
          {category.name}
        </h1>

        <p className="mt-3 text-slate-400">
          {category.description}
        </p>

        <div className="mt-6 inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
          Select up to {category.max_votes} nominee
          {category.max_votes > 1 ? "s" : ""}
        </div>

      </div>

      {/* Nominees */}

      {nominees.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 py-24 text-center">

          <h2 className="text-2xl font-bold text-white">
            No nominees available
          </h2>

        </div>

      ) : (

        <form className="space-y-8">

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {nominees.map((nominee) => (

              <label
                key={nominee.id}
                className="cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500 hover:bg-slate-800"
              >

                <input
                  type={
                    category.max_votes > 1
                      ? "checkbox"
                      : "radio"
                  }
                  name="nominee"
                  value={nominee.id}
                  className="mb-5 h-5 w-5 accent-cyan-500"
                />

                {nominee.image_url ? (

                  <Image
                    src={nominee.image_url}
                    alt={nominee.full_name}
                    width={120}
                    height={120}
                    className="mx-auto rounded-full object-cover"
                  />

                ) : (

                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-slate-800 text-5xl">

                    👤

                  </div>

                )}

                <h2 className="mt-6 text-center text-2xl font-bold text-white">
                  {nominee.full_name}
                </h2>

                <p className="mt-3 text-center text-slate-400">
                  {nominee.biography}
                </p>

              </label>

            ))}

          </div>

          <div className="flex justify-center">

            <Button
              type="submit"
              className="rounded-xl bg-cyan-500 px-12 py-7 text-lg text-black hover:bg-cyan-400"
            >
              Submit Vote
            </Button>

          </div>

        </form>

      )}

    </div>
  );
}