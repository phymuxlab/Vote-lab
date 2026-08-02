import type { ReactNode } from "react";
import Link from "next/link";

export default function VoteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/vote"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500 font-bold text-black">
              V
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Vote Lab
              </h1>

              <p className="text-xs text-slate-400">
                Secure Digital Voting
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        © 2026 Vote Lab • Developed by MUXLAB
      </footer>
    </div>
  );
}