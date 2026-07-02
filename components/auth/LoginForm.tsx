"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="w-full max-w-md border-slate-800 bg-slate-900/70 backdrop-blur">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold text-white">
          Welcome Back 👋
        </CardTitle>

        <CardDescription>
          Sign in to continue to Vote Lab
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="student@school.edu"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
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

          <Button className="w-full">
            Login
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