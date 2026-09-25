import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/8 bg-[#050b14]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Image src="/votelab-logo.svg" alt="Vote Lab" width={170} height={43} />
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Digital election workflows for campuses, organisations, clubs and events.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Platform</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/vote" className="transition hover:text-white">Published elections</Link></li>
              <li><Link href="/#features" className="transition hover:text-white">Features</Link></li>
              <li><Link href="/#faq" className="transition hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link href="/privacy" className="transition hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="transition hover:text-white">Terms</Link></li>
              <li><Link href="/cookies" className="transition hover:text-white">Cookies</Link></li>
              <li><Link href="/refunds" className="transition hover:text-white">Refunds</Link></li>
              <li><Link href="/accessibility" className="transition hover:text-white">Accessibility</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white">Developer</h3>
            <p className="mt-4 text-sm font-semibold text-cyan-300">{siteConfig.developer}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Product and engineering details should be verified before production launch.</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/8 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {siteConfig.productName}. All rights reserved.</span>
          <span>Business details are configured through environment variables.</span>
        </div>
      </div>
    </footer>
  );
}
