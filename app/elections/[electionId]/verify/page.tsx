import TokenVerificationForm from "@/components/public/TokenVerificationForm";

interface PageProps {
  params: Promise<{
    electionId: string;
  }>;
}

export default async function VerifyTokenPage({
  params,
}: PageProps) {
  const { electionId } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-white">
            Verify Voting Token
          </h1>

          <p className="mt-4 text-slate-400">
            Enter your one-time voting token to continue.
          </p>

        </div>

        <div className="mt-10">
          <TokenVerificationForm
            electionId={electionId}
          />
        </div>

      </div>

    </div>
  );
}