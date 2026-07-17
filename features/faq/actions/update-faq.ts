"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FaqFormState } from "./create-faq";

const faqSchema = z.object({
  question: z.string().min(1, "Pertanyaan wajib diisi"),
  answer: z.string().min(1, "Jawaban wajib diisi"),
  display_order: z.coerce.number().int().nonnegative().optional().default(0),
});

export async function updateFaq(
  id: string,
  _prevState: FaqFormState,
  formData: FormData,
): Promise<FaqFormState> {
  const parsed = faqSchema.safeParse({
    question: formData.get("question"),
    answer: formData.get("answer"),
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
  const { error } = await supabase.from("faqs").update(parsed.data).eq("id", id);

  if (error) {
    return { success: false, message: `Gagal memperbarui: ${error.message}` };
  }

  revalidatePath("/faq");
  revalidatePath("/dashboard/faq");
  redirect("/dashboard/faq");
}
