"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CommodityFormState } from "./create-commodity";

const commoditySchema = z.object({
  name: z.string().min(1, "Nama komoditas wajib diisi"),
  slug: z
    .string()
    .min(1, "Slug wajib diisi")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  land_area_ha: z.coerce.number().nonnegative().nullable().optional(),
  planting_season: z.string().nullable().optional(),
  harvest_yield: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  cover_image_url: z.string().url("URL foto tidak valid").nullable().optional(),
  is_published: z.boolean().optional().default(true),
  display_order: z.coerce.number().int().nonnegative().optional().default(0),
});

function parsePhotoUrls(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

// Di-bind dengan id lewat updateCommodity.bind(null, commodity.id) di form
// edit, agar tetap kompatibel dengan signature (prevState, formData) yang
// dibutuhkan useActionState.
export async function updateCommodity(
  id: string,
  _prevState: CommodityFormState,
  formData: FormData,
): Promise<CommodityFormState> {
  const parsed = commoditySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    land_area_ha: formData.get("land_area_ha") || null,
    planting_season: formData.get("planting_season") || null,
    harvest_yield: formData.get("harvest_yield") || null,
    description: formData.get("description") || null,
    cover_image_url: formData.get("cover_image_url") || null,
    is_published: formData.get("is_published") === "on",
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
  const { error } = await supabase
    .from("agriculture_commodities")
    .update(parsed.data)
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: error.message.includes("duplicate")
        ? "Slug sudah dipakai komoditas lain. Gunakan slug yang berbeda."
        : `Gagal memperbarui: ${error.message}`,
    };
  }

  // Strategi paling sederhana untuk galeri foto: ganti semua foto lama
  // dengan daftar baru dari textarea, daripada membangun UI tambah/hapus
  // per foto.
  const { error: deletePhotosError } = await supabase
    .from("agriculture_commodity_photos")
    .delete()
    .eq("commodity_id", id);

  if (deletePhotosError) {
    return {
      success: false,
      message: `Data tersimpan, tetapi gagal memperbarui foto: ${deletePhotosError.message}`,
    };
  }

  const photoUrls = parsePhotoUrls(formData.get("photo_urls"));
  if (photoUrls.length > 0) {
    const { error: photoError } = await supabase.from("agriculture_commodity_photos").insert(
      photoUrls.map((image_url, index) => ({
        commodity_id: id,
        image_url,
        display_order: index,
      })),
    );

    if (photoError) {
      return {
        success: false,
        message: `Data tersimpan, tetapi gagal menyimpan foto: ${photoError.message}`,
      };
    }
  }

  revalidatePath("/potensi-pertanian");
  revalidatePath(`/potensi-pertanian/${parsed.data.slug}`);
  revalidatePath("/dashboard/pertanian");
  redirect("/dashboard/pertanian");
}
