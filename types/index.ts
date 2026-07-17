// Tipe domain bersama, diturunkan dari skema di supabase/migrations/.
// Setelah migration dijalankan, generate ulang types/database.types.ts dengan:
//   npx supabase gen types typescript --project-id <PROJECT_ID> > types/database.types.ts
// dan pertimbangkan mengganti tipe manual di bawah ini dengan
// Database["public"]["Tables"][...]["Row"] agar selalu sinkron dengan DB.

export type BaseEntity = {
  id: string; // UUID
  created_at: string;
  updated_at: string;
};

export type DusunProfile = {
  id: string;
  name: string;
  tagline: string;
  hero_image_url: string | null;
  total_rt: number;
  total_penduduk: number;
  luas_wilayah_ha: number;
  jumlah_kelompok_tani: number;
  komoditas_unggulan: string | null;
  sejarah: string | null;
  visi: string | null;
  misi: string | null;
  letak_geografis: string | null;
  batas_wilayah: string | null;
  kondisi_alam: string | null;
  map_latitude: number | null;
  map_longitude: number | null;
  alamat: string | null;
  telepon_kepala_dukuh: string | null;
  email: string | null;
  whatsapp: string | null;
  jam_pelayanan: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  created_at: string;
  updated_at: string;
};

export type OrganizationGroup =
  | "kepala_dukuh"
  | "rt"
  | "karang_taruna"
  | "pkk"
  | "kelompok_tani"
  | "takmir";

export type OrganizationMember = BaseEntity & {
  full_name: string;
  role_title: string;
  group_type: OrganizationGroup;
  photo_url: string | null;
  display_order: number;
};

export type AgricultureCommodity = BaseEntity & {
  name: string;
  slug: string;
  land_area_ha: number | null;
  planting_season: string | null;
  harvest_yield: string | null;
  description: string | null;
  cover_image_url: string | null;
  is_published: boolean;
  display_order: number;
};

export type AgricultureCommodityPhoto = {
  id: string;
  commodity_id: string;
  image_url: string;
  caption: string | null;
  display_order: number;
  created_at: string;
};

export type Product = BaseEntity & {
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  contact_whatsapp: string | null;
  image_url: string | null;
  is_published: boolean;
  display_order: number;
};

export type NewsCategory =
  | "kegiatan_dusun"
  | "panen"
  | "pelatihan"
  | "kkn"
  | "pertanian";

export type NewsPost = BaseEntity & {
  title: string;
  slug: string;
  cover_image_url: string | null;
  attachment_url: string | null;
  content: string;
  category: NewsCategory;
  author: string;
  is_published: boolean;
  published_at: string | null;
};

export type GalleryCategory = "pertanian" | "kegiatan_dusun" | "kkn" | "produk";

export type GalleryItem = BaseEntity & {
  title: string;
  image_url: string;
  attachment_url: string | null;
  category: GalleryCategory;
  display_order: number;
};

export type AgendaEvent = BaseEntity & {
  title: string;
  description: string | null;
  location: string | null;
  agenda_type: "rutin" | "akan_dilaksanakan";
  starts_at: string;
  ends_at: string | null;
  javanese_date: string | null;
};

export type FaqItem = BaseEntity & {
  question: string;
  answer: string;
  display_order: number;
};

export type AdminUser = {
  id: string;
  full_name: string;
  role: "admin" | "super_admin";
  created_at: string;
  updated_at: string;
};

export type SiteSetting = {
  key: string;
  value: unknown;
  updated_at: string;
};
