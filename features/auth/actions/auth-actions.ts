"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type LoginFormState = {
  error: string | null;
};

export async function signInAction(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan kata sandi wajib diisi." };
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Pesan digeneralisasi agar tidak membocorkan apakah email terdaftar.
    return { error: "Email atau kata sandi salah." };
  }

  // Pastikan akun ini benar-benar terdaftar sebagai admin dusun, bukan
  // sekadar akun Supabase Auth mana pun (mis. dibuat lewat sign up publik
  // di masa depan). Tanpa ini, siapa pun yang punya akun Auth valid bisa
  // masuk dashboard meski tak ada di admin_users.
  const { data: adminRecord } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!adminRecord) {
    await supabase.auth.signOut();
    return { error: "Akun ini tidak terdaftar sebagai admin dusun." };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
