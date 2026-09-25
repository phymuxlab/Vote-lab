"use server";

import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/storage";
import { requireOrganizationOwner } from "@/lib/auth/authorization";
import { cleanText, normaliseEmail, optionalText, safeHexColour, safeUrl } from "@/lib/validation";

export type UpdateOrganizationState = {
  ok: boolean;
  message: string;
};

export async function updateOrganization(
  _previousState: UpdateOrganizationState,
  formData: FormData,
): Promise<UpdateOrganizationState> {
  try {
    const organizationId = String(formData.get("organizationId") ?? "").trim();
    if (!organizationId) return { ok: false, message: "Organisation ID is missing." };

    const { supabase } = await requireOrganizationOwner(organizationId);

    const name = cleanText(formData.get("name"), 120);
    if (!name) return { ok: false, message: "Organisation name is required." };

    const contactEmailRaw = cleanText(formData.get("contact_email"), 254);
    const contactEmail = contactEmailRaw ? normaliseEmail(contactEmailRaw) : null;
    const website = safeUrl(formData.get("website"));
    const themeColor = safeHexColour(formData.get("theme_color") ?? "#22D3EE");

    const updateData: Record<string, unknown> = {
      name,
      motto: optionalText(formData.get("motto"), 160),
      description: optionalText(formData.get("description"), 1000),
      website,
      contact_email: contactEmail,
      theme_color: themeColor,
    };

    const logo = formData.get("logo");
    if (logo instanceof File && logo.size > 0) {
      updateData.logo_url = await uploadImage("organization-assets", logo, organizationId, "logos");
    }

    const { error } = await supabase.from("organizations").update(updateData).eq("id", organizationId);
    if (error) {
      console.error("Vote Lab: organization update failed", error);
      return { ok: false, message: "Unable to save organisation settings. Please try again." };
    }

    revalidatePath(`/dashboard/organizations/${organizationId}`);
    revalidatePath(`/dashboard/organizations/${organizationId}/settings`);
    revalidatePath("/dashboard/organizations");

    return { ok: true, message: "Organisation settings saved." };
  } catch (error) {
    console.error("Vote Lab: organization settings action failed", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unable to save organisation settings.",
    };
  }
}
