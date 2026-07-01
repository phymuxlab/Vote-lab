import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 font-bold text-slate-950">
            V
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Vote <span className="text-cyan-400">Lab</span>
            </h1>
            <p className="text-xs text-slate-400">by MUXLAB</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="#features">Features</Link>
          <Link href="#faq">FAQ</Link>

          <Button variant="ghost">Login</Button>
          <Button>Get Started</Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <div className="mt-10 flex flex-col gap-6">
                <Link href="/">Home</Link>
                <Link href="#features">Features</Link>
                <Link href="#faq">FAQ</Link>

                <Button variant="ghost">Login</Button>
                <Button>Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}