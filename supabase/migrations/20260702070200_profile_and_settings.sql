-- 0003_profile_and_settings.sql
-- "profiles" pada brief = profil resmi Dusun Jasem (bukan profil pengguna),
-- dirancang sebagai tabel singleton (selalu 1 baris) agar mudah dikelola
-- dari satu form "Kelola Profil Dusun" di dashboard.

create table public.dusun_profile (
  id uuid primary key default gen_random_uuid(),
  -- Landing / hero
  name text not null default 'Dusun Jasem',
  tagline text not null default 'Harmoni Alam, Pertanian, dan Kebersamaan',
  hero_image_url text,
  -- Statistik singkat (landing page)
  total_rt integer not null default 0,
  total_penduduk integer not null default 0,
  luas_wilayah_ha numeric(10, 2) not null default 0,
  jumlah_kelompok_tani integer not null default 0,
  komoditas_unggulan text,
  -- Tentang Dusun
  sejarah text,
  visi text,
  misi text,
  letak_geografis text,
  batas_wilayah text,
  kondisi_alam text,
  map_latitude double precision,
  map_longitude double precision,
  -- Kontak
  alamat text,
  telepon_kepala_dukuh text,
  email text,
  whatsapp text,
  jam_pelayanan text,
  instagram_url text,
  facebook_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Memastikan tabel ini hanya pernah punya satu baris.
  constraint dusun_profile_singleton check (id = '00000000-0000-0000-0000-000000000001')
);

comment on table public.dusun_profile is
  'Tabel singleton (1 baris) berisi profil resmi Dusun Jasem: hero, statistik, tentang, dan kontak.';

create trigger set_updated_at
  before update on public.dusun_profile
  for each row execute function public.set_updated_at();

alter table public.dusun_profile enable row level security;

create policy "dusun_profile_public_read"
  on public.dusun_profile for select
  using (true);

create policy "dusun_profile_admin_write"
  on public.dusun_profile for all
  using (public.is_admin())
  with check (public.is_admin());

-- Baris singleton awal, langsung diisi lewat dashboard nanti.
insert into public.dusun_profile (id) values ('00000000-0000-0000-0000-000000000001');

-- "settings" pada brief = konfigurasi situs generik berbentuk key-value,
-- untuk hal-hal yang tidak butuh kolom khusus (mis. feature flags, teks footer).
create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

comment on table public.settings is
  'Konfigurasi situs generik berbentuk key-value (mis. teks footer, feature flag PWA).';

create trigger set_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();

alter table public.settings enable row level security;

create policy "settings_public_read"
  on public.settings for select
  using (true);

create policy "settings_admin_write"
  on public.settings for all
  using (public.is_admin())
  with check (public.is_admin());
