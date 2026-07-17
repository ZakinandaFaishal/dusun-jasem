import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { OrganizationGroup, OrganizationMember } from "@/types";

// Pola sama dengan services/agriculture.ts: Server Components memanggil
// fungsi ini, bukan menulis query Supabase langsung di komponen.

export async function getOrganizationMembers(): Promise<OrganizationMember[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("organization_members")
    .select("*")
    .order("group_type", { ascending: true })
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(`Gagal mengambil data struktur organisasi: ${error.message}`);
  }

  return data ?? [];
}

export async function getOrganizationMemberById(
  id: string,
): Promise<OrganizationMember | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("organization_members")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal mengambil data anggota: ${error.message}`);
  }

  return data;
}

export async function getOrganizationMembersByGroup(
  group: OrganizationGroup,
): Promise<OrganizationMember[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("organization_members")
    .select("*")
    .eq("group_type", group)
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(`Gagal mengambil anggota kelompok: ${error.message}`);
  }

  return data ?? [];
}
