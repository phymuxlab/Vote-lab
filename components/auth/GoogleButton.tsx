import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export default function GoogleButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-12 w-full rounded-xl border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
    >
      <FcGoogle className="mr-3 h-5 w-5" />
      Continue with Google
    </Button>
  );
}