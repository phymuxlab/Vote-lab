"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, Copy, Loader2, ShieldCheck, X } from "lucide-react";
import { registerVoterAction, type RegisterVoterState } from "@/app/actions/vote/register";
import { checkIdentifierAction } from "@/app/actions/vote/check-identifier";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props { electionId: string; uniqueIdentifier: string; requireName?: boolean | null; requireEmail?: boolean | null; requirePhone?: boolean | null; requireStudentId?: boolean | null; requireEmployeeId?: boolean | null; requireNationalId?: boolean | null; }

export default function VoterRegistrationForm({ electionId, uniqueIdentifier, requireName = true, requireEmail = true, requirePhone = false, requireStudentId = false, requireEmployeeId = false, requireNationalId = false }: Props) {
  const [state, action, pending] = useActionState<RegisterVoterState, FormData>(registerVoterAction, { success: false });
  const [identifier, setIdentifier] = useState("");
  const [identifierAvailable, setIdentifierAvailable] = useState(false);
  const [checking, setChecking] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  async function check(value: string) {
    const trimmed = value.trim();
    setIdentifierAvailable(false);
    if (!trimmed) return;
    setChecking(true);
    try {
      const result = await checkIdentifierAction(electionId, uniqueIdentifier, trimmed);
      setIdentifierAvailable(result.available);
    } finally {
      setChecking(false);
    }
  }

  async function copyToken() { if (!state.token) return; await navigator.clipboard.writeText(state.token); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }

  return <div>
    <form action={action} className="space-y-5">
      <input type="hidden" name="election_id" value={electionId} />
      {requireName && <Field id="full_name" name="full_name" label="Full name" placeholder="Enter your full name" required />}
      {requirePhone && <Field id="phone" name="phone" label="Phone number" placeholder="Enter your phone number" type="tel" required />}
      {requireEmail && uniqueIdentifier !== "email" && <Field id="email" name="email" label="Email address" placeholder="name@example.com" type="email" required />}
      {requireStudentId && uniqueIdentifier !== "student_id" && <Field id="student_id" name="student_id" label="Student ID" placeholder="Enter your student ID" required />}
      {requireEmployeeId && uniqueIdentifier !== "employee_id" && <Field id="employee_id" name="employee_id" label="Employee ID" placeholder="Enter your employee ID" required />}
      {requireNationalId && uniqueIdentifier !== "national_id" && <Field id="national_id" name="national_id" label="National ID" placeholder="Enter your national ID" required />}

      <div className="space-y-2">
        <label htmlFor="identifier" className="text-sm font-medium text-slate-300">{uniqueIdentifier.replaceAll("_", " ")}</label>
        <Input id="identifier" name={uniqueIdentifier} value={identifier} onChange={(e) => { setIdentifier(e.target.value); setIdentifierAvailable(false); }} onBlur={() => check(identifier)} required autoComplete="off" className="h-12" />
        <p className="text-xs text-slate-500">This identifier is used to prevent duplicate registration for this election.</p>
        {checking && <p className="text-sm text-cyan-400">Checking availability…</p>}
        {!checking && identifierAvailable && <p className="flex items-center gap-2 text-sm text-emerald-400"><CheckCircle2 className="h-4 w-4" />Identifier available.</p>}
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
        <input type="checkbox" name="privacy_acknowledged" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 h-4 w-4 accent-cyan-500" />
        <span className="text-sm leading-6 text-slate-400">I have read the <a href="/privacy" target="_blank" rel="noreferrer" className="text-cyan-400 underline">privacy notice</a> and understand why my registration information is being collected for this election.</span>
      </label>

      {state.message && <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{state.message}</div>}
      <Button type="submit" disabled={pending || checking || !identifierAvailable || !accepted} className="h-12 w-full bg-cyan-500 font-semibold text-slate-950 hover:bg-cyan-400">{pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Registering…</> : "Register & Continue"}</Button>
    </form>

    {state.success && state.token && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="token-title">
      <div className="w-full max-w-md rounded-3xl border border-emerald-500/30 bg-slate-900 p-7 shadow-2xl">
        <div className="flex justify-end"><button type="button" aria-label="Close" onClick={() => window.location.assign(`/elections/${electionId}/verify`)} className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white"><X className="h-5 w-5" /></button></div>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400"><ShieldCheck className="h-8 w-8" /></div>
        <h2 id="token-title" className="mt-5 text-center text-2xl font-bold text-white">Registration successful</h2>
        <p className="mt-2 text-center text-sm leading-6 text-slate-400">Save this one-time token. It is required to open your ballot.</p>
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-cyan-500/30 bg-slate-950 p-3"><code className="flex-1 text-center font-mono text-2xl font-bold tracking-[0.25em] text-cyan-300">{state.token}</code><Button type="button" size="sm" onClick={copyToken} aria-label="Copy voting token"><Copy className="h-4 w-4" />{copied ? "Copied" : "Copy"}</Button></div>
        <a href={`/elections/${electionId}/verify`} className="mt-6 block"><Button className="h-12 w-full bg-cyan-500 font-semibold text-slate-950 hover:bg-cyan-400">Continue to token verification</Button></a>
      </div>
    </div>}
  </div>;
}

function Field({ id, name, label, placeholder, type = "text", required = false }: { id: string; name: string; label: string; placeholder: string; type?: string; required?: boolean }) { return <div className="space-y-2"><label htmlFor={id} className="text-sm font-medium text-slate-300">{label}</label><Input id={id} name={name} type={type} placeholder={placeholder} required={required} maxLength={254} className="h-12" /></div>; }
