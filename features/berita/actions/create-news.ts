"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const newsSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z
    .string()
    .min(1, "Slug wajib diisi")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  cover_image_url: z.string().url("URL foto tidak valid").nullable().optional(),
  attachment_url: z.string().url("URL file tidak valid").nullable().optional(),
  content: z.string().min(1, "Isi berita wajib diisi"),
  category: z.enum(["kegiatan_dusun", "panen", "pelatihan", "kkn", "pertanian"], {
    message: "Kategori wajib dipilih",
  }),
  author: z.string().min(1, "Penulis wajib diisi"),
  is_published: z.boolean().optional().default(false),
});

export type NewsFormState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createNews(
  _prevState: NewsFormState,
  formData: FormData,
): Promise<NewsFormState> {
  const parsed = newsSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    cover_image_url: formData.get("cover_image_url") || null,
    attachment_url: formData.get("attachment_url") || null,
    content: formData.get("content"),
    category: formData.get("category"),
    author: formData.get("author"),
    is_published: formData.get("is_published") === "on",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Data tidak valid. Periksa kembali form.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("news_posts").insert({
    ...parsed.data,
    published_at: parsed.data.is_published ? new Date().toISOString() : null,
  });

  if (error) {
    return {
      success: false,
      message: error.message.includes("duplicate")
        ? "Slug sudah dipakai berita lain. Gunakan slug yang berbeda."
        : `Gagal menyimpan: ${error.message}`,
    };
  }

  revalidatePath("/berita");
  revalidatePath("/galeri");
  revalidatePath("/dashboard/berita");
  redirect("/dashboard/berita");
}
