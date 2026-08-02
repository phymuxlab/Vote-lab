import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

interface Nominee {
  id: string;
  full_name: string;
  biography?: string | null;
  image_url?: string | null;
}

interface NomineeCardProps {
  nominee: Nominee;
  selected: boolean;
  onSelect: () => void;
}

export default function NomineeCard({
  nominee,
  selected,
  onSelect,
}: NomineeCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition-all duration-300 ${
        selected
          ? "border-cyan-400 bg-cyan-500/10 shadow-xl shadow-cyan-500/20"
          : "border-slate-800 bg-slate-900 hover:-translate-y-1 hover:border-cyan-500"
      }`}
    >
      {selected && (
        <CheckCircle2 className="absolute right-5 top-5 h-7 w-7 text-cyan-400" />
      )}

      <div className="flex gap-6">

        <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-slate-800">

          {nominee.image_url ? (
            <Image
              src={nominee.image_url}
              alt={nominee.full_name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl font-bold text-slate-500">
              {nominee.full_name.charAt(0)}
            </div>
          )}

        </div>

        <div className="flex-1">

          <h3 className="text-2xl font-bold text-white">
            {nominee.full_name}
          </h3>

          <p className="mt-3 line-clamp-4 text-slate-400">
            {nominee.biography ??
              "No biography has been provided."}
          </p>

        </div>

      </div>

    </button>
  );
}