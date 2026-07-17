"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const PROFILE_ID = "00000000-0000-0000-0000-000000000001";

// dusun_profile adalah tabel singleton (selalu 1 baris, id tetap), jadi
// action ini hanya "update", tidak ada create/delete.
const profileSchema = z.object({
  name: z.string().min(1, "Nama dusun wajib diisi"),
  tagline: z.string().min(1, "Tagline wajib diisi"),
  hero_image_url: z.string().url("URL foto tidak valid").nullable().optional(),
  total_rt: z.coerce.number().int().nonnegative().optional().default(0),
  total_penduduk: z.coerce.number().int().nonnegative().optional().default(0),
  luas_wilayah_ha: z.coerce.number().nonnegative().optional().default(0),
  jumlah_kelompok_tani: z.coerce.number().int().nonnegative().optional().default(0),
  komoditas_unggulan: z.string().nullable().optional(),
  sejarah: z.string().nullable().optional(),
  visi: z.string().nullable().optional(),
  misi: z.string().nullable().optional(),
  letak_geografis: z.string().nullable().optional(),
  batas_wilayah: z.string().nullable().optional(),
  kondisi_alam: z.string().nullable().optional(),
  map_latitude: z.coerce.number().nullable().optional(),
  map_longitude: z.coerce.number().nullable().optional(),
  alamat: z.string().nullable().optional(),
  telepon_kepala_dukuh: z.string().nullable().optional(),
  email: z.string().email("Email tidak valid").nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  jam_pelayanan: z.string().nullable().optional(),
  instagram_url: z.string().url("URL Instagram tidak valid").nullable().optional(),
  facebook_url: z.string().url("URL Facebook tidak valid").nullable().optional(),
});

export type ProfileFormState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  const raw = Object.fromEntries(formData.entries());

  const parsed = profileSchema.safeParse({
    ...raw,
    hero_image_url: raw.hero_image_url || null,
    komoditas_unggulan: raw.komoditas_unggulan || null,
    sejarah: raw.sejarah || null,
    visi: raw.visi || null,
    misi: raw.misi || null,
    letak_geografis: raw.letak_geografis || null,
    batas_wilayah: raw.batas_wilayah || null,
    kondisi_alam: raw.kondisi_alam || null,
    map_latitude: raw.map_latitude || null,
    map_longitude: raw.map_longitude || null,
    alamat: raw.alamat || null,
    telepon_kepala_dukuh: raw.telepon_kepala_dukuh || null,
    email: raw.email || null,
    whatsapp: raw.whatsapp || null,
    jam_pelayanan: raw.jam_pelayanan || null,
    instagram_url: raw.instagram_url || null,
    facebook_url: raw.facebook_url || null,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Data tidak valid. Periksa kembali form.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("dusun_profile")
    .update(parsed.data)
    .eq("id", PROFILE_ID);

  if (error) {
    return { success: false, message: `Gagal menyimpan: ${error.message}` };
  }

  revalidatePath("/");
  revalidatePath("/tentang");
  revalidatePath("/dashboard/profil");

  return { success: true, message: "Profil dusun berhasil diperbarui." };
}
