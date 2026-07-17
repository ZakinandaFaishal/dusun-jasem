-- 0002_admin_users.sql
-- Menghubungkan auth.users (Supabase Auth) dengan role admin dusun.
-- Tabel ini yang jadi acuan RLS policy untuk menentukan siapa yang boleh
-- menulis/mengubah konten dari dashboard.

create table public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.admin_users is
  'Daftar akun perangkat dusun yang berhak mengelola dashboard admin.';

create trigger set_updated_at
  before update on public.admin_users
  for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;

-- Helper function: cek apakah user yang sedang login adalah admin.
-- SECURITY DEFINER agar bisa dipakai di policy tabel lain tanpa recursive RLS.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users where id = auth.uid()
  );
$$;

comment on function public.is_admin() is
  'True jika pengguna yang sedang login terdaftar di admin_users. Dipakai di RLS policy tabel konten.';

-- Admin hanya bisa melihat baris dirinya sendiri (super_admin bisa lihat semua
-- lewat service role di dashboard jika dibutuhkan pengelolaan akun).
create policy "admin_users_select_own"
  on public.admin_users for select
  using (id = auth.uid());
