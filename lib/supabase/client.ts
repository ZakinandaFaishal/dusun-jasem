import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

// Dipakai di Client Components ("use client").
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
