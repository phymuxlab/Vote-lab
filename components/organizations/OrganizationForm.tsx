"use client";

import { useFormStatus } from "react-dom";

import { createOrganization } from "@/app/actions/organization/create";

import ImageUpload from "@/components/ui/ImageUpload";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-cyan-500 font-semibold text-black hover:bg-cyan-400"
    >
      {pending
        ? "Creating Organization..."
        : "Create Organization"}
    </Button>
  );
}

export default function OrganizationForm() {
  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
      <h1 className="text-3xl font-bold text-white">
        Create Organization
      </h1>

      <p className="mt-2 text-slate-400">
        Build your organization profile. Every election created under this
        organization will automatically inherit its branding.
      </p>

      <form
        action={createOrganization}
        className="mt-8 space-y-8"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-white"
            >
              Organization Name
            </Label>

            <Input
              id="name"
              name="name"
              required
              placeholder="Student Union Government"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="motto"
              className="text-white"
            >
              Motto
            </Label>

            <Input
              id="motto"
              name="motto"
              placeholder="Leadership • Service • Excellence"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="website"
              className="text-white"
            >
              Website
            </Label>

            <Input
              id="website"
              name="website"
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="contact_email"
              className="text-white"
            >
              Contact Email
            </Label>

            <Input
              id="contact_email"
              name="contact_email"
              type="email"
              placeholder="info@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="theme_color"
              className="text-white"
            >
              Theme Color
            </Label>

            <Input
              id="theme_color"
              name="theme_color"
              type="color"
              defaultValue="#06B6D4"
              className="h-12"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-white"
          >
            Description
          </Label>

          <Textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Tell people about your organization..."
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <ImageUpload
            label="Organization Logo"
            name="logo"
          />

          <ImageUpload
            label="Organization Banner"
            name="banner"
            aspect="banner"
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}