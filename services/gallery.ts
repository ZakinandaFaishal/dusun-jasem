import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { GalleryItem } from "@/types";

// gallery_items tidak punya kolom is_published (lihat migrasi 0008), semua
// item yang tersimpan otomatis publik — jadi tidak ada fungsi terpisah
// untuk admin vs publik seperti pada agriculture/products.

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(`Gagal mengambil data galeri: ${error.message}`);
  }

  return data ?? [];
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal mengambil detail item galeri: ${error.message}`);
  }

  return data;
}
