"use client";

import { useFormStatus } from "react-dom";
import { createElectionAction } from "@/app/actions/election/create";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ElectionFormProps {
  organizationId: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-xl bg-cyan-500 font-semibold text-black hover:bg-cyan-400"
    >
      {pending ? "Creating Election..." : "Create Election"}
    </Button>
  );
}

export default function ElectionForm({
  organizationId,
}: ElectionFormProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-white">
        Create Election
      </h1>

      <p className="mt-2 text-slate-400">
        Create a new election for your organization.
      </p>

      <form
        action={createElectionAction}
        className="mt-8 space-y-6"
      >
        {/* Organization ID from URL */}
        <Input
          type="hidden"
          name="organization_id"
          value={organizationId}
          readOnly
        />

        <div className="space-y-2">
          <Label className="text-white">
            Election Title
          </Label>

          <Input
            name="title"
            placeholder="President Election 2026"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">
            Description
          </Label>

          <Input
            name="description"
            placeholder="Annual Student Union Election"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">
            Start Date
          </Label>

          <Input
            type="datetime-local"
            name="start_date"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">
            End Date
          </Label>

          <Input
            type="datetime-local"
            name="end_date"
            required
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}