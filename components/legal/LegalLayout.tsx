import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function LegalLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return <main id="main-content" className="min-h-screen bg-slate-950 px-4 py-24 text-slate-200 sm:px-6"><div className="mx-auto max-w-3xl"><Link href="/" className="text-sm text-cyan-400 hover:underline">← Back to Vote Lab</Link><h1 className="mt-8 text-4xl font-bold text-white">{title}</h1><p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p><div className="mt-10 space-y-8 leading-7 text-slate-300">{children}</div><div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400"><strong className="text-white">Business contact:</strong> {siteConfig.legalName} · {siteConfig.contactEmail} · {siteConfig.contactAddress}</div></div></main>;
}
