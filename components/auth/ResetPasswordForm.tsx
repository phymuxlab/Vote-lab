"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import PasswordStrength from "@/components/auth/PasswordStrength";
import PasswordChecklist from "@/components/auth/PasswordChecklist";

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

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    setLoading(false);
  };

  return (
    <Card className="w-full rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
      <CardHeader className="space-y-3 text-center">
        <CardTitle className="text-4xl font-bold text-white">
          Reset Password
        </CardTitle>

        <CardDescription className="text-base text-slate-400">
          Choose a new password for your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Password */}

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-white"
            >
              New Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={
                  showPassword ? "text" : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <PasswordStrength password={password} />

            <PasswordChecklist password={password} />
          </div>

          {/* Confirm */}

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-white"
            >
              Confirm Password
            </Label>

            <div className="relative">
              <Input
                id="confirmPassword"
                type={
                  showConfirm ? "text" : "password"
                }
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="••••••••"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showConfirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">
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
                Updating Password...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}