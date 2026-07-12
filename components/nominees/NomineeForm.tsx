"use client";

import { useFormStatus } from "react-dom";

import { createNomineeAction } from "@/app/actions/nominee/create";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NomineeFormProps {
  organizationId: string;
  electionId: string;
  categoryId: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-xl bg-cyan-500 font-semibold text-black hover:bg-cyan-400"
    >
      {pending ? "Adding Nominee..." : "Add Nominee"}
    </Button>
  );
}

export default function NomineeForm({
  organizationId,
  electionId,
  categoryId,
}: NomineeFormProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-white">
        Add Nominee
      </h1>

      <p className="mt-2 text-slate-400">
        Add a contestant to this category.
      </p>

      <form
        action={createNomineeAction}
        className="mt-8 space-y-6"
      >
        <Input
          type="hidden"
          name="organization_id"
          value={organizationId}
          readOnly
        />

        <Input
          type="hidden"
          name="election_id"
          value={electionId}
          readOnly
        />

        <Input
          type="hidden"
          name="category_id"
          value={categoryId}
          readOnly
        />

        <div className="space-y-2">
          <Label className="text-white">
            Full Name
          </Label>

          <Input
            name="full_name"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">
            Biography
          </Label>

          <Input
            name="biography"
            placeholder="Computer Science Student"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">
            Image URL
          </Label>

          <Input
            name="image_url"
            placeholder="https://..."
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}