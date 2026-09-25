import { createHmac } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

function hashKey(key: string) {
  const secret = process.env.VOTELAB_SESSION_SECRET ?? process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Voting session secret is not configured.");
  return createHmac("sha256", secret).update(key).digest("hex");
}

export async function enforceRateLimit(key: string, maxRequests: number, windowSeconds: number) {
  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("consume_rate_limit", { p_key: hashKey(key), p_limit: maxRequests, p_window_seconds: windowSeconds });
  if (error) throw new Error("Rate limiter unavailable.");
  if (data !== true) throw new Error("Too many requests. Please wait and try again.");
}
