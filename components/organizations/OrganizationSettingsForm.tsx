"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowLeft, Building2, Globe2, Mail, Palette, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";
import { updateOrganization, type UpdateOrganizationState } from "@/app/actions/organization/update";
import ImageUpload from "@/components/ui/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Organization {
  id: string;
  name: string;
  motto: string | null;
  description: string | null;
  website: string | null;
  contact_email: string | null;
  theme_color: string | null;
  logo_url: string | null;
}

interface Props { organization: Organization; }

const initialState: UpdateOrganizationState = { ok: false, message: "" };

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="h-11 rounded-xl bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60">
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}

export default function OrganizationSettingsForm({ organization }: Props) {
  const [state, formAction] = useActionState(updateOrganization, initialState);

  return (
    <div className="mx-auto max-w-5xl">
      <Link href={`/dashboard/organizations/${organization.id}`} className="mb-5 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to organisation
      </Link>

      <form action={formAction} className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.035] shadow-2xl shadow-black/20">
        <div className="border-b border-white/8 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Organisation settings</p>
              <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Identity and details</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Update the information voters see around your elections.</p>
            </div>
          </div>
        </div>

        <div className="space-y-9 p-6 sm:p-8">
          <input type="hidden" name="organizationId" value={organization.id} />

          {state.message && (
            <div className={`flex items-start gap-3 rounded-2xl border p-4 text-sm ${state.ok ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-200" : "border-red-400/20 bg-red-400/[0.06] text-red-200"}`} role={state.ok ? "status" : "alert"}>
              {state.ok ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />}
              <span>{state.message}</span>
            </div>
          )}

          <section className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <div>
              <h2 className="font-semibold text-white">Organisation logo</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">Square 512 × 512 crop. Upload a new image any time.</p>
              <div className="mt-5"><ImageUpload label="Organisation logo" name="logo" initialImage={organization.logo_url ?? undefined} /></div>
            </div>

            <div className="grid content-start gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name" className="text-white">Organisation name</Label>
                <Input id="name" name="name" required maxLength={120} defaultValue={organization.name} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="motto" className="text-white">Motto</Label>
                <Input id="motto" name="motto" maxLength={160} defaultValue={organization.motto ?? ""} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea id="description" name="description" rows={5} maxLength={1000} defaultValue={organization.description ?? ""} />
              </div>
            </div>
          </section>

          <section className="border-t border-white/8 pt-8">
            <div className="mb-5"><h2 className="font-semibold text-white">Contact and appearance</h2><p className="mt-1 text-sm text-slate-500">These details can be shown around your public election experience.</p></div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="website" className="flex items-center gap-2 text-white"><Globe2 className="h-4 w-4 text-slate-500" aria-hidden="true" /> Website</Label>
                <Input id="website" name="website" type="url" placeholder="https://example.com" defaultValue={organization.website ?? ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email" className="flex items-center gap-2 text-white"><Mail className="h-4 w-4 text-slate-500" aria-hidden="true" /> Contact email</Label>
                <Input id="contact_email" name="contact_email" type="email" placeholder="hello@example.com" defaultValue={organization.contact_email ?? ""} />
              </div>
              <div className="space-y-2 md:max-w-xs">
                <Label htmlFor="theme_color" className="flex items-center gap-2 text-white"><Palette className="h-4 w-4 text-slate-500" aria-hidden="true" /> Accent colour</Label>
                <Input id="theme_color" name="theme_color" type="color" defaultValue={organization.theme_color ?? "#22D3EE"} className="h-12 w-full cursor-pointer rounded-xl border-white/10 bg-slate-950 p-1" />
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-600">Banners are not currently shown in the voter experience, so this workspace keeps organisation branding focused on the logo.</p>
            <SaveButton />
          </div>
        </div>
      </form>

      <section className="mt-5 rounded-3xl border border-red-400/15 bg-red-400/[0.035] p-5 sm:p-6">
        <div className="flex gap-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-300" aria-hidden="true" />
          <div><h2 className="font-semibold text-red-200">Danger zone</h2><p className="mt-1 text-sm leading-6 text-red-200/60">Destructive organisation actions remain separate from normal profile updates.</p></div>
        </div>
      </section>
    </div>
  );
}
