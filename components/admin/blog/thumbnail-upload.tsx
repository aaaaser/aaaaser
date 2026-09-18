"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, RefreshCw, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThumbnailUploadProps {
  value: string;
  altText?: string;
  onChange: (url: string, altText?: string) => void;
  onAltChange?: (alt: string) => void;
  className?: string;
}

export function ThumbnailUpload({
  value,
  altText = "",
  onChange,
  onAltChange,
  className,
}: ThumbnailUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<{ name: string; size: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleUploadFile = async (file: File) => {
    setError(null);

    // Validate type: JPG, JPEG, PNG, WEBP
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setError("Format file tidak didukung. Harap upload gambar JPG, PNG, atau WEBP.");
      return;
    }

    // Validate size: max 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar terlalu besar. Maksimal 5MB.");
      return;
    }

    setUploading(true);
    setFileMeta({
      name: file.name,
      size: formatFileSize(file.size),
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Gagal mengunggah gambar.");
      }

      onChange(data.url, altText || file.name.replace(/\.[^/.]+$/, ""));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal mengunggah thumbnail.";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange("", "");
    setFileMeta(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
          <ImageIcon className="size-3.5 text-neutral-500" />
          <span>Thumbnail Blog (16:9)</span>
        </label>
        {value && !uploading && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:underline cursor-pointer"
            >
              <RefreshCw className="size-3" />
              Replace Image
            </button>
            <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-red-600 dark:text-red-400 hover:underline cursor-pointer"
            >
              <X className="size-3" />
              Remove
            </button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
        id="thumbnail-file-input"
      />

      {value ? (
        /* Preview State */
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-3 space-y-3">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-2xs">
            <Image
              src={value}
              alt={altText || "Thumbnail Preview"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              referrerPolicy="no-referrer"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white text-xs font-mono gap-2">
                <Loader2 className="size-4 animate-spin" />
                <span>Uploading new image...</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 px-1">
            <div className="truncate max-w-[280px]">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">File: </span>
              <span>{fileMeta?.name || value.split("/").pop()?.slice(0, 30) || "Uploaded Image"}</span>
              {fileMeta?.size && <span className="ml-1.5 text-neutral-400">({fileMeta.size})</span>}
            </div>
            <div className="text-[11px] text-neutral-400">Format: JPG, PNG, WEBP (Max 5MB)</div>
          </div>

          {/* Alt Text Input */}
          <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60">
            <label htmlFor="thumbnail-alt-input" className="block text-[11px] font-mono text-neutral-600 dark:text-neutral-400 mb-1">
              Thumbnail Alt Text <span className="text-neutral-400">(Penting untuk SEO & Aksesibilitas)</span>:
            </label>
            <input
              id="thumbnail-alt-input"
              type="text"
              value={altText}
              onChange={(e) => {
                if (onAltChange) onAltChange(e.target.value);
                else onChange(value, e.target.value);
              }}
              placeholder="Deskripsikan gambar thumbnail secara ringkas..."
              className="w-full px-3 py-1.5 text-xs rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>
        </div>
      ) : (
        /* Drag & Drop Upload Zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3",
            isDragging
              ? "border-neutral-900 dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-900"
              : "border-neutral-300 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/30"
          )}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="size-8 animate-spin text-neutral-600 dark:text-neutral-300" />
              <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                Mengunggah thumbnail ke storage...
              </p>
            </div>
          ) : (
            <>
              <div className="size-12 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-300 shadow-2xs">
                <UploadCloud className="size-6" />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
                  Upload Thumbnail Artikel
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Drag & drop gambar ke area ini, atau <span className="text-neutral-900 dark:text-neutral-100 font-medium underline underline-offset-2">Browse Image</span>
                </p>
              </div>

              <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                <span>Support: JPG, JPEG, PNG, WEBP</span>
                <span>&bull;</span>
                <span>Maks. 5 MB</span>
                <span>&bull;</span>
                <span>Rasio 16:9</span>
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-xs font-mono text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-lg border border-red-200 dark:border-red-900/50">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
