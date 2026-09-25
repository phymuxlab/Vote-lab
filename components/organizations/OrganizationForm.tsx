"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { ArrowLeft, Building2, Globe2, Mail, Palette } from "lucide-react";
import { createOrganization } from "@/app/actions/organization/create";
import ImageUpload from "@/components/ui/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending} className="h-12 rounded-xl bg-cyan-400 px-5 font-semibold text-slate-950 hover:bg-cyan-300">{pending ? "Creating…" : "Create organisation"}</Button>;
}

export default function OrganizationForm() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/dashboard/organizations" className="mb-5 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to organisations</Link>
      <form action={createOrganization} className="overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.035] shadow-2xl shadow-black/20">
        <div className="border-b border-white/8 p-6 sm:p-8 lg:p-10">
          <div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Building2 className="h-6 w-6" /></div><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Organisation setup</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Create your organisation</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">Give your voting community a clear identity. The logo will be cropped to a crisp square format and used across your election experience.</p></div></div>
        </div>

        <div className="space-y-9 p-6 sm:p-8 lg:p-10">
          <section className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <div><h2 className="font-semibold text-white">Brand identity</h2><p className="mt-1 text-sm leading-6 text-slate-500">Use a simple, recognisable mark that voters can identify quickly.</p><div className="mt-5"><ImageUpload label="Organisation logo" name="logo" /></div></div>
            <div className="grid gap-5 sm:grid-cols-2 content-start">
              <div className="space-y-2 sm:col-span-2"><Label htmlFor="name" className="text-white">Organisation name</Label><Input id="name" name="name" required maxLength={120} placeholder="Student Union Government" /></div>
              <div className="space-y-2 sm:col-span-2"><Label htmlFor="motto" className="text-white">Motto <span className="text-slate-600">(optional)</span></Label><Input id="motto" name="motto" maxLength={160} placeholder="Leadership, service and excellence" /></div>
              <div className="space-y-2 sm:col-span-2"><Label htmlFor="description" className="text-white">Description <span className="text-slate-600">(optional)</span></Label><Textarea id="description" name="description" rows={5} maxLength={1000} placeholder="Tell voters what this organisation represents…" /></div>
            </div>
          </section>

          <section className="border-t border-white/8 pt-8">
            <div className="mb-5"><h2 className="font-semibold text-white">Contact and appearance</h2><p className="mt-1 text-sm text-slate-500">These details help organisers and voters understand who is running the election.</p></div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="website" className="flex items-center gap-2 text-white"><Globe2 className="h-4 w-4 text-slate-500" /> Website</Label><Input id="website" name="website" type="url" placeholder="https://example.com" /></div>
              <div className="space-y-2"><Label htmlFor="contact_email" className="flex items-center gap-2 text-white"><Mail className="h-4 w-4 text-slate-500" /> Contact email</Label><Input id="contact_email" name="contact_email" type="email" placeholder="hello@example.com" /></div>
              <div className="space-y-2 md:max-w-xs"><Label htmlFor="theme_color" className="flex items-center gap-2 text-white"><Palette className="h-4 w-4 text-slate-500" /> Accent colour</Label><Input id="theme_color" name="theme_color" type="color" defaultValue="#39E6C0" className="h-12 w-full cursor-pointer rounded-xl border-white/10 bg-slate-950 p-1" /></div>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-7 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-5 text-slate-600">You can update these details later from organisation settings.</p><SubmitButton /></div>
        </div>
      </form>
    </div>
  );
}
