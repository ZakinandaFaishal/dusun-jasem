"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { GalleryItemFormState } from "./create-gallery-item";

const galleryItemSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  image_url: z.string().url("URL foto tidak valid").min(1, "URL foto wajib diisi"),
  attachment_url: z.string().url("URL file tidak valid").nullable().optional(),
  category: z.enum(["pertanian", "kegiatan_dusun", "kkn", "produk"], {
    message: "Kategori wajib dipilih",
  }),
  display_order: z.coerce.number().int().nonnegative().optional().default(0),
});

export async function updateGalleryItem(
  id: string,
  _prevState: GalleryItemFormState,
  formData: FormData,
): Promise<GalleryItemFormState> {
  const parsed = galleryItemSchema.safeParse({
    title: formData.get("title"),
    image_url: formData.get("image_url"),
    attachment_url: formData.get("attachment_url") || null,
    category: formData.get("category"),
    display_order: formData.get("display_order") || 0,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Data tidak valid. Periksa kembali form.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("gallery_items").update(parsed.data).eq("id", id);

  if (error) {
    return { success: false, message: `Gagal memperbarui: ${error.message}` };
  }

  revalidatePath("/galeri");
  revalidatePath("/dashboard/galeri");
  redirect("/dashboard/galeri");
}
