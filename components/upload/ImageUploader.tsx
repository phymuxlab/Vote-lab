"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { createClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
  bucket: string;
  folder?: string;
  onUpload: (url: string) => void;
}

export default function ImageUploader({
  bucket,
  folder = "",
  onUpload,
}: ImageUploaderProps) {
  const supabase = createClient();

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (!file) return;

      setUploading(true);

      const filename = `${Date.now()}-${file.name}`;

      const path = folder
        ? `${folder}/${filename}`
        : filename;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(path, file);

      if (error) {
        alert(error.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      setPreview(data.publicUrl);

      onUpload(data.publicUrl);

      setUploading(false);
    },
    [bucket, folder, onUpload, supabase]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed p-10 transition ${
          isDragActive
            ? "border-cyan-500 bg-cyan-500/10"
            : "border-slate-700 bg-slate-900"
        }`}
      >
        <input {...getInputProps()} />

        {uploading ? (
          <p className="text-cyan-400">
            Uploading...
          </p>
        ) : (
          <p className="text-slate-400">
            Drag & Drop or Click to Upload
          </p>
        )}
      </div>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="h-52 w-full rounded-2xl object-cover"
        />
      )}
    </div>
  );
}