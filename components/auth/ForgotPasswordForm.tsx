"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import { Loader2, Mail, ArrowLeft } from "lucide-react";

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

export default function ForgotPasswordForm() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(true);
  };

  return (
    <Card className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="text-4xl font-bold text-white">
          Forgot Password
        </CardTitle>

        <CardDescription className="text-base text-slate-400">
          Enter your email address and we'll send you a password reset link.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {success ? (
          <div className="space-y-6 text-center">
            <Mail className="mx-auto h-14 w-14 text-cyan-400" />

            <div>
              <h3 className="text-xl font-semibold text-white">
                Check your inbox
              </h3>

              <p className="mt-2 text-slate-400">
                If an account exists for <strong>{email}</strong>,
                you'll receive a password reset link shortly.
              </p>
            </div>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-cyan-400 hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email Address
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="student@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
                required
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full rounded-xl bg-cyan-500 font-semibold text-black hover:bg-cyan-400"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Reset Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}