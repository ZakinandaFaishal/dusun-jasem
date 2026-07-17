-- Tambahan metadata agenda agar admin bisa menandai agenda rutin / akan dilaksanakan
-- dan mengisi tanggalan Jawa secara manual.

alter table public.events
  add column if not exists agenda_type text not null default 'akan_dilaksanakan',
  add column if not exists javanese_date text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_agenda_type_check'
  ) then
    alter table public.events
      add constraint events_agenda_type_check
      check (agenda_type in ('rutin', 'akan_dilaksanakan'));
  end if;
end $$;

comment on column public.events.agenda_type is
  'Jenis agenda: rutin atau akan dilaksanakan.';

comment on column public.events.javanese_date is
  'Tanggalan Jawa yang diisi manual untuk agenda.';