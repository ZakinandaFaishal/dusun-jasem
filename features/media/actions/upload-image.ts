"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

// Semua upload gambar dashboard admin lewat sini, disimpan di bucket
// publik "media" (lihat migrasi 0011_storage_buckets.sql) dengan folder
// per fitur: media/{folder}/{nama-file-acak}.{ext}. RLS bucket ini hanya
// mengizinkan insert/update/delete oleh admin (public.is_admin()), jadi
// kalau sesi bukan admin, upload akan gagal dengan pesan error dari
// Supabase — bukan lewat pengecekan manual di sini.

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export type UploadImageResult = {
  success: boolean;
  message: string;
  url?: string;
};

export async function uploadImage(formData: FormData): Promise<UploadImageResult> {
  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: "Tidak ada file yang dipilih." };
  }

  if (typeof folder !== "string" || folder.length === 0) {
    return { success: false, message: "Folder tujuan tidak valid." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      message: "Format file harus JPG, PNG, WEBP, atau GIF.",
    };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return { success: false, message: "Ukuran file maksimal 5MB." };
  }

  const supabase = await createSupabaseServerClient();

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const randomName = crypto.randomUUID();
  const path = `${folder}/${randomName}.${extension}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return {
      success: false,
      message: `Gagal mengunggah foto: ${error.message}`,
    };
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);

  return { success: true, message: "Foto berhasil diunggah.", url: data.publicUrl };
}
