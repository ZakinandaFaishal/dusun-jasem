"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { ImageUploadField } from "@/components/shared/image-upload-field";
import { FileUploadField } from "@/components/shared/file-upload-field";
import type { GalleryItemFormState } from "../actions/create-gallery-item";
import type { GalleryCategory, GalleryItem } from "@/types";

const CATEGORY_OPTIONS: { value: GalleryCategory; label: string }[] = [
  { value: "pertanian", label: "Pertanian" },
  { value: "kegiatan_dusun", label: "Kegiatan Dusun" },
  { value: "kkn", label: "KKN" },
  { value: "produk", label: "Produk" },
];

const INITIAL_STATE: GalleryItemFormState = { success: false, message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Menyimpan..." : label}
    </Button>
  );
}

type GalleryItemFormProps = {
  item?: GalleryItem;
  action: (state: GalleryItemFormState, formData: FormData) => Promise<GalleryItemFormState>;
  submitLabel: string;
};

export function GalleryItemForm({ item, action, submitLabel }: GalleryItemFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_STATE);

  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="title">Judul</Label>
        <Input
          id="title"
          name="title"
          defaultValue={item?.title}
          placeholder="mis. Panen Raya Cabai 2026"
          required
        />
        {state.fieldErrors?.title ? (
          <p className="text-xs text-red-600">{state.fieldErrors.title[0]}</p>
        ) : null}
      </div>

      <ImageUploadField
        name="image_url"
        label="Foto"
        folder="galeri"
        defaultValue={item?.image_url}
        required
      />
      {state.fieldErrors?.image_url ? (
        <p className="text-xs text-red-600">{state.fieldErrors.image_url[0]}</p>
      ) : null}

      <FileUploadField
        name="attachment_url"
        label="Lampiran Galeri (opsional)"
        folder="galeri"
        defaultValue={item?.attachment_url}
        placeholder="atau tempel URL PDF / tautan"
      />
      {state.fieldErrors?.attachment_url ? (
        <p className="text-xs text-red-600">{state.fieldErrors.attachment_url[0]}</p>
      ) : null}

      <div className="grid gap-2">
        <Label htmlFor="category">Kategori</Label>
        <Select id="category" name="category" defaultValue={item?.category} required>
          <option value="" disabled>
            Pilih kategori
          </option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {state.fieldErrors?.category ? (
          <p className="text-xs text-red-600">{state.fieldErrors.category[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="display_order">Urutan Tampil</Label>
        <Input
          id="display_order"
          name="display_order"
          type="number"
          min={0}
          defaultValue={item?.display_order ?? 0}
        />
      </div>

      <div className="mt-2 flex items-center gap-3">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
