"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/shared/image-upload-field";
import { MultiImageUploadField } from "@/components/shared/multi-image-upload-field";
import type { CommodityFormState } from "../actions/create-commodity";
import type { AgricultureCommodity, AgricultureCommodityPhoto } from "@/types";

const INITIAL_STATE: CommodityFormState = { success: false, message: "" };

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

type CommodityFormProps = {
  commodity?: AgricultureCommodity;
  photos?: AgricultureCommodityPhoto[];
  action: (state: CommodityFormState, formData: FormData) => Promise<CommodityFormState>;
  submitLabel: string;
};

export function CommodityForm({ commodity, photos, action, submitLabel }: CommodityFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_STATE);

  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Nama Komoditas</Label>
        <Input
          id="name"
          name="name"
          defaultValue={commodity?.name}
          placeholder="mis. Cabai"
          onChange={(event) => {
            if (commodity) return; // jangan auto-ubah slug saat edit
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
          defaultValue={commodity?.slug}
          placeholder="mis. cabai"
          onInput={(event) => {
            (event.target as HTMLInputElement).dataset.touched = "true";
          }}
          required
        />
        {state.fieldErrors?.slug ? (
          <p className="text-xs text-red-600">{state.fieldErrors.slug[0]}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="land_area_ha">Luas Lahan (Ha)</Label>
          <Input
            id="land_area_ha"
            name="land_area_ha"
            type="number"
            min={0}
            step="0.1"
            defaultValue={commodity?.land_area_ha ?? ""}
          />
          {state.fieldErrors?.land_area_ha ? (
            <p className="text-xs text-red-600">{state.fieldErrors.land_area_ha[0]}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="display_order">Urutan Tampil</Label>
          <Input
            id="display_order"
            name="display_order"
            type="number"
            min={0}
            defaultValue={commodity?.display_order ?? 0}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="planting_season">Musim Tanam</Label>
          <Input
            id="planting_season"
            name="planting_season"
            defaultValue={commodity?.planting_season ?? ""}
            placeholder="mis. Oktober–Januari"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="harvest_yield">Hasil Produksi</Label>
          <Input
            id="harvest_yield"
            name="harvest_yield"
            defaultValue={commodity?.harvest_yield ?? ""}
            placeholder="mis. 2 ton/Ha"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={commodity?.description ?? ""}
          placeholder="Ceritakan komoditas ini secara singkat"
        />
      </div>

      <ImageUploadField
        name="cover_image_url"
        label="Foto Sampul (opsional)"
        folder="pertanian"
        defaultValue={commodity?.cover_image_url}
      />
      {state.fieldErrors?.cover_image_url ? (
        <p className="text-xs text-red-600">{state.fieldErrors.cover_image_url[0]}</p>
      ) : null}

      <MultiImageUploadField
        name="photo_urls"
        label="Foto Sawah & Panen (opsional)"
        folder="pertanian"
        defaultValue={photos?.map((photo) => photo.image_url) ?? []}
        helperText="Menyimpan form akan mengganti seluruh galeri foto komoditas ini dengan daftar di atas."
      />

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={commodity?.is_published ?? true}
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
