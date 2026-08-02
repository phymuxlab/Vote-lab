"use client";

interface VotingMethodProps {
  value: string;
  onChange: (value: string) => void;
}

export default function VotingMethod({
  value,
  onChange,
}: VotingMethodProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold text-white">
        Voting Method
      </h2>

      <p className="mt-2 text-slate-400">
        Configure how voters will access this election.
      </p>

      <div className="mt-8 space-y-4">

        <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-700 p-5 transition hover:border-cyan-500">

          <input
            type="radio"
            name="voting_mode"
            value="public"
            checked={value === "public"}
            onChange={() => onChange("public")}
            className="mt-1"
          />

          <div>

            <h3 className="font-semibold text-white">
              Public Voting
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Anyone with the election link can vote.
            </p>

          </div>

        </label>

        <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-slate-700 p-5 transition hover:border-cyan-500">

          <input
            type="radio"
            name="voting_mode"
            value="secure_registration"
            checked={value === "secure_registration"}
            onChange={() =>
              onChange("secure_registration")
            }
            className="mt-1"
          />

          <div>

            <h3 className="font-semibold text-white">
              Secure Registration
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Voters must register before receiving a one-time voting token.
            </p>

          </div>

        </label>

      </div>

    </div>
  );
}