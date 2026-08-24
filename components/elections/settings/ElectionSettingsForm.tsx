"use client";

import { useState } from "react";

import VotingMethod from "./VotingMethod";
import RegistrationRequirements from "./RegistrationRequirements";
import UniqueIdentifier from "./UniqueIdentifier";
import SaveSettingsButton from "./SaveSettingsButton";

import { updateElectionSettings } from "@/app/actions/election-settings/update";

interface ElectionSettingsFormProps {
  organizationId: string;
  electionId: string;
  settings: any;
}

export default function ElectionSettingsForm({
  organizationId,
  electionId,
}: ElectionSettingsFormProps) {
 const [mode, setMode] = useState(
  settings?.voting_mode ?? "public"
);

  return (
    <form
      action={updateElectionSettings}
      className="space-y-8"
    >
      <input
        type="hidden"
        name="organizationId"
        value={organizationId}
      />

      <input
        type="hidden"
        name="electionId"
        value={electionId}
      />

      <VotingMethod
        value={mode}
        onChange={setMode}
      />

      {mode ===
        "secure_registration" && (
        <>
          <RegistrationRequirements />

          <UniqueIdentifier />
        </>
      )}

      <SaveSettingsButton />
    </form>
  );
}