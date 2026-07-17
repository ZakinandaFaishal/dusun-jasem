"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = ["application/pdf"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024;

export type UploadFileResult = {
  success: boolean;
  message: string;
  url?: string;
};

export async function uploadFile(formData: FormData): Promise<UploadFileResult> {
  const file = formData.get("file");
  const folder = formData.get("folder");

  if (!(file instanceof File) || file.size === 0) {
    return { success: false, message: "Tidak ada file yang dipilih." };
  }

  if (typeof folder !== "string" || folder.length === 0) {
    return { success: false, message: "Folder tujuan tidak valid." };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { success: false, message: "Format file harus PDF." };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return { success: false, message: "Ukuran file maksimal 10MB." };
  }

  const supabase = await createSupabaseServerClient();
  const extension = file.name.split(".").pop()?.toLowerCase() || "pdf";
  const path = `${folder}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    contentType: file.type,
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    return { success: false, message: `Gagal mengunggah file: ${error.message}` };
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);

  return { success: true, message: "File berhasil diunggah.", url: data.publicUrl };
}