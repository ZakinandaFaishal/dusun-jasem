-- 0009_events.sql
-- Agenda: jadwal kegiatan dusun (pengajian, kerja bakti, musyawarah, dst.)

create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.events is
  'Agenda kegiatan dusun yang akan datang, ditampilkan terurut berdasarkan starts_at.';

create index events_starts_at_idx on public.events (starts_at);

create trigger set_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

alter table public.events enable row level security;

create policy "events_public_read"
  on public.events for select
  using (true);

create policy "events_admin_write"
  on public.events for all
  using (public.is_admin())
  with check (public.is_admin());
