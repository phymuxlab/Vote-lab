interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({
  password,
}: PasswordStrengthProps) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const labels = [
    "",
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
  ];

  const widths = [
    "0%",
    "20%",
    "40%",
    "60%",
    "80%",
    "100%",
  ];

  const colors = [
    "",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-cyan-500",
    "bg-green-500",
  ];

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
        <div
          className={`h-full transition-all duration-300 ${colors[strength]}`}
          style={{ width: widths[strength] }}
        />
      </div>

      <p className="text-sm text-slate-400">
        Password Strength:{" "}
        <span className="font-medium text-white">
          {labels[strength]}
        </span>
      </p>
    </div>
  );
}