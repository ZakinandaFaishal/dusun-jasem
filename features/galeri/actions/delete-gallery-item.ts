"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function deleteGalleryItem(
  id: string,
): Promise<{ success: boolean; message: string }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Gagal menghapus: ${error.message}` };
  }

  revalidatePath("/galeri");
  revalidatePath("/dashboard/galeri");

  return { success: true, message: "Item galeri berhasil dihapus." };
}
