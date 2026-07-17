-- 0005_agriculture.sql
-- Potensi Pertanian: halaman paling penting di brief. Setiap komoditas
-- (Cabai, Padi, Jagung, Sayuran, Buah, dst.) punya halaman detail sendiri.

create table public.agriculture_commodities (
  id uuid primary key default gen_random_uuid(),
  name text not null, -- mis. "Cabai"
  slug text not null unique,
  land_area_ha numeric(10, 2), -- luas lahan
  planting_season text, -- musim tanam
  harvest_yield text, -- hasil produksi
  description text,
  cover_image_url text,
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.agriculture_commodities is
  'Komoditas pertanian unggulan dusun, satu baris = satu halaman detail komoditas.';

create index agriculture_commodities_slug_idx on public.agriculture_commodities (slug);

create trigger set_updated_at
  before update on public.agriculture_commodities
  for each row execute function public.set_updated_at();

-- Galeri foto per komoditas (foto sawah, foto panen) — one-to-many.
create table public.agriculture_commodity_photos (
  id uuid primary key default gen_random_uuid(),
  commodity_id uuid not null references public.agriculture_commodities (id) on delete cascade,
  image_url text not null,
  caption text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

comment on table public.agriculture_commodity_photos is
  'Foto tambahan (foto sawah, foto panen) untuk satu komoditas pertanian.';

create index agriculture_commodity_photos_commodity_idx
  on public.agriculture_commodity_photos (commodity_id, display_order);

alter table public.agriculture_commodities enable row level security;
alter table public.agriculture_commodity_photos enable row level security;

create policy "agriculture_commodities_public_read"
  on public.agriculture_commodities for select
  using (is_published = true or public.is_admin());

create policy "agriculture_commodities_admin_write"
  on public.agriculture_commodities for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "agriculture_commodity_photos_public_read"
  on public.agriculture_commodity_photos for select
  using (true);

create policy "agriculture_commodity_photos_admin_write"
  on public.agriculture_commodity_photos for all
  using (public.is_admin())
  with check (public.is_admin());
