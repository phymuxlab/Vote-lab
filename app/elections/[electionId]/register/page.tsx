import { getElection } from "@/lib/elections";
import { getElectionSettings } from "@/lib/election-settings";

interface PageProps {
  params: Promise<{
    electionId: string;
  }>;
}

export default async function RegisterPage({
  params,
}: PageProps) {
  const { electionId } = await params;

  const election =
    await getElection(electionId);

  const settings =
    await getElectionSettings(electionId);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">

      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white">
            {election.title}
          </h1>

          <p className="mt-3 text-slate-400">
            Register to receive your one-time voting token.
          </p>

        </div>

        <form className="space-y-6">

          {settings.require_name && (
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Full Name
              </label>

              <input
                name="full_name"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
              />
            </div>
          )}

          {settings.require_email && (
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
              />
            </div>
          )}

          {settings.require_phone && (
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Phone Number
              </label>

              <input
                name="phone"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
              />
            </div>
          )}

          {settings.require_student_id && (
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Student ID
              </label>

              <input
                name="student_id"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
              />
            </div>
          )}

          {settings.require_employee_id && (
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Employee ID
              </label>

              <input
                name="employee_id"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
              />
            </div>
          )}

          {settings.require_national_id && (
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                National ID
              </label>

              <input
                name="national_id"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
              />
            </div>
          )}

          <button
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400"
          >
            Register & Continue
          </button>

        </form>

      </div>

    </div>
  );
}