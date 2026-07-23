"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud } from "lucide-react";

interface ImageUploadProps {
  label: string;
  name: string;
  aspect?: "square" | "banner";
  initialImage?: string;
}

export default function ImageUpload({
  label,
  name,
  aspect = "square",
  initialImage,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(
    initialImage ?? null
  );

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    setPreview(objectUrl);
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-white">
        {label}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className={`relative flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800 transition hover:border-cyan-500 ${
          aspect === "banner" ? "h-48" : "h-52"
        }`}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt={label}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-end justify-center bg-black/0 transition hover:bg-black/40">
              <span className="mb-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black opacity-0 transition hover:opacity-100">
                Change Image
              </span>
            </div>
          </>
        ) : (
          <div className="text-center text-slate-400">
            <UploadCloud className="mx-auto mb-3 h-10 w-10" />

            <p className="font-semibold">
              Click to upload
            </p>

            <p className="text-sm">
              PNG, JPG or WEBP
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        hidden
        type="file"
        name={name}
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
}