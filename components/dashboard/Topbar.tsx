import LogoutButton from "./LogoutButton";

export default function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <h2 className="text-2xl font-semibold text-white">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <div className="rounded-full bg-cyan-500 px-4 py-2 font-semibold text-black">
          Admin
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}