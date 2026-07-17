"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/shared/image-upload-field";
import type { ProductFormState } from "../actions/create-product";
import type { Product } from "@/types";

const INITIAL_STATE: ProductFormState = { success: false, message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Menyimpan..." : label}
    </Button>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type ProductFormProps = {
  product?: Product;
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  submitLabel: string;
};

export function ProductForm({ product, action, submitLabel }: ProductFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_STATE);

  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Nama Produk</Label>
        <Input
          id="name"
          name="name"
          defaultValue={product?.name}
          placeholder="mis. Keripik Singkong Jasem"
          onChange={(event) => {
            if (product) return; // jangan auto-ubah slug saat edit
            const slugInput = document.getElementById("slug") as HTMLInputElement | null;
            if (slugInput && !slugInput.dataset.touched) {
              slugInput.value = slugify(event.target.value);
            }
          }}
          required
        />
        {state.fieldErrors?.name ? (
          <p className="text-xs text-red-600">{state.fieldErrors.name[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={product?.slug}
          placeholder="mis. keripik-singkong-jasem"
          onInput={(event) => {
            (event.target as HTMLInputElement).dataset.touched = "true";
          }}
          required
        />
        {state.fieldErrors?.slug ? (
          <p className="text-xs text-red-600">{state.fieldErrors.slug[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description ?? ""}
          placeholder="Ceritakan produk ini secara singkat"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Harga (Rp, opsional)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            step="500"
            defaultValue={product?.price ?? ""}
            placeholder="Kosongkan bila hubungi kami"
          />
          {state.fieldErrors?.price ? (
            <p className="text-xs text-red-600">{state.fieldErrors.price[0]}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="display_order">Urutan Tampil</Label>
          <Input
            id="display_order"
            name="display_order"
            type="number"
            min={0}
            defaultValue={product?.display_order ?? 0}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact_whatsapp">Nomor WhatsApp Kontak</Label>
        <Input
          id="contact_whatsapp"
          name="contact_whatsapp"
          defaultValue={product?.contact_whatsapp ?? ""}
          placeholder="mis. 081234567890"
        />
      </div>

      <ImageUploadField
        name="image_url"
        label="Foto Produk (opsional)"
        folder="produk"
        defaultValue={product?.image_url}
      />
      {state.fieldErrors?.image_url ? (
        <p className="text-xs text-red-600">{state.fieldErrors.image_url[0]}</p>
      ) : null}

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={product?.is_published ?? true}
          className="h-4 w-4 rounded border-border text-forest focus:ring-forest"
        />
        Tampilkan di halaman publik
      </label>

      <div className="mt-2 flex items-center gap-3">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
