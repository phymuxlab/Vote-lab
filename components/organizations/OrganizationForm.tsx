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
      className="w-full rounded-xl bg-cyan-500 font-semibold text-black hover:bg-cyan-400"
    >
      {pending
        ? "Creating Organization..."
        : "Create Organization"}
    </Button>
  );
}

export default function OrganizationForm() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
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
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-white"
          >
            Organization Name
          </Label>

          <Input
            id="name"
            name="name"
            placeholder="Battleground League"
            required
            className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-white"
          >
            Description
          </Label>

          <Input
            id="description"
            name="description"
            placeholder="Official eFootball community"
            className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}