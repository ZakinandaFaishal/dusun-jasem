"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Gagal menghapus: ${error.message}` };
  }

  revalidatePath("/produk");
  revalidatePath("/dashboard/produk");

  return { success: true, message: "Produk berhasil dihapus." };
}
