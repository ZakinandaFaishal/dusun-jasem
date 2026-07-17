"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/features/media/actions/upload-image";

type MultiImageUploadFieldProps = {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string[];
  helperText?: string;
};

// Tetap berupa <textarea name={name}> satu-URL-per-baris, konsisten dengan
// cara Server Action mem-parsing "photo_urls" (lihat
// features/potensi-pertanian/actions/create-commodity.ts). Upload lewat
// tombol di sini hanya menambah baris baru; textarea tetap bisa disunting
// manual (hapus baris, tempel URL lain, dst).
export function MultiImageUploadField({
  name,
  label,
  folder,
  defaultValue = [],
  helperText,
}: MultiImageUploadFieldProps) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    startTransition(async () => {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const result = await uploadImage(formData);
        if (result.success && result.url) {
          setUrls((prev) => [...prev, result.url!]);
        } else {
          toast.error(`${file.name}: ${result.message}`);
        }
      }
      toast.success("Unggah foto selesai.");
    });
  }

  function removeUrl(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>

      <div className="flex flex-wrap gap-3">
        {urls.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative h-16 w-16 overflow-hidden rounded-lg border border-border"
          >
            <Image src={url} alt="" fill className="object-cover" sizes="64px" />
            <button
              type="button"
              onClick={() => removeUrl(index)}
              aria-label="Hapus foto"
              className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground transition-colors hover:border-forest hover:text-forest disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Upload className="h-5 w-5" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={handleFilesChange}
        />
      </div>

      {/* Textarea inilah yang benar-benar ter-submit; disinkronkan dari
          state urls agar upload dan edit manual tetap konsisten. */}
      <Textarea
        id={name}
        name={name}
        value={urls.join("\n")}
        onChange={(event) =>
          setUrls(
            event.target.value
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0),
          )
        }
        placeholder={"Satu URL per baris, mis.\nhttps://.../sawah-1.jpg\nhttps://.../panen-1.jpg"}
        className="min-h-24"
      />
      <p className="text-xs text-muted-foreground">
        {helperText ?? "JPG, PNG, WEBP, atau GIF. Maks 5MB per foto."}
      </p>
    </div>
  );
}
