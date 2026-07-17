"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function deleteCommodity(
  id: string,
): Promise<{ success: boolean; message: string }> {
  const supabase = await createSupabaseServerClient();

  // agriculture_commodity_photos punya "on delete cascade" ke kolom ini,
  // jadi foto terkait ikut terhapus otomatis oleh database.
  const { error } = await supabase.from("agriculture_commodities").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Gagal menghapus: ${error.message}` };
  }

  revalidatePath("/potensi-pertanian");
  revalidatePath("/dashboard/pertanian");

  return { success: true, message: "Komoditas berhasil dihapus." };
}
