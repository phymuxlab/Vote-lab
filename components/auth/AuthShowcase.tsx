import Image from "next/image";
import {
  ShieldCheck,
  BarChart3,
  Trophy,
  Building2,
} from "lucide-react";

export default function AuthShowcase() {
  return (
    <div className="hidden lg:flex h-full bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 p-12 text-white">
      <div className="max-w-md">
        <Image
          src="/images/votelab-logo.png"
          alt="Vote Lab"
          width={180}
          height={60}
          priority
        />

        <h1 className="mt-10 text-5xl font-bold leading-tight">
          Modern Online
          <br />
          Voting Platform
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-300">
          Conduct secure elections, award voting, student polls,
          and campus competitions from one powerful platform.
        </p>

        {/* Features */}
        <div className="mt-10 space-y-6">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-6 w-6 text-cyan-400" />
            <span>Secure & Transparent Voting</span>
          </div>

          <div className="flex items-center gap-4">
            <BarChart3 className="h-6 w-6 text-cyan-400" />
            <span>Live Results & Analytics</span>
          </div>

          <div className="flex items-center gap-4">
            <Trophy className="h-6 w-6 text-cyan-400" />
            <span>Awards & Contest Management</span>
          </div>

          <div className="flex items-center gap-4">
            <Building2 className="h-6 w-6 text-cyan-400" />
            <span>Built for Schools & Organizations</span>
          </div>
        </div>
      </div>
    </div>
  );
}