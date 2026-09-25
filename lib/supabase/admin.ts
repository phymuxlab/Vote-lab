import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getAdminEnv } from "@/lib/env";

export function createAdminClient() {
  const { url, key } = getAdminEnv();

  return createSupabaseClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
