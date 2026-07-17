-- 0004_organization.sql
-- Struktur Organisasi: Kepala Dukuh, Ketua RT, Karang Taruna, PKK,
-- Kelompok Tani — ditampilkan sebagai card profile.

create type public.organization_group as enum (
  'kepala_dukuh',
  'rt',
  'karang_taruna',
  'pkk',
  'kelompok_tani',
  'takmir'
);

create table public.organization_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role_title text not null, -- mis. "Ketua RT 03", "Sekretaris Karang Taruna"
  group_type public.organization_group not null,
  photo_url text,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.organization_members is
  'Anggota struktur organisasi dusun, dikelompokkan lewat group_type dan diurutkan lewat display_order.';

create index organization_members_group_idx on public.organization_members (group_type, display_order);

create trigger set_updated_at
  before update on public.organization_members
  for each row execute function public.set_updated_at();

alter table public.organization_members enable row level security;

create policy "organization_members_public_read"
  on public.organization_members for select
  using (true);

create policy "organization_members_admin_write"
  on public.organization_members for all
  using (public.is_admin())
  with check (public.is_admin());
