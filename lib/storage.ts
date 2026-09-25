import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { safeFile } from "@/lib/validation";

const ALLOWED_BUCKET = "organization-assets";
const ALLOWED_FOLDERS = new Set(["logos"]);

export async function uploadImage(bucket: string, file: File, organizationId: string, folder: string) {
  if (bucket !== ALLOWED_BUCKET || !ALLOWED_FOLDERS.has(folder) || !/^[0-9a-f-]{36}$/i.test(organizationId)) {
    throw new Error("Invalid upload destination.");
  }

  const safe = safeFile(file, "Image");
  if (!safe) throw new Error("Image is required.");

  const extension = safe.type === "image/jpeg" ? "jpg" : safe.type === "image/webp" ? "webp" : "png";
  const filename = `organizations/${organizationId}/${folder}/${randomUUID()}.${extension}`;
  const supabase = await createClient();

  const { error } = await supabase.storage.from(bucket).upload(filename, safe, {
    contentType: safe.type,
    cacheControl: "31536000",
    upsert: false,
  });

  if (error) throw new Error("Unable to upload image.");

  const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
  return data.publicUrl;
}
