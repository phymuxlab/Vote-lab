import { createClient } from "@/lib/supabase/server";
import TopbarClient from "./TopbarClient";

export default async function Topbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return <TopbarClient email={user?.email ?? null} />;
}
