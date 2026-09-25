import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ electionId: string }>;
}

export default async function SuccessPage({ params }: PageProps) {
  const { electionId } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-4 py-10 sm:px-6">
      <section className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl sm:p-12">
        <CheckCircle2 className="mx-auto h-20 w-20 text-emerald-400" aria-hidden="true" />
        <h1 className="mt-7 text-4xl font-bold text-white sm:text-5xl">Vote submitted</h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-400 sm:text-lg">
          Your ballot has been recorded. You cannot change a submitted ballot through this voting session.
        </p>
        <div className="mt-10">
          <Link href={`/elections/${electionId}`}>
            <Button size="lg" className="bg-cyan-500 px-8 text-slate-950 hover:bg-cyan-400">
              Back to election
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
