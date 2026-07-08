"use client";

import { useFormStatus } from "react-dom";

import { createOrganization } from "@/app/actions/organization/create";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full"
    >
      {pending
        ? "Creating Organization..."
        : "Create Organization"}
    </Button>
  );
}

export default function OrganizationForm() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-3xl font-bold text-white">
        Create Organization
      </h1>

      <p className="mt-2 text-slate-400">
        Create an organization to manage elections,
        awards and voting.
      </p>

      <form
        action={createOrganization}
        className="mt-8 space-y-6"
      >
        <div>
          <Label htmlFor="name">
            Organization Name
          </Label>

          <Input
            id="name"
            name="name"
            placeholder="Battleground League"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">
            Description
          </Label>

          <Input
            id="description"
            name="description"
            placeholder="Official eFootball community"
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}