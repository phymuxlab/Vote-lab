export default function AuthDivider() {
  return (
    <div className="my-6 flex items-center">
      <div className="h-px flex-1 bg-slate-700" />

      <span className="px-4 text-sm uppercase tracking-wider text-slate-400">
        OR
      </span>

      <div className="h-px flex-1 bg-slate-700" />
    </div>
  );
}