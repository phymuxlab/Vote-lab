"use client";

import { useState } from "react";
import type { Profile } from "@/types/profile";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



interface ProfileFormProps {
  user: User;
  profile: Profile | null;
}

export default function ProfileForm({
  user,
  profile,
}: ProfileFormProps) {
  const supabase = createClient();

  const [fullName, setFullName] = useState(
    profile?.full_name ?? ""
  );

  const [phone, setPhone] = useState(
    profile?.phone ?? ""
  );

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const handleSave = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Profile updated successfully.");
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Profile Settings
      </h1>

      <p className="mb-8 text-slate-400">
        Manage your Vote Lab profile.
      </p>

      <div className="space-y-6">
        <div>
          <Label className="text-white">
            Email
          </Label>

          <Input
            value={user.email ?? ""}
            disabled
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-white">
            Full Name
          </Label>

          <Input
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-white">
            Phone Number
          </Label>

          <Input
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-white">
            Role
          </Label>

          <Input
            value={profile?.role ?? "member"}
            disabled
            className="mt-2"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 p-3 text-red-400">
            {error}
          </div>
        )}

        {message && (
          <div className="rounded-lg bg-green-500/10 p-3 text-green-400">
            {message}
          </div>
        )}

        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}