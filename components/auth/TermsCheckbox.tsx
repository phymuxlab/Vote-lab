"use client";

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function TermsCheckbox({
  checked,
  onCheckedChange,
}: TermsCheckboxProps) {
  return (
    <div className="flex items-start space-x-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(!!value)}
        className="mt-1"
      />

      <p className="text-sm leading-6 text-slate-400">
        I agree to the{" "}
        <Link
          href="/terms"
          className="font-medium text-cyan-400 hover:underline"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-medium text-cyan-400 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}