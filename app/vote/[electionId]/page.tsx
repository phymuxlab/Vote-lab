import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Users,
  ArrowRight,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { getElection } from "@/lib/elections";
import { getCategories } from "@/lib/categories";

interface PageProps {
  params: Promise<{
    electionId: string;
  }>;
}

export default async function PublicElectionPage({
  params,
}: PageProps) {
  const { electionId } = await params;

  const election = await getElection(electionId);

  if (!election || !election.is_published) {
    notFound();
  }

  const categories = await getCategories(electionId);

  return (
    <div className="space-y-10">

      {/* Hero */}

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

        <span className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400">
          Voting Open
        </span>

        <h1 className="mt-6 text-5xl font-bold text-white">
          {election.title}
        </h1>

        <p className="mt-5 max-w-4xl text-lg text-slate-400">
          {election.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-8 text-slate-400">

          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            Starts:
            {new Date(
              election.start_date
            ).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            Ends:
            {new Date(
              election.end_date
            ).toLocaleDateString()}
          </div>

        </div>

      </section>

      {/* Categories */}

      <section>

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-white">
            Categories
          </h2>

          <p className="mt-2 text-slate-400">
            Select a category to cast your vote.
          </p>

        </div>

        {categories.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 py-20 text-center">

            <Trophy
              size={54}
              className="mx-auto mb-5 text-slate-600"
            />

            <h3 className="text-2xl font-bold text-white">
              No Categories Available
            </h3>

          </div>

        ) : (

          <div className="grid gap-8 md:grid-cols-2">

            {categories.map((category) => (

              <div
                key={category.id}
                className="rounded-3xl border border-slate-800 bg-slate-900 p-8 transition hover:border-cyan-500 hover:bg-slate-800"
              >

                <div className="mb-5 flex items-center justify-between">

                  <Users className="text-cyan-400" />

                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
                    {category.max_votes} Vote
                    {category.max_votes > 1
                      ? "s"
                      : ""}
                  </span>

                </div>

                <h3 className="text-2xl font-bold text-white">
                  {category.name}
                </h3>

                <p className="mt-3 text-slate-400">
                  {category.description}
                </p>

                <Link
                  href={`/vote/${electionId}/category/${category.id}`}
                  className="mt-8 block"
                >
                  <Button className="w-full bg-cyan-500 text-black hover:bg-cyan-400">

                    Vote in this Category

                    <ArrowRight
                      size={18}
                      className="ml-2"
                    />

                  </Button>
                </Link>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}