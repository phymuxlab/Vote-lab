"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Crop, ImagePlus, RotateCcw, X, ZoomIn } from "lucide-react";

interface ImageUploadProps {
  label: string;
  name: string;
  initialImage?: string;
}

const VIEWPORT = 320;
const OUTPUT = 512;

type SourceImage = { url: string; width: number; height: number };

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ImageUpload({ label, name, initialImage }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(initialImage ?? "");
  const [source, setSource] = useState<SourceImage | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ pointerX: number; pointerY: number; x: number; y: number } | null>(null);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const baseScale = useMemo(() => {
    if (!source) return 1;
    return Math.max(VIEWPORT / source.width, VIEWPORT / source.height);
  }, [source]);

  const displayWidth = source ? source.width * baseScale * zoom : VIEWPORT;
  const displayHeight = source ? source.height * baseScale * zoom : VIEWPORT;

  useEffect(() => {
    return () => {
      if (source?.url.startsWith("blob:")) URL.revokeObjectURL(source.url);
    };
  }, [source]);

  function constrainedPosition(x: number, y: number, nextZoom = zoom) {
    if (!source) return { x: 0, y: 0 };
    const width = source.width * baseScale * nextZoom;
    const height = source.height * baseScale * nextZoom;
    return {
      x: clamp(x, VIEWPORT - width, 0),
      y: clamp(y, VIEWPORT - height, 0),
    };
  }

  function openCrop(file: File) {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5 MB or smaller.");
      return;
    }
    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      setSource({ url, width: image.naturalWidth, height: image.naturalHeight });
      setZoom(1);
      const scale = Math.max(VIEWPORT / image.naturalWidth, VIEWPORT / image.naturalHeight);
      setOffset({
        x: (VIEWPORT - image.naturalWidth * scale) / 2,
        y: (VIEWPORT - image.naturalHeight * scale) / 2,
      });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setError("Unable to read this image.");
    };
    image.src = url;
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!source) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragStart({ pointerX: event.clientX, pointerY: event.clientY, x: offset.x, y: offset.y });
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragStart || !source) return;
    setOffset(constrainedPosition(dragStart.x + event.clientX - dragStart.pointerX, dragStart.y + event.clientY - dragStart.pointerY));
  }

  function handleZoom(value: number) {
    const next = clamp(value, 1, 3);
    const centerX = VIEWPORT / 2;
    const centerY = VIEWPORT / 2;
    const ratio = next / zoom;
    const nextX = centerX - (centerX - offset.x) * ratio;
    const nextY = centerY - (centerY - offset.y) * ratio;
    setZoom(next);
    setOffset(constrainedPosition(nextX, nextY, next));
  }

  function resetCrop() {
    if (!source) return;
    setZoom(1);
    const scale = Math.max(VIEWPORT / source.width, VIEWPORT / source.height);
    setOffset({ x: (VIEWPORT - source.width * scale) / 2, y: (VIEWPORT - source.height * scale) / 2 });
  }

  async function applyCrop() {
    if (!source || !inputRef.current) return;
    setProcessing(true);
    setError("");
    try {
      const image = new window.Image();
      image.src = source.url;
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Unable to process image."));
      });

      const canvas = document.createElement("canvas");
      canvas.width = OUTPUT;
      canvas.height = OUTPUT;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas is not supported by this browser.");

      const sourceX = Math.max(0, -offset.x / (baseScale * zoom));
      const sourceY = Math.max(0, -offset.y / (baseScale * zoom));
      const sourceSize = VIEWPORT / (baseScale * zoom);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, OUTPUT, OUTPUT);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.88));
      if (!blob) throw new Error("Unable to create the cropped image.");

      const croppedFile = new File([blob], `${name}-512.webp`, { type: "image/webp" });
      const transfer = new DataTransfer();
      transfer.items.add(croppedFile);
      inputRef.current.files = transfer.files;
      setPreview(URL.createObjectURL(blob));
      setSource(null);
    } catch (cropError) {
      setError(cropError instanceof Error ? cropError.message : "Unable to crop image.");
    } finally {
      setProcessing(false);
    }
  }

  function clearImage() {
    if (inputRef.current) inputRef.current.value = "";
    setPreview("");
    setSource(null);
    setError("");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <label htmlFor={name} className="text-sm font-semibold text-white">{label}</label>
          <p className="mt-1 text-xs text-slate-500">Square 1:1 · cropped to 512 × 512</p>
        </div>
        {preview && <button type="button" onClick={clearImage} className="text-xs font-medium text-slate-500 hover:text-red-300">Remove</button>}
      </div>

      <button type="button" onClick={() => inputRef.current?.click()} className="group relative flex aspect-square w-full max-w-[320px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/70 text-left shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
        {preview ? (
          <Image src={preview} alt={`${label} preview`} fill sizes="320px" className="object-cover" unoptimized />
        ) : (
          <span className="m-auto flex flex-col items-center gap-3 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300"><ImagePlus className="h-6 w-6" /></span>
            <span className="text-sm font-semibold text-white">Upload logo</span>
            <span className="text-xs text-slate-500">JPG, PNG or WebP · max 5 MB</span>
          </span>
        )}
        {preview && <span className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-xl bg-slate-950/80 px-3 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100"><Crop className="h-4 w-4" /> Replace & crop</span>}
      </button>

      <input ref={inputRef} id={name} name={name} hidden type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => { const file = event.target.files?.[0]; event.currentTarget.value = ""; if (file) openCrop(file); }} />

      {error && <p className="text-xs font-medium text-red-300" role="alert">{error}</p>}

      {source && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Crop organisation logo">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0b1424] p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div><div className="flex items-center gap-2 text-cyan-300"><Crop className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-[0.16em]">Crop logo</span></div><h2 className="mt-2 text-xl font-semibold text-white">Make it square</h2><p className="mt-1 text-sm text-slate-500">Drag the image and adjust the zoom until the mark looks right.</p></div>
              <button type="button" onClick={() => setSource(null)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-white" aria-label="Close cropper"><X className="h-4 w-4" /></button>
            </div>

            <div className="mx-auto mt-6 w-fit overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
              <div className="relative h-[280px] w-[280px] cursor-grab touch-none active:cursor-grabbing" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={() => setDragStart(null)} onPointerCancel={() => setDragStart(null)}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,230,192,.08),transparent_55%)]" />
                {/* Blob crop previews are intentionally rendered with img because next/image cannot optimise object URLs. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={source.url} alt="Logo crop preview" draggable={false} className="absolute max-w-none select-none" style={{ width: displayWidth, height: displayHeight, left: offset.x, top: offset.y }} />
                <div className="pointer-events-none absolute inset-0 border-[18px] border-black/35" />
                <div className="pointer-events-none absolute inset-4 rounded-[1.25rem] border border-white/70" />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <ZoomIn className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <input aria-label="Logo crop zoom" type="range" min="1" max="3" step="0.01" value={zoom} onChange={(event) => handleZoom(Number(event.target.value))} className="w-full accent-cyan-400" />
              <span className="w-12 text-right text-xs text-slate-500">{zoom.toFixed(1)}×</span>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
              <button type="button" onClick={resetCrop} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 text-sm font-medium text-slate-300 hover:bg-white/5"><RotateCcw className="h-4 w-4" /> Reset</button>
              <div className="flex gap-2"><button type="button" onClick={() => setSource(null)} className="h-11 rounded-xl px-4 text-sm font-medium text-slate-400 hover:text-white">Cancel</button><button type="button" onClick={applyCrop} disabled={processing} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 text-sm font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-60">{processing ? "Processing…" : <><Check className="h-4 w-4" /> Use this crop</>}</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
