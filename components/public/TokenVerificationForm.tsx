"use client";

import { useActionState } from "react";

import { verifyTokenAction } from "@/app/actions/verify-token";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  electionId: string;
}

interface ActionState {
  success: boolean;
  message?: string;
}

export default function TokenVerificationForm({
  electionId,
}: Props) {
  const initialState: ActionState = {
    success: false,
  };

  const [state, formAction, pending] =
    useActionState(
      verifyTokenAction.bind(null, electionId),
      initialState
    );

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      <Input
        name="token"
        placeholder="Enter Token"
        className="h-12 text-center text-lg tracking-[0.3em]"
      />

      {state.message && (
        <p className="text-center text-sm text-red-400">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full bg-cyan-500 text-black hover:bg-cyan-400"
      >
        {pending
          ? "Verifying..."
          : "Verify Token"}
      </Button>
    </form>
  );
}