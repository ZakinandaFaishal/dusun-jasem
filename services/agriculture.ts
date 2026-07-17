import {
  createSupabasePublicClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";
import type { AgricultureCommodity, AgricultureCommodityPhoto } from "@/types";

// Pola "services layer": Server Components memanggil fungsi ini, bukan
// menulis query Supabase langsung di komponen. Memudahkan reuse dan testing.

export async function getPublishedCommodities(): Promise<AgricultureCommodity[]> {
  const supabase = createSupabasePublicClient();

  const { data, error } = await supabase
    .from("agriculture_commodities")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(`Gagal mengambil data komoditas: ${error.message}`);
  }

  return data ?? [];
}

export async function getAllCommodities(): Promise<AgricultureCommodity[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("agriculture_commodities")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(`Gagal mengambil data komoditas: ${error.message}`);
  }

  return data ?? [];
}

export async function getCommodityById(
  id: string,
): Promise<AgricultureCommodity | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("agriculture_commodities")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal mengambil detail komoditas: ${error.message}`);
  }

  return data;
}

export async function getCommodityBySlug(
  slug: string,
): Promise<AgricultureCommodity | null> {
  const supabase = createSupabasePublicClient();

  const { data, error } = await supabase
    .from("agriculture_commodities")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal mengambil detail komoditas: ${error.message}`);
  }

  return data;
}

export async function getCommodityPhotos(
  commodityId: string,
): Promise<AgricultureCommodityPhoto[]> {
  const supabase = createSupabasePublicClient();

  const { data, error } = await supabase
    .from("agriculture_commodity_photos")
    .select("*")
    .eq("commodity_id", commodityId)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(`Gagal mengambil foto komoditas: ${error.message}`);
  }

  return data ?? [];
}
