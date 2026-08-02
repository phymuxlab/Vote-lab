import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ElectionCTAProps {
  electionId: string;
  votingMode: string;
}

export default function ElectionCTA({
  electionId,
  votingMode,
}: ElectionCTAProps) {
  const href =
    votingMode === "secure_registration"
      ? `/elections/${electionId}/register`
      : `/elections/${electionId}/vote`;

  return (
    <section className="py-10 text-center">

      <p className="mt-4 text-red-400">
        Voting Mode: {votingMode}
      </p>

      <Button
        asChild
        size="lg"
        className="h-14 rounded-2xl bg-cyan-500 px-10 text-lg font-semibold text-black hover:bg-cyan-400"
      >
        <Link href={href}>
          Start Voting
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>

      <p className="mt-5 text-sm text-slate-500">
        By continuing, you agree to participate in this
        election according to the organizer's rules.
      </p>

    </section>
  );
}