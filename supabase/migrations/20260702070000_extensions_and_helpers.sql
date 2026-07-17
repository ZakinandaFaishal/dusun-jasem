-- 0001_extensions_and_helpers.sql
-- Ekstensi dasar dan helper function yang dipakai semua tabel.

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Trigger function: otomatis mengisi updated_at setiap kali baris diubah.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'Mengisi kolom updated_at dengan waktu sekarang setiap UPDATE. Dipasang sebagai BEFORE UPDATE trigger di semua tabel konten.';
