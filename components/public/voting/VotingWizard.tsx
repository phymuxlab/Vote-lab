"use client";

import { useState } from "react";

import VotingProgress from "./VotingProgress";
import CategoryStep from "./CategoryStep";
import ReviewBallot from "./ReviewBallot";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { submitVote } from "@/app/actions/submit-vote";

interface Nominee {
  id: string;
  full_name: string;
  biography?: string | null;
  image_url?: string | null;
}

interface Category {
  id: string;
  name: string;
  description?: string | null;
  max_votes: number;
  nominees: Nominee[];
}

interface VotingWizardProps {
  electionId: string;
  voterId?: string | null;
  tokenId?: string | null;
  categories: Category[];
}

export default function VotingWizard({
  electionId,
  voterId,
  tokenId,
  categories,
}: VotingWizardProps) {
  const [currentStep, setCurrentStep] =
    useState(0);

  const [reviewMode, setReviewMode] =
    useState(false);

const [error, setError] =
  useState("");

const [isPending, startTransition] =
  useTransition();

  const [votes, setVotes] = useState<
    Record<string, string>
  >({});

  const router = useRouter();

   

  const category = categories[currentStep];

  function handleSelect(
    categoryId: string,
    nomineeId: string
  ) {
    setVotes((prev) => ({
      ...prev,
      [categoryId]: nomineeId,
    }));
  }

  function next() {
    if (currentStep === categories.length - 1) {
      setReviewMode(true);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  }

  function previous() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  async function handleSubmitVote() {
  setError("");

  startTransition(async () => {
    const payload = Object.entries(votes).map(
      ([categoryId, nomineeId]) => ({
        categoryId,
        nomineeId,
      })
    );

    const result = await submitVote({
  electionId,
  votes: payload,
});

    if (!result.success) {
      setError(result.message);
      return;
    }

    router.push(
      `/elections/${electionId}/success`
    );
  });
}

  if (reviewMode) {
    return (
      <div className="mx-auto max-w-5xl">
{error && (
  <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
    {error}
  </div>
)}
        <ReviewBallot
            categories={categories}
  votes={votes}
  onBack={() => setReviewMode(false)}
  onSubmit={handleSubmitVote}
  isSubmitting={isPending}
/>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10">

      <VotingProgress
        current={currentStep + 1}
        total={categories.length}
      />

      <CategoryStep
        category={category}
        selectedNominee={
          votes[category.id]
        }
        onSelect={handleSelect}
      />

      <div className="flex justify-between">

        <button
          onClick={previous}
          disabled={currentStep === 0}
          className="rounded-xl bg-slate-800 px-6 py-3 text-white disabled:opacity-40"
        >
          Previous
        </button>

        <button
          onClick={next}
          disabled={!votes[category.id]}
          className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-black disabled:opacity-40"
        >
          {currentStep ===
          categories.length - 1
            ? "Review Ballot"
            : "Next"}
        </button>

      </div>

    </div>
  );
}