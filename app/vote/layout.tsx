import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

export default function VoteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050b14] text-white">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#07111f]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/vote" className="flex items-center" aria-label="Vote Lab voting home">
            <Image src="/votelab-logo.svg" alt="Vote Lab" width={154} height={39} priority className="h-9 w-auto" />
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-400 transition hover:text-white">About Vote Lab</Link>
        </div>
      </header>
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
}
