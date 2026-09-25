import { getPublicElectionById } from "@/lib/elections";
import { getPublicRegistrationSettings } from "@/lib/election-settings";
import VoterRegistrationForm from "@/components/public/VoterRegistrationForm";

interface PageProps { params: Promise<{ electionId: string }>; }

export default async function RegisterPage({ params }: PageProps) {
  const { electionId } = await params;
  const [election, settings] = await Promise.all([getPublicElectionById(electionId), getPublicRegistrationSettings(electionId)]);

  if (!election || !settings || settings.voting_mode !== "secure_registration") {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6"><div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center"><h1 className="text-2xl font-bold text-white">Registration Unavailable</h1><p className="mt-3 text-slate-400">This election is not using secure voter registration.</p></div></div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 sm:px-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-10">
        <div className="mb-8"><p className="text-sm font-medium text-cyan-400">Secure voter registration</p><h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{election.title}</h1><p className="mt-3 text-slate-400">Register to receive your one-time voting token.</p></div>
        <VoterRegistrationForm electionId={electionId} uniqueIdentifier={settings.unique_identifier} requireName={settings.require_name} requireEmail={settings.require_email} requirePhone={settings.require_phone} requireStudentId={settings.require_student_id} requireEmployeeId={settings.require_employee_id} requireNationalId={settings.require_national_id} />
      </div>
    </div>
  );
}
