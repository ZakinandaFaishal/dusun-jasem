import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { getPublishedCommodities } from "@/services/agriculture";
import { getPublishedNews } from "@/services/news";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/tentang", priority: 0.7, changeFrequency: "monthly" },
  { path: "/struktur-organisasi", priority: 0.5, changeFrequency: "monthly" },
  { path: "/potensi-pertanian", priority: 0.9, changeFrequency: "weekly" },
  { path: "/produk", priority: 0.9, changeFrequency: "weekly" },
  { path: "/berita", priority: 0.8, changeFrequency: "daily" },
  { path: "/galeri", priority: 0.6, changeFrequency: "weekly" },
  { path: "/agenda", priority: 0.6, changeFrequency: "weekly" },
  { path: "/kontak", priority: 0.5, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.4, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [commodities, news] = await Promise.all([
    getPublishedCommodities().catch(() => []),
    getPublishedNews().catch(() => []),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const commodityEntries: MetadataRoute.Sitemap = commodities.map((commodity) => ({
    url: `${SITE_URL}/potensi-pertanian/${commodity.slug}`,
    lastModified: new Date(commodity.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const newsEntries: MetadataRoute.Sitemap = news.map((post) => ({
    url: `${SITE_URL}/berita/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...commodityEntries, ...newsEntries];
}
