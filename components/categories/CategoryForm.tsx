"use client";

import { useFormStatus } from "react-dom";

import { createCategoryAction } from "@/app/actions/category/create";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CategoryFormProps {
  organizationId: string;
  electionId: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 w-full rounded-xl bg-cyan-500 font-semibold text-black hover:bg-cyan-400"
    >
      {pending
        ? "Creating Category..."
        : "Create Category"}
    </Button>
  );
}

export default function CategoryForm({
  organizationId,
  electionId,
}: CategoryFormProps) {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-white">
        Create Category
      </h1>

      <p className="mt-2 text-slate-400">
        Categories represent positions or award sections within this election.
      </p>

      <form
        action={createCategoryAction}
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

        <div className="space-y-2">
          <Label className="text-white">
            Category Name
          </Label>

          <Input
            name="name"
            placeholder="President"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">
            Description
          </Label>

          <Input
            name="description"
            placeholder="Position for Student Union President"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">
            Maximum Votes
          </Label>

          <Input
            type="number"
            name="max_votes"
            min={1}
            defaultValue={1}
            required
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}