"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return <motion.section initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto max-w-7xl px-6 pb-20 pt-32 sm:pt-40"><div className="mx-auto max-w-4xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300"><ShieldCheck className="h-4 w-4" /> Secure digital voting for modern communities</span><h1 className="mt-8 text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-7xl">Where every <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">voice counts.</span></h1><p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">Create public or secure elections, manage nominees and deliver a voting experience that feels trustworthy from the first click to the final result.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/vote" className="inline-flex h-12 items-center justify-center rounded-xl bg-cyan-400 px-6 font-semibold text-slate-950 transition hover:bg-cyan-300">Explore elections <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/register" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 font-semibold text-white hover:bg-white/[0.07]">Create organiser account</Link></div></div></motion.section>;
}
