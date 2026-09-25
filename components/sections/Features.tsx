import { Gauge, GraduationCap, ShieldCheck } from "lucide-react";

const features = [
  { title: "Secure voting", description: "Support controlled voter registration, one-time tokens and server-side vote validation.", icon: ShieldCheck },
  { title: "Fast insights", description: "Keep organisers close to participation, election activity and results from one workspace.", icon: Gauge },
  { title: "Built for communities", description: "Designed for campuses, departments, clubs, associations and events with responsive voting flows.", icon: GraduationCap },
];

export default function Features() { return <section id="features" className="mx-auto max-w-7xl px-6 py-24"><div className="mb-14 text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Built for organisers</p><h2 className="mt-3 text-4xl font-bold">Everything around the ballot.</h2><p className="mx-auto mt-4 max-w-2xl text-slate-400">A focused toolkit for setting up elections, managing participation and keeping the voter experience clear.</p></div><div className="grid gap-5 md:grid-cols-3">{features.map(({ title, description, icon: Icon }) => <div key={title} className="rounded-3xl border border-white/8 bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05]"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300"><Icon className="h-6 w-6" /></div><h3 className="mt-6 text-xl font-semibold text-white">{title}</h3><p className="mt-3 leading-7 text-slate-500">{description}</p></div>)}</div></section>; }
