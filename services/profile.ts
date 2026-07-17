import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { DusunProfile } from "@/types";

const PROFILE_ID = "00000000-0000-0000-0000-000000000001";

export async function getDusunProfile(): Promise<DusunProfile> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("dusun_profile")
    .select("*")
    .eq("id", PROFILE_ID)
    .single();

  if (error) {
    throw new Error(`Gagal mengambil profil dusun: ${error.message}`);
  }

  return data;
}
