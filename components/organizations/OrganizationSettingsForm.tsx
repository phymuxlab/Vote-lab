"use client";

import { useFormStatus } from "react-dom";

import { updateOrganization } from "@/app/actions/organization/update";

import ImageUpload from "@/components/ui/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  organization: any;
}

function SaveButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="bg-cyan-500 text-black hover:bg-cyan-400"
    >
      {pending ? "Saving..." : "Save Changes"}
    </Button>
  );
}

export default function OrganizationSettingsForm({
  organization,
}: Props) {
  return (
    <form
      action={updateOrganization}
      className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900 p-8"
    >
      <input
        type="hidden"
        name="organizationId"
        value={organization.id}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ImageUpload
          label="Organization Logo"
          name="logo"
          initialImage={organization.logo_url}
        />

        <ImageUpload
          label="Organization Banner"
          name="banner"
          aspect="banner"
          initialImage={organization.banner_url}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label>Organization Name</Label>

          <Input
            name="name"
            defaultValue={organization.name}
          />
        </div>

        <div>
          <Label>Motto</Label>

          <Input
            name="motto"
            defaultValue={organization.motto}
          />
        </div>
      </div>

      <div>
        <Label>Description</Label>

        <Textarea
          name="description"
          rows={5}
          defaultValue={organization.description}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label>Website</Label>

          <Input
            name="website"
            defaultValue={organization.website}
          />
        </div>

        <div>
          <Label>Contact Email</Label>

          <Input
            type="email"
            name="contact_email"
            defaultValue={organization.contact_email}
          />
        </div>
      </div>

      <div>
        <Label>Theme Color</Label>

        <Input
          type="color"
          name="theme_color"
          defaultValue={
            organization.theme_color ?? "#06B6D4"
          }
          className="h-12 w-32"
        />
      </div>

      <SaveButton />

      <div className="rounded-2xl border border-red-900 bg-red-950/20 p-6">
        <h2 className="text-xl font-bold text-red-400">
          Danger Zone
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Deleting an organization will permanently remove all
          associated elections, categories, nominees and votes.
          This action cannot be undone.
        </p>

        <Button
          type="button"
          variant="destructive"
          className="mt-4"
          disabled
        >
          Delete Organization (Coming Soon)
        </Button>
      </div>
    </form>
  );
}