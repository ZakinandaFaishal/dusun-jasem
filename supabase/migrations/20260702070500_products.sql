-- 0006_products.sql
-- Produk Unggulan: hasil UMKM maupun hasil tani, dengan kontak pembelian.

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price numeric(12, 2), -- opsional, boleh null jika "hubungi kami"
  contact_whatsapp text,
  image_url text,
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.products is
  'Produk unggulan UMKM/hasil tani dusun, ditampilkan di halaman Produk Unggulan.';

create index products_slug_idx on public.products (slug);

create trigger set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

alter table public.products enable row level security;

create policy "products_public_read"
  on public.products for select
  using (is_published = true or public.is_admin());

create policy "products_admin_write"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());
