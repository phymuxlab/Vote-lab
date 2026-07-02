import AuthShowcase from "@/components/auth/AuthShowcase";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-5">
  <div className="lg:col-span-2">
    <AuthShowcase />
  </div>

  <div className="lg:col-span-3 flex items-center justify-center bg-slate-950 px-8">
    <LoginForm />
  </div>
</main>
  );
}