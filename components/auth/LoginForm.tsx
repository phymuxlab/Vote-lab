import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  return (
    <Card className="w-full max-w-md border-slate-800 bg-slate-900/70 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-3xl text-center">
          Welcome Back 👋
        </CardTitle>

        <p className="text-center text-slate-400">
          Sign in to your Vote Lab account
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="student@school.edu"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
          />
        </div>

        <Button className="w-full">
          Login
        </Button>
      </CardContent>
    </Card>
  );
}