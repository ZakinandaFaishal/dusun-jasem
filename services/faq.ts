import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FaqItem } from "@/types";

export async function getFaqs(): Promise<FaqItem[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(`Gagal mengambil data FAQ: ${error.message}`);
  }

  return data ?? [];
}

export async function getFaqById(id: string): Promise<FaqItem | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal mengambil detail FAQ: ${error.message}`);
  }

  return data;
}
