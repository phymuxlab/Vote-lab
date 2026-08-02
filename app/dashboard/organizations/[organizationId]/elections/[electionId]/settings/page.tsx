import ElectionSettingsForm from "@/components/elections/settings/ElectionSettingsForm";

export default function ElectionSettingsPage() {
  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-white">
        Election Settings
      </h1>

      <ElectionSettingsForm />

    </div>
  );
}