import AuthShowcase from "@/components/auth/AuthShowcase";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">

      <AuthShowcase />

      <div className="flex items-center justify-center bg-slate-950 px-6">
        <LoginForm />
      </div>

    </main>
  );
}