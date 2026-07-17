import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AgendaEvent } from "@/types";

export async function getUpcomingEvents(): Promise<AgendaEvent[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });

  if (error) {
    throw new Error(`Gagal mengambil data agenda: ${error.message}`);
  }

return (data ?? []) as AgendaEvent[];
}

export async function getAllEvents(): Promise<AgendaEvent[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });

  if (error) {
    throw new Error(`Gagal mengambil data agenda: ${error.message}`);
  }

return (data ?? []) as AgendaEvent[];
}

export async function getEventById(id: string): Promise<AgendaEvent | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal mengambil detail agenda: ${error.message}`);
  }

return data as AgendaEvent | null;
}
