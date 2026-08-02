import Link from "next/link";
import { Search, CalendarDays, Vote } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { getPublicElections } from "@/lib/public-elections";

export default async function VoteHomePage() {
  const elections = await getPublicElections();

  return (
    <div className="space-y-12">

      {/* Hero */}

      <section className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-10">

        <div className="max-w-3xl">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
            <Vote size={16} />
            Secure Digital Voting
          </div>

          <h1 className="text-5xl font-bold leading-tight text-white">
            Cast your vote with confidence.
          </h1>

          <p className="mt-6 text-lg text-slate-400">
            Welcome to Vote Lab. Participate in transparent,
            secure and real-time digital elections from anywhere.
          </p>

        </div>

      </section>

      {/* Search */}

      <div className="relative max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <Input
          placeholder="Search elections..."
          className="pl-11 bg-slate-900 border-slate-800"
        />

      </div>

      {/* Title */}

      <div>

        <h2 className="text-3xl font-bold text-white">
          Available Elections
        </h2>

        <p className="mt-2 text-slate-400">
          Select an election below to begin voting.
        </p>

      </div>

      {/* Cards */}

      {elections.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 py-24 text-center">

          <Vote
            size={56}
            className="mx-auto mb-6 text-slate-600"
          />

          <h3 className="text-2xl font-bold text-white">
            No Published Elections
          </h3>

          <p className="mt-3 text-slate-400">
            There are currently no elections open for voting.
          </p>

        </div>

      ) : (

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {elections.map((election) => (

            <div
              key={election.id}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-7 transition duration-300 hover:border-cyan-500 hover:bg-slate-800 hover:shadow-xl"
            >

              <div className="mb-5 flex items-center justify-between">

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
                  Voting Open
                </span>

              </div>

              <h3 className="text-2xl font-bold text-white">
                {election.title}
              </h3>

              <p className="mt-3 line-clamp-3 text-slate-400">
                {election.description}
              </p>

              <div className="mt-6 space-y-2 text-sm text-slate-400">

                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  Starts:{" "}
                  {new Date(
                    election.start_date
                  ).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  Ends:{" "}
                  {new Date(
                    election.end_date
                  ).toLocaleDateString()}
                </div>

              </div>

              <Link
                href={`/vote/${election.id}`}
                className="mt-8 block"
              >
                <Button className="w-full bg-cyan-500 text-black hover:bg-cyan-400">
                  Vote Now
                </Button>
              </Link>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}