import { Crown } from "lucide-react";

export default function WinnerBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500/20 px-4 py-1 text-sm font-semibold text-yellow-300">

      <Crown className="h-4 w-4" />

      Winner

    </span>
  );
}