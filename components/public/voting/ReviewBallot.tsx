interface ReviewBallotProps {
  isSubmitting?: boolean;
  categories: {
    id: string;
    name: string;
    nominees: {
      id: string;
      full_name: string;
    }[];
  }[];

  votes: Record<string, string>;

  onSubmit: () => void;

  onBack: () => void;
}

export default function ReviewBallot({
  categories,
  votes,
  onSubmit,
  onBack,
  isSubmitting,
}: ReviewBallotProps) {
  return (
    <div className="space-y-8">

      <div className="text-center">

        <h1 className="text-4xl font-bold text-white">
          Review Your Ballot
        </h1>

        <p className="mt-3 text-slate-400">
          Please confirm your selections before submitting your vote.
        </p>

      </div>

      <div className="space-y-5">

        {categories.map((category) => {
          const selected = category.nominees.find(
            (nominee) =>
              nominee.id === votes[category.id]
          );

          return (
            <div
              key={category.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="text-xl font-semibold text-white">
                {category.name}
              </h3>

              <p className="mt-2 text-slate-400">
                {selected
                  ? selected.full_name
                  : "No candidate selected"}
              </p>

            </div>
          );
        })}

      </div>

      <div className="flex justify-between">

        <button
          onClick={onBack}
          className="rounded-xl bg-slate-800 px-6 py-3 text-white hover:bg-slate-700"
        >
          Back
        </button>

        <button
  onClick={onSubmit}
  disabled={isSubmitting}
  className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
>
  {isSubmitting
    ? "Submitting..."
    : "Submit Vote"}
</button>

      </div>

    </div>
  );
}