"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { EventFormState } from "./create-event";

const eventSchema = z.object({
  title: z.string().min(1, "Judul kegiatan wajib diisi"),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  agenda_type: z.enum(["rutin", "akan_dilaksanakan"]),
  javanese_date: z.string().nullable().optional(),
  starts_at: z.string().min(1, "Waktu mulai wajib diisi"),
  ends_at: z.string().nullable().optional(),
});

export async function updateEvent(
  id: string,
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || null,
    location: formData.get("location") || null,
    agenda_type: formData.get("agenda_type"),
    javanese_date: formData.get("javanese_date") || null,
    starts_at: formData.get("starts_at"),
    ends_at: formData.get("ends_at") || null,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Data tidak valid. Periksa kembali form.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("events").update(parsed.data).eq("id", id);

  if (error) {
    return { success: false, message: `Gagal memperbarui: ${error.message}` };
  }

  revalidatePath("/agenda");
  revalidatePath("/dashboard/agenda");
  redirect("/dashboard/agenda");
}
