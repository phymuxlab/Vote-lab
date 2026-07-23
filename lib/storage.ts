import { createClient } from "@/lib/supabase/server";

export async function uploadImage(
  bucket: string,
  file: File,
  folder: string
) {
  const supabase = await createClient();

  const filename = `${folder}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filename, file);

  if (error) {
  console.error("Storage Upload Error:", error);
  throw new Error(error.message);
}

  const {
    data: { publicUrl },
  } = supabase.storage
    .from(bucket)
    .getPublicUrl(filename);

  return publicUrl;
}