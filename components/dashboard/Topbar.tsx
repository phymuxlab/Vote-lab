import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Topbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Dashboard
        </h2>

        <p className="text-sm text-slate-400">
          Welcome back, {user?.email}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="rounded-full border border-cyan-500 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
          {user?.email?.charAt(0).toUpperCase()}
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}