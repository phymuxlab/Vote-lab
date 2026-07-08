"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import GoogleButton from "@/components/auth/GoogleButton";
import AuthDivider from "@/components/auth/AuthDivider";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const supabase = createClient();

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setAuthError("");
  setIsLoading(true);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setIsLoading(false);

  if (error) {
    setAuthError(error.message);
    return;
  }

  window.location.href = "/dashboard";
};

  return (
    <Card className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
      <CardHeader className="space-y-3 pb-8 text-center">
        <CardTitle className="text-4xl font-bold text-white">
          Welcome Back 👋
        </CardTitle>

        <CardDescription className="text-base text-slate-400">
          Sign in to continue to your Vote Lab account.
        </CardDescription>
      </CardHeader>

      <CardContent>
    <GoogleButton />

  <AuthDivider />

  

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@school.edu"
              className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

{authError && (
  <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
    {authError}
  </p>
)}
          <Button
  type="submit"
  disabled={isLoading}
  className="h-12 w-full rounded-xl bg-cyan-500 font-semibold text-black hover:bg-cyan-400"
>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Signing In...
    </>
  ) : (
    "Login"
  )}
</Button>

          <div className="flex items-center justify-between text-sm">
            <Link
              href="/forgot-password"
              className="text-cyan-400 hover:underline"
            >
              Forgot Password?
            </Link>

            <Link
              href="/register"
              className="text-cyan-400 hover:underline"
            >
              Create Account
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}