import {
  createSupabasePublicClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";
import type { NewsPost } from "@/types";

export async function getPublishedNews(): Promise<NewsPost[]> {
  const supabase = createSupabasePublicClient();

  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) {
    throw new Error(`Gagal mengambil data berita: ${error.message}`);
  }

  return data ?? [];
}

export async function getAllNews(): Promise<NewsPost[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Gagal mengambil data berita: ${error.message}`);
  }

  return data ?? [];
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  const supabase = createSupabasePublicClient();

  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal mengambil detail berita: ${error.message}`);
  }

  return data;
}

export async function getNewsById(id: string): Promise<NewsPost | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal mengambil detail berita: ${error.message}`);
  }

  return data;
}
