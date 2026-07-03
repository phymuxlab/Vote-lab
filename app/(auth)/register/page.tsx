import AuthShowcase from "@/components/auth/AuthShowcase";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-5">
      <div className="lg:col-span-2">
        <AuthShowcase />
      </div>

      <div className="flex items-center justify-center bg-slate-950 px-8 lg:col-span-3">
  <div className="w-full max-w-xl">

    {/* Mobile Header */}
    <div className="mb-8 flex flex-col items-center lg:hidden">
      <h1 className="text-3xl font-bold text-white">
        Vote Lab
      </h1>

      <p className="mt-2 text-center text-slate-400">
        Secure online voting made simple.
      </p>
    </div>

    <RegisterForm />
  </div>
</div>
    </main>
  );
}