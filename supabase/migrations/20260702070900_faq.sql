-- 0010_faq.sql
-- FAQ: pertanyaan umum mengenai dusun.

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.faqs is
  'Pertanyaan umum (FAQ) mengenai dusun, diurutkan lewat display_order.';

create index faqs_display_order_idx on public.faqs (display_order);

create trigger set_updated_at
  before update on public.faqs
  for each row execute function public.set_updated_at();

alter table public.faqs enable row level security;

create policy "faqs_public_read"
  on public.faqs for select
  using (true);

create policy "faqs_admin_write"
  on public.faqs for all
  using (public.is_admin())
  with check (public.is_admin());
