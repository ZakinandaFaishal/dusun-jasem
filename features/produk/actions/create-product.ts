"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const productSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  slug: z
    .string()
    .min(1, "Slug wajib diisi")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda hubung"),
  description: z.string().nullable().optional(),
  price: z.coerce.number().nonnegative().nullable().optional(),
  contact_whatsapp: z.string().nullable().optional(),
  image_url: z.string().url("URL foto tidak valid").nullable().optional(),
  is_published: z.boolean().optional().default(true),
  display_order: z.coerce.number().int().nonnegative().optional().default(0),
});

export type ProductFormState = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") || null,
    price: formData.get("price") || null,
    contact_whatsapp: formData.get("contact_whatsapp") || null,
    image_url: formData.get("image_url") || null,
    is_published: formData.get("is_published") === "on",
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
  const { error } = await supabase.from("products").insert(parsed.data);

  if (error) {
    return {
      success: false,
      message: error.message.includes("duplicate")
        ? "Slug sudah dipakai produk lain. Gunakan slug yang berbeda."
        : `Gagal menyimpan: ${error.message}`,
    };
  }

  revalidatePath("/produk");
  revalidatePath("/dashboard/produk");
  redirect("/dashboard/produk");
}
