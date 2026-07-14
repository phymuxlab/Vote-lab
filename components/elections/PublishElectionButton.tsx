"use client";

import { useTransition } from "react";
import { publishElection } from "@/app/actions/election/publish";

import { Button } from "@/components/ui/button";

interface Props {
  electionId: string;
}

export default function PublishElectionButton({
  electionId,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  return (
    <Button
      onClick={() =>
        startTransition(() =>
          publishElection(electionId)
        )
      }
      disabled={pending}
      className="bg-green-500 text-black hover:bg-green-400"
    >
      {pending
        ? "Publishing..."
        : "Publish Election"}
    </Button>
  );
}