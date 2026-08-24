import Link from "next/link";

import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { clearVotingSession } from "@/lib/voting-session";

interface PageProps {
  params: Promise<{
    electionId: string;
  }>;
}

export default async function SuccessPage({
  params,
}: PageProps) {
  const { electionId } = await params;

  // Clear voting session after a successful vote


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6">

      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">

        <CheckCircle2 className="mx-auto h-24 w-24 text-green-400" />

        <h1 className="mt-8 text-5xl font-bold text-white">
          Vote Submitted
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-lg text-slate-400">
          Thank you for participating in this election.
          Your vote has been securely recorded and cannot be changed.
        </p>

        <div className="mt-12">

          <Link href={`/elections/${electionId}`}>

            <Button
              size="lg"
              className="bg-cyan-500 px-10 text-black hover:bg-cyan-400"
            >
              Back to Election
            </Button>

          </Link>

        </div>

      </div>

    </div>
  );
}