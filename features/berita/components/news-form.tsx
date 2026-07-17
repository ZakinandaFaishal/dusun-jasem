"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/shared/image-upload-field";
import { FileUploadField } from "@/components/shared/file-upload-field";
import type { NewsFormState } from "../actions/create-news";
import type { NewsCategory, NewsPost } from "@/types";

const CATEGORY_OPTIONS: { value: NewsCategory; label: string }[] = [
  { value: "kegiatan_dusun", label: "Kegiatan Dusun" },
  { value: "panen", label: "Panen" },
  { value: "pelatihan", label: "Pelatihan" },
  { value: "kkn", label: "KKN" },
  { value: "pertanian", label: "Pertanian" },
];

const INITIAL_STATE: NewsFormState = { success: false, message: "" };

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

type NewsFormProps = {
  news?: NewsPost;
  action: (state: NewsFormState, formData: FormData) => Promise<NewsFormState>;
  submitLabel: string;
};

export function NewsForm({ news, action, submitLabel }: NewsFormProps) {
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
          defaultValue={news?.title}
          placeholder="mis. Panen Raya Cabai di Dusun Jasem"
          onChange={(event) => {
            if (news) return; // jangan auto-ubah slug saat edit
            const slugInput = document.getElementById("slug") as HTMLInputElement | null;
            if (slugInput && !slugInput.dataset.touched) {
              slugInput.value = slugify(event.target.value);
            }
          }}
          required
        />
        {state.fieldErrors?.title ? (
          <p className="text-xs text-red-600">{state.fieldErrors.title[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={news?.slug}
          placeholder="mis. panen-raya-cabai-di-dusun-jasem"
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
          <Label htmlFor="category">Kategori</Label>
          <Select id="category" name="category" defaultValue={news?.category} required>
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
          <Label htmlFor="author">Penulis</Label>
          <Input
            id="author"
            name="author"
            defaultValue={news?.author}
            placeholder="mis. Tim KKN"
            required
          />
          {state.fieldErrors?.author ? (
            <p className="text-xs text-red-600">{state.fieldErrors.author[0]}</p>
          ) : null}
        </div>
      </div>

      <ImageUploadField
        name="cover_image_url"
        label="Foto Sampul (opsional)"
        folder="berita"
        defaultValue={news?.cover_image_url}
      />
      {state.fieldErrors?.cover_image_url ? (
        <p className="text-xs text-red-600">{state.fieldErrors.cover_image_url[0]}</p>
      ) : null}

      <FileUploadField
        name="attachment_url"
        label="Lampiran Berita (opsional)"
        folder="berita"
        defaultValue={news?.attachment_url}
        placeholder="atau tempel URL PDF / tautan"
      />
      {state.fieldErrors?.attachment_url ? (
        <p className="text-xs text-red-600">{state.fieldErrors.attachment_url[0]}</p>
      ) : null}

      <div className="grid gap-2">
        <Label htmlFor="content">Isi Berita</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={news?.content}
          placeholder="Tulis isi berita di sini. Pisahkan paragraf dengan baris kosong."
          className="min-h-56"
          required
        />
        {state.fieldErrors?.content ? (
          <p className="text-xs text-red-600">{state.fieldErrors.content[0]}</p>
        ) : null}
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked={news?.is_published ?? false}
          className="h-4 w-4 rounded border-border text-forest focus:ring-forest"
        />
        Tayangkan di halaman publik
      </label>

      <div className="mt-2 flex items-center gap-3">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
