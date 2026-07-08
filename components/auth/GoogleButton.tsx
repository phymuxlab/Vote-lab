"use client";

import { createClient } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";

export default function GoogleButton() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-800 text-white transition hover:bg-slate-700"
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
}