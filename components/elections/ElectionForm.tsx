"use client";

import { useFormStatus } from "react-dom";
import { Globe2, ShieldCheck } from "lucide-react";
import { createElectionAction } from "@/app/actions/election/create";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ElectionFormProps { organizationId: string; }

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="h-12 w-full rounded-xl bg-cyan-500 font-semibold text-slate-950 hover:bg-cyan-400">
      {pending ? "Creating Election…" : "Create Election"}
    </Button>
  );
}

export default function ElectionForm({ organizationId }: ElectionFormProps) {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl sm:p-8">
      <div className="mb-8">
        <p className="text-sm font-medium text-cyan-400">Election setup</p>
        <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">Create Election</h1>
        <p className="mt-2 text-slate-400">Choose how voters will access this election, then configure the schedule.</p>
      </div>

      <form action={createElectionAction} className="space-y-7">
        <input type="hidden" name="organization_id" value={organizationId} readOnly />

        <div className="space-y-2">
          <Label htmlFor="title" className="text-white">Election title</Label>
          <Input id="title" name="title" maxLength={120} placeholder="Student Union Election 2026" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">Description</Label>
          <textarea id="description" name="description" maxLength={1000} rows={4} placeholder="Briefly explain what this election is for." className="flex w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none ring-offset-background placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-cyan-500" />
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-medium text-white">Voting system</legend>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="group cursor-pointer rounded-2xl border border-slate-700 bg-slate-950/60 p-5 transition has-[:checked]:border-cyan-400 has-[:checked]:bg-cyan-500/10">
              <input className="sr-only" type="radio" name="voting_mode" value="public" defaultChecked />
              <div className="flex items-start gap-4">
                <span className="rounded-xl bg-cyan-500/15 p-3 text-cyan-400"><Globe2 aria-hidden="true" /></span>
                <span><span className="block font-semibold text-white">Public Voting</span><span className="mt-1 block text-sm leading-6 text-slate-400">Voters open the ballot directly and submit their selections.</span></span>
              </div>
            </label>
            <label className="group cursor-pointer rounded-2xl border border-slate-700 bg-slate-950/60 p-5 transition has-[:checked]:border-violet-400 has-[:checked]:bg-violet-500/10">
              <input className="sr-only" type="radio" name="voting_mode" value="secure_registration" />
              <div className="flex items-start gap-4">
                <span className="rounded-xl bg-violet-500/15 p-3 text-violet-300"><ShieldCheck aria-hidden="true" /></span>
                <span><span className="block font-semibold text-white">Secure Voting</span><span className="mt-1 block text-sm leading-6 text-slate-400">Voters register, receive a one-time token, verify it and then vote.</span></span>
              </div>
            </label>
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="start_date" className="text-white">Start date</Label><Input id="start_date" type="datetime-local" name="start_date" required /></div>
          <div className="space-y-2"><Label htmlFor="end_date" className="text-white">End date</Label><Input id="end_date" type="datetime-local" name="end_date" required /></div>
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
