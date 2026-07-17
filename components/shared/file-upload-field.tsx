"use client";

import { useRef, useState, useTransition } from "react";
import { FileText, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/features/media/actions/upload-file";

type FileUploadFieldProps = {
  name: string;
  label: string;
  folder: string;
  defaultValue?: string | null;
  placeholder?: string;
  required?: boolean;
};

export function FileUploadField({
  name,
  label,
  folder,
  defaultValue,
  placeholder = "atau tempel URL file",
  required,
}: FileUploadFieldProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    startTransition(async () => {
      const result = await uploadFile(formData);
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
          <FileText className={`h-6 w-6 ${value ? "text-forest" : "text-muted-foreground"}`} />
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
              {value ? "Ganti File" : "Unggah PDF"}
            </button>
            {value ? (
              <button
                type="button"
                onClick={() => setValue("")}
                aria-label="Hapus file"
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
            placeholder={placeholder}
            required={required}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-xs text-muted-foreground">
            PDF maksimal 10MB. Bisa juga tempel URL file.
          </p>
        </div>
      </div>
    </div>
  );
}