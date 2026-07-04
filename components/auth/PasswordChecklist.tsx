import { Check, X } from "lucide-react";

interface PasswordChecklistProps {
  password: string;
}

export default function PasswordChecklist({
  password,
}: PasswordChecklistProps) {
  const checks = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <p className="text-sm font-medium text-white">
        Password Requirements
      </p>

      {checks.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 text-sm"
        >
          {item.valid ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <X className="h-4 w-4 text-slate-500" />
          )}

          <span
            className={
              item.valid ? "text-green-400" : "text-slate-400"
            }
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}