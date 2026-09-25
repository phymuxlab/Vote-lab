import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"><nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"><Link href="/" className="flex items-center" aria-label="Vote Lab home"><Image src="/votelab-logo.svg" alt="Vote Lab" width={154} height={39} priority className="h-9 w-auto" /></Link><div className="hidden items-center gap-7 md:flex"><Link href="/" className="text-sm text-slate-300 hover:text-white">Home</Link><Link href="/#features" className="text-sm text-slate-300 hover:text-white">Features</Link><Link href="/#faq" className="text-sm text-slate-300 hover:text-white">FAQ</Link><Link href="/login"><Button variant="ghost">Login</Button></Link><Link href="/register"><Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">Get started</Button></Link></div><div className="md:hidden"><Sheet><SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open navigation menu"><Menu className="h-5 w-5" /></Button></SheetTrigger><SheetContent side="right"><div className="mt-10 flex flex-col gap-5"><Link href="/">Home</Link><Link href="/#features">Features</Link><Link href="/#faq">FAQ</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/login"><Button variant="outline" className="w-full">Login</Button></Link><Link href="/register"><Button className="w-full bg-cyan-500 text-slate-950">Get started</Button></Link></div></SheetContent></Sheet></div></nav></header>;
}
