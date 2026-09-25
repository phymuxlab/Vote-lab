import Image from "next/image";
import { BarChart3, Trophy, Building2, Workflow } from "lucide-react";

export default function AuthShowcase() {
  return <div className="hidden h-full bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 p-12 text-white lg:flex"><div className="max-w-md"><Image src="/votelab-logo.svg" alt="Vote Lab" width={240} height={60} priority /><h1 className="mt-10 text-5xl font-bold leading-tight">Campus voting, <br />without the clutter.</h1><p className="mt-6 text-lg leading-8 text-slate-300">Create elections, organise categories and nominees, and give voters a clear ballot experience.</p><div className="mt-10 space-y-6"><Feature icon={Workflow} text="Public and secure registration workflows" /><Feature icon={BarChart3} text="Election analytics and results" /><Feature icon={Trophy} text="Awards and campus competitions" /><Feature icon={Building2} text="Organisation-based election management" /></div></div></div>;
}
function Feature({ icon: Icon, text }: { icon: typeof Workflow; text: string }) { return <div className="flex items-center gap-4"><Icon className="h-6 w-6 text-cyan-400" aria-hidden="true" /><span>{text}</span></div>; }
