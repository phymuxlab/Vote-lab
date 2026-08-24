"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { registerVoterAction } from "@/app/actions/vote/register";

interface RegisterVoterFormProps {
  electionId: string;
  requireName: boolean;
  requireEmail: boolean;
  requirePhone: boolean;
  requireStudentId: boolean;
  requireEmployeeId: boolean;
  requireNationalId: boolean;
}

interface RegisterVoterState {
  success: boolean;
  message?: string;
}

const initialState: RegisterVoterState = {
  success: false,
};

function RegisterButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending
        ? "Registering..."
        : "Register & Continue"}
    </button>
  );
}

export default function RegisterVoterForm({
  electionId,
  requireName,
  requireEmail,
  requirePhone,
  requireStudentId,
  requireEmployeeId,
  requireNationalId,
}: RegisterVoterFormProps) {
  const [state, formAction] =
    useActionState(
      registerVoterAction,
      initialState
    );

  return (
    <form
      action={formAction}
      className="space-y-6"
    >
      <input
        type="hidden"
        name="election_id"
        value={electionId}
      />

      {requireName && (
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Full Name
          </label>

          <input
            name="full_name"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {requireEmail && (
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {requirePhone && (
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Phone Number
          </label>

          <input
            name="phone"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {requireStudentId && (
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Student ID
          </label>

          <input
            name="student_id"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {requireEmployeeId && (
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Employee ID
          </label>

          <input
            name="employee_id"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {requireNationalId && (
        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            National ID
          </label>

          <input
            name="national_id"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {state.message && (
        <div
          className={`rounded-xl border p-4 text-sm ${
            state.success
              ? "border-green-500/30 bg-green-500/10 text-green-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {state.message}
        </div>
      )}

      <RegisterButton />
    </form>
  );
}