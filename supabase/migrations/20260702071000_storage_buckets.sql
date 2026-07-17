-- 0011_storage_buckets.sql
-- Bucket Supabase Storage untuk semua upload gambar dari dashboard admin.
-- Satu bucket publik "media" dengan folder per fitur, agar URL publik
-- konsisten dan gampang di-serve lewat next/image (lihat next.config.mjs).

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Siapapun boleh membaca (situs publik menampilkan gambar tanpa login).
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');

-- Hanya admin terdaftar yang boleh upload, update, atau hapus file.
create policy "media_admin_insert"
  on storage.objects for insert
  with check (bucket_id = 'media' and public.is_admin());

create policy "media_admin_update"
  on storage.objects for update
  using (bucket_id = 'media' and public.is_admin());

create policy "media_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'media' and public.is_admin());

-- Konvensi folder di dalam bucket "media" (diterapkan di kode upload, bukan DB):
--   media/profil/...        -> hero & foto profil dusun
--   media/organisasi/...    -> foto anggota struktur organisasi
--   media/pertanian/...     -> cover & galeri foto komoditas
--   media/produk/...        -> foto produk unggulan
--   media/berita/...        -> cover berita
--   media/galeri/...        -> galeri umum
