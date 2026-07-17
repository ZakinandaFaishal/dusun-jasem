-- seed.sql
-- Data contoh untuk development lokal (jalankan via `npx supabase db reset`
-- atau `psql < supabase/seed/seed.sql`). Jangan dijalankan di production.

update public.dusun_profile
set
  total_rt = 5,
  total_penduduk = 1240,
  luas_wilayah_ha = 85.4,
  jumlah_kelompok_tani = 4,
  komoditas_unggulan = 'Cabai, Padi, Jagung',
  sejarah = 'Diisi oleh perangkat dusun melalui dashboard admin.',
  visi = 'Diisi oleh perangkat dusun melalui dashboard admin.',
  misi = 'Diisi oleh perangkat dusun melalui dashboard admin.',
  letak_geografis = 'Kalurahan Srimulyo, Kapanewon Piyungan, Kabupaten Bantul, DIY.'
where id = '00000000-0000-0000-0000-000000000001';

insert into public.agriculture_commodities (name, slug, land_area_ha, planting_season, harvest_yield, description)
values
  ('Cabai', 'cabai', 12.5, 'Musim Kemarau (Apr–Sep)', '± 8 ton/ha per musim', 'Komoditas unggulan utama Dusun Jasem.'),
  ('Padi', 'padi', 30.0, 'Musim Hujan (Okt–Mar)', '± 6 ton/ha per musim', 'Ditanam di sawah irigasi teknis.'),
  ('Jagung', 'jagung', 8.0, 'Sepanjang tahun (tumpang sari)', '± 5 ton/ha per musim', 'Ditanam sebagai tumpang sari dengan cabai.');

insert into public.products (name, slug, description, contact_whatsapp)
values
  ('Cabai Rawit Segar', 'cabai-rawit-segar', 'Hasil panen langsung dari kelompok tani Dusun Jasem.', '6281234567890'),
  ('Keripik Singkong', 'keripik-singkong', 'Produk UMKM olahan warga Dusun Jasem.', '6281234567891');

insert into public.faqs (question, answer, display_order)
values
  ('Bagaimana cara membeli produk dari Dusun Jasem?', 'Hubungi kontak WhatsApp yang tertera di setiap halaman produk.', 1),
  ('Apakah website ini dikelola resmi oleh perangkat dusun?', 'Ya, dashboard admin dikelola oleh perangkat Dusun Jasem setelah program KKN selesai.', 2);
