-- 0007_news.sql
-- Berita / Kegiatan: CMS sederhana dengan kategori.

create type public.news_category as enum (
  'gotong_royong',
  'panen',
  'pelatihan',
  'kkn',
  'pertanian'
);

create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  cover_image_url text,
  attachment_url text,
  content text not null, -- markdown atau rich text dari editor dashboard
  category public.news_category not null,
  author text not null,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.news_posts is
  'Berita dan kegiatan dusun, dikelola lewat dashboard dan ditampilkan di halaman Berita.';

create index news_posts_slug_idx on public.news_posts (slug);
create index news_posts_published_idx on public.news_posts (is_published, published_at desc);
create index news_posts_category_idx on public.news_posts (category);

create trigger set_updated_at
  before update on public.news_posts
  for each row execute function public.set_updated_at();

alter table public.news_posts enable row level security;

-- Publik hanya boleh baca berita yang sudah dipublish; admin boleh lihat draft.
create policy "news_posts_public_read"
  on public.news_posts for select
  using (is_published = true or public.is_admin());

create policy "news_posts_admin_write"
  on public.news_posts for all
  using (public.is_admin())
  with check (public.is_admin());
