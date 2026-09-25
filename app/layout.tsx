import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/privacy/CookieBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { default: "Vote Lab — Campus Voting", template: "%s | Vote Lab" },
  description: siteConfig.description,
  applicationName: siteConfig.productName,
  referrer: "strict-origin-when-cross-origin",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-950 font-sans text-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-slate-950">
          Skip to content
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
