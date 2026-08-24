import ElectionSettingsForm from "@/components/elections/settings/ElectionSettingsForm";
import { getElectionSettings } from "@/lib/election-settings";

interface PageProps {
  params: Promise<{
    organizationId: string;
    electionId: string;
  }>;
}

export default async function ElectionSettingsPage({
  params,
}: PageProps) {
  const { organizationId, electionId } =
    await params;
  
  const settings = await getElectionSettings(electionId);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">
        Election Settings
      </h1>

      <ElectionSettingsForm
        organizationId={organizationId}
        electionId={electionId}
        settings={settings}
      />
    </div>
  );
}