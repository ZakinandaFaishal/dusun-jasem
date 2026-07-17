"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadImage } from "@/features/media/actions/upload-image";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string | null;
  required?: boolean;
};

// Field ini tetap berupa <input name={name}> biasa yang ikut ter-submit
// lewat FormData form induk, jadi tidak perlu mengubah skema Zod di
// Server Action mana pun — hanya menambahkan cara mengisinya lewat upload
// selain mengetik/menempel URL secara manual.
export function ImageUploadField({
  name,
  label,
  folder,
  defaultValue,
  required,
}: ImageUploadFieldProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = ""; // agar bisa memilih file yang sama lagi nanti
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    startTransition(async () => {
      const result = await uploadImage(formData);
      if (result.success && result.url) {
        setValue(result.url);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="flex items-start gap-3">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-forest-light/10">
          {value ? (
            <Image src={value} alt="" fill className="object-cover" sizes="80px" />
          ) : (
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          )}
          {isPending ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          ) : null}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isPending}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-forest hover:text-forest disabled:opacity-50"
            >
              <Upload className="h-3.5 w-3.5" />
              {value ? "Ganti Foto" : "Unggah Foto"}
            </button>
            {value ? (
              <button
                type="button"
                onClick={() => setValue("")}
                aria-label="Hapus foto"
                className="text-muted-foreground hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <Input
            id={name}
            name={name}
            type="url"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="atau tempel URL foto"
            required={required}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-xs text-muted-foreground">JPG, PNG, WEBP, atau GIF. Maks 5MB.</p>
        </div>
      </div>
    </div>
  );
}
