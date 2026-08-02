"use client";

import { useState } from "react";

import VotingMethod from "./VotingMethod";
import RegistrationRequirements from "./RegistrationRequirements";
import UniqueIdentifier from "./UniqueIdentifier";
import SaveSettingsButton from "./SaveSettingsButton";

export default function ElectionSettingsForm() {
  const [mode, setMode] = useState("public");

  return (
    <form className="space-y-8">

      <VotingMethod
        value={mode}
        onChange={setMode}
      />

      {mode === "secure_registration" && (
        <>
          <RegistrationRequirements />

          <UniqueIdentifier />
        </>
      )}

      <SaveSettingsButton />

    </form>
  );
}