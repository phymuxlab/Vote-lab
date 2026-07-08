import { supabase } from "@/lib/supabase/client";

export default async function TestPage() {
  const { data } = await supabase.auth.getSession();

  return (
    <div className="p-10 text-white bg-slate-950 min-h-screen">
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}