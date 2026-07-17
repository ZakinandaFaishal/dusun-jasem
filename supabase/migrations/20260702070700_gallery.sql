-- 0008_gallery.sql
-- Galeri: grid gallery dengan kategori dan lightbox.

create type public.gallery_category as enum (
  'pertanian',
  'kegiatan_dusun',
  'kkn',
  'produk'
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  attachment_url text,
  category public.gallery_category not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.gallery_items is
  'Item galeri foto dusun, difilter berdasarkan category di halaman Galeri.';

create index gallery_items_category_idx on public.gallery_items (category, display_order);

create trigger set_updated_at
  before update on public.gallery_items
  for each row execute function public.set_updated_at();

alter table public.gallery_items enable row level security;

create policy "gallery_items_public_read"
  on public.gallery_items for select
  using (true);

create policy "gallery_items_admin_write"
  on public.gallery_items for all
  using (public.is_admin())
  with check (public.is_admin());
