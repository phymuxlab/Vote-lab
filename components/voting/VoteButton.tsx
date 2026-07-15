"use client";

import { useFormStatus } from "react-dom";

import { castVoteAction } from "@/app/actions/vote/create";

import { Button } from "@/components/ui/button";

interface Props {
  electionId: string;
  categoryId: string;
  nomineeId: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-cyan-500 text-black hover:bg-cyan-400"
    >
      {pending ? "Voting..." : "Vote"}
    </Button>
  );
}

export default function VoteButton({
  electionId,
  categoryId,
  nomineeId,
}: Props) {
  return (
    <form action={castVoteAction}>
      <input
        type="hidden"
        name="election_id"
        value={electionId}
      />

      <input
        type="hidden"
        name="category_id"
        value={categoryId}
      />

      <input
        type="hidden"
        name="nominee_id"
        value={nomineeId}
      />

      <SubmitButton />
    </form>
  );
}