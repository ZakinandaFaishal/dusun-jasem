"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MemberFormState } from "./create-member";

const memberSchema = z.object({
  full_name: z.string().min(1, "Nama lengkap wajib diisi"),
  role_title: z.string().min(1, "Jabatan wajib diisi"),
  group_type: z.enum(
    ["kepala_dukuh", "rt", "karang_taruna", "pkk", "kelompok_tani", "takmir"],
    { message: "Kelompok wajib dipilih" },
  ),
  photo_url: z.string().url("URL foto tidak valid").nullable().optional(),
  display_order: z.coerce.number().int().nonnegative().optional().default(0),
});

// Di-bind dengan id lewat updateMember.bind(null, member.id) di form edit,
// agar tetap kompatibel dengan signature (prevState, formData) yang
// dibutuhkan useActionState.
export async function updateMember(
  id: string,
  _prevState: MemberFormState,
  formData: FormData,
): Promise<MemberFormState> {
  const parsed = memberSchema.safeParse({
    full_name: formData.get("full_name"),
    role_title: formData.get("role_title"),
    group_type: formData.get("group_type"),
    photo_url: formData.get("photo_url") || null,
    display_order: formData.get("display_order") || 0,
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
    .from("organization_members")
    .update(parsed.data)
    .eq("id", id);

  if (error) {
    return {
      success: false,
      message: `Gagal memperbarui: ${error.message}`,
    };
  }

  revalidatePath("/struktur-organisasi");
  revalidatePath("/dashboard/organisasi");
  redirect("/dashboard/organisasi");
}
