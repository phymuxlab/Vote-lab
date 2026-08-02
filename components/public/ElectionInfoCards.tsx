import {
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

interface ElectionInfoCardsProps {
  startDate: string;
  endDate: string;
  votingMode: string;
}

export default function ElectionInfoCards({
  startDate,
  endDate,
  votingMode,
}: ElectionInfoCardsProps) {
  const cardClass =
    "rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur p-6 transition hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10";

  return (
    <div className="grid gap-6 md:grid-cols-3">

      <div className={cardClass}>
        <CalendarDays className="mb-4 h-10 w-10 text-cyan-400" />

        <p className="text-sm uppercase tracking-widest text-slate-400">
          Voting Starts
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          {new Date(startDate).toLocaleDateString()}
        </h3>

        <p className="mt-1 text-slate-400">
          {new Date(startDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className={cardClass}>
        <CalendarDays className="mb-4 h-10 w-10 text-red-400" />

        <p className="text-sm uppercase tracking-widest text-slate-400">
          Voting Ends
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          {new Date(endDate).toLocaleDateString()}
        </h3>

        <p className="mt-1 text-slate-400">
          {new Date(endDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className={cardClass}>
        <ShieldCheck className="mb-4 h-10 w-10 text-green-400" />

        <p className="text-sm uppercase tracking-widest text-slate-400">
          Voting Method
        </p>

        <h3 className="mt-2 text-xl font-bold text-white">
          {votingMode === "secure_registration"
            ? "Verified Registration"
            : "Public Voting"}
        </h3>

        <p className="mt-1 text-slate-400">
          One vote per voter
        </p>
      </div>

    </div>
  );
}