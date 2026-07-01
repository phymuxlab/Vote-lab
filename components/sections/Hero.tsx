"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
<motion.section
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="max-w-7xl mx-auto px-6 pt-40 pb-20"
>
        <div className="text-center">

          <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
            🎓 Trusted Student Voting Platform
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold leading-tight">
            Where
            <span className="text-cyan-400"> Student Voices </span>
            Count.
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-slate-400 text-lg">
            Vote Lab is a secure online voting platform for universities,
            student awards, departmental elections, campus competitions,
            and every student event that deserves transparency.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <button className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold transition">
              Start Voting
            </button>

            <button className="border border-slate-700 hover:border-cyan-400 px-8 py-4 rounded-xl transition">
              Explore Events
            </button>

          </div>

        </div>
      </motion.section>
  );
}