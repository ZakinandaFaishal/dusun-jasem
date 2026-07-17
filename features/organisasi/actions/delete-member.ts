"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function deleteMember(id: string): Promise<{ success: boolean; message: string }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("organization_members").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Gagal menghapus: ${error.message}` };
  }

  revalidatePath("/struktur-organisasi");
  revalidatePath("/dashboard/organisasi");

  return { success: true, message: "Anggota berhasil dihapus." };
}
