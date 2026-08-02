"use client";

import { useFormStatus } from "react-dom";

import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SaveSettingsButton() {
  const { pending } = useFormStatus();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Save Configuration
          </h2>

          <p className="mt-2 text-slate-400">
            These settings apply only to this election.
          </p>

        </div>

        <Button
          type="submit"
          disabled={pending}
          className="bg-cyan-500 text-black hover:bg-cyan-400"
        >
          <Save className="mr-2 h-4 w-4" />

          {pending
            ? "Saving..."
            : "Save Changes"}
        </Button>

      </div>

    </div>
  );
}