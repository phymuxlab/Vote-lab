import { getElection } from "@/lib/elections";
import { getElectionSettings } from "@/lib/election-settings";

import VoterRegistrationForm from "@/components/public/VoterRegistrationForm";

interface PageProps {
  params: Promise<{
    electionId: string;
  }>;
}

export default async function RegisterPage({
  params,
}: PageProps) {
  const { electionId } =
    await params;

  const election =
    await getElection(electionId);

  const settings =
    await getElectionSettings(
      electionId
    );

  if (!settings) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-900 p-10 text-center">
          <h1 className="text-2xl font-bold text-white">
            Registration Unavailable
          </h1>

          <p className="mt-3 text-slate-400">
            Election settings have not
            been configured.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            {election.title}
          </h1>

          <p className="mt-3 text-slate-400">
            Register to receive your
            one-time voting token.
          </p>
        </div>

        {/* Registration form */}

        <VoterRegistrationForm
          electionId={electionId}
          uniqueIdentifier={
            settings.unique_identifier
          }
          requireName={
            settings.require_name
          }
          requireEmail={
            settings.require_email
          }
          requirePhone={
            settings.require_phone
          }
          requireStudentId={
            settings.require_student_id
          }
          requireEmployeeId={
            settings.require_employee_id
          }
          requireNationalId={
            settings.require_national_id
          }
        />
      </div>
    </div>
  );
}