"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function deleteFaq(id: string): Promise<{ success: boolean; message: string }> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);

  if (error) {
    return { success: false, message: `Gagal menghapus: ${error.message}` };
  }

  revalidatePath("/faq");
  revalidatePath("/dashboard/faq");

  return { success: true, message: "FAQ berhasil dihapus." };
}
