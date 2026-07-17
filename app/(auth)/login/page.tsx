import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Sprout } from "lucide-react";
import { LoginForm } from "@/features/auth/components/login-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Masuk Dashboard Admin",
};

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-white">
          <Sprout className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <h1 className="mt-4 font-display text-xl font-bold text-foreground">
          Masuk Dashboard Admin
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Khusus perangkat Dusun Jasem yang mengelola konten website.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
