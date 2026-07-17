# Website Dusun Jasem

Website profil Dusun Jasem, Kalurahan Srimulyo, Kapanewon Piyungan,
Kabupaten Bantul, DIY — dibangun sebagai bagian dari program KKN.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui + Lucide React
- Framer Motion
- Supabase (PostgreSQL, Auth, Storage)
- Deploy: Vercel

## Struktur Folder

```
app/
  (public)/          → Halaman publik (landing, tentang, potensi-pertanian,
                        produk, berita, galeri, agenda, kontak, faq)
  (admin)/            → Dashboard admin, dilindungi Supabase Auth
    dashboard/
  (auth)/login/       → Halaman login (di luar proteksi (admin))
  api/                → Route handlers (mis. revalidate on-demand)

components/
  ui/                 → Komponen dasar shadcn/ui (button, card, dst.)
  layout/             → Header, footer, navigasi
  shared/             → Komponen lintas fitur (gambar, badge, dll.)

features/             → Modul per domain, masing-masing dengan
                         components/ dan actions/ sendiri:
  potensi-pertanian/
  produk/
  berita/
  galeri/
  agenda/
  organisasi/
  dashboard/

hooks/                → Custom React hooks
lib/
  supabase/           → client.ts (browser), server.ts (RSC/Server Actions),
                         middleware.ts (refresh sesi)
  utils.ts            → helper cn() untuk shadcn/ui
services/             → Fungsi pengambilan data (query layer), dipanggil
                         dari Server Components / Server Actions
types/                → Tipe domain + database.types.ts (digenerate Supabase)
utils/                → Helper murni (format tanggal, angka, dll.)
actions/              → Server Actions global (jika tak spesifik per fitur)
supabase/
  migrations/         → SQL migration untuk skema database
  seed/               → Data awal (opsional)
```

## Menjalankan Secara Lokal

1. Install dependencies:
   ```bash
   npm install
   ```
2. Salin `.env.example` menjadi `.env.local` dan isi kredensial Supabase:
   ```bash
   cp .env.example .env.local
   ```
3. Jalankan development server:
   ```bash
   npm run dev
   ```
4. Buka http://localhost:3000

## Database Supabase

Skema lengkap ada di `supabase/migrations/` (dijalankan berurutan sesuai
nama file). Tabel yang dibuat:

| Tabel | Kegunaan |
|---|---|
| `admin_users` | Akun perangkat dusun yang boleh mengelola dashboard |
| `dusun_profile` | Profil dusun (singleton): hero, statistik, tentang, kontak |
| `settings` | Konfigurasi situs generik (key-value) |
| `organization_members` | Struktur organisasi (Kepala Dukuh, RT, Karang Taruna, PKK, Kelompok Tani) |
| `agriculture_commodities` + `agriculture_commodity_photos` | Potensi pertanian & foto per komoditas |
| `products` | Produk unggulan / UMKM |
| `news_posts` | Berita & kegiatan (CMS) |
| `gallery_items` | Galeri foto dengan kategori |
| `events` | Agenda kegiatan dusun |
| `faqs` | Pertanyaan umum |

Semua tabel memakai **Row Level Security**: publik bisa membaca konten yang
sudah dipublish, hanya akun yang terdaftar di `admin_users` yang bisa
menulis (lewat helper function `public.is_admin()`). Upload gambar memakai
satu bucket Storage publik bernama `media`.

### Menjalankan migration

```bash
# via Supabase CLI, setelah `supabase link --project-ref <PROJECT_ID>`
npx supabase db push

# atau untuk development lokal dengan Docker
npx supabase start
npx supabase db reset   # menjalankan migration + seed.sql otomatis
```

Setelah migration jalan, generate ulang tipe TypeScript:

```bash
npx supabase gen types typescript --project-id <PROJECT_ID> > types/database.types.ts
```

### Membuat akun admin pertama

Buat user lewat Supabase Auth (dashboard atau `supabase.auth.admin.createUser`),
lalu insert manual ke `admin_users`:

```sql
insert into public.admin_users (id, full_name, role)
values ('<auth-user-uuid>', 'Nama Perangkat Dusun', 'super_admin');
```

### Alur Login Admin

- `/login` — form email + kata sandi (`features/auth/components/login-form.tsx`),
  submit lewat Server Action `signInAction`
- `signInAction` memanggil `supabase.auth.signInWithPassword`, lalu memverifikasi
  user tersebut memang terdaftar di `admin_users` (bukan sekadar punya akun
  Supabase Auth) sebelum redirect ke `/dashboard`
- Tombol **Keluar** di sidebar dashboard memanggil `signOutAction`
- User yang sudah login otomatis di-redirect keluar dari `/login` ke `/dashboard`
- `enable_signup = false` di `supabase/config.toml` — sengaja tidak ada
  pendaftaran akun mandiri; akun admin hanya dibuat manual oleh super_admin

## Frontend yang Sudah Dibangun

- `components/ui/button.tsx`, `card.tsx` — komponen dasar bergaya shadcn/ui
  (varian `default`/`outline`/`ghost`/`light`, warna dari token forest/earth)
- `components/layout/site-header.tsx`, `site-footer.tsx` — navigasi & footer
  publik
- `components/shared/terrace-divider.tsx` — elemen signature: garis kontur
  ala terasering sawah sebagai pembatas antar-section
- `components/shared/stat-item.tsx` — kartu statistik untuk landing page
- `components/shared/page-header.tsx` — header halaman internal (breadcrumb +
  judul), dipakai konsisten di semua halaman selain landing
- `app/(public)/page.tsx` — landing page: hero, statistik, teaser
- `app/(public)/tentang/page.tsx` — sejarah, visi-misi, geografis, dan peta
  lokasi (Google Maps embed dari koordinat `dusun_profile`)
- `app/(public)/potensi-pertanian/page.tsx` — grid komoditas pertanian
- `app/(public)/potensi-pertanian/[slug]/page.tsx` — detail komoditas: cover,
  statistik (luas lahan/musim tanam/hasil produksi), deskripsi, galeri foto;
  memakai `generateStaticParams` untuk prerendering statis

Halaman lain (Struktur Organisasi, Produk, Berita, Galeri, Agenda, Kontak,
FAQ, Dashboard Admin) masih placeholder kosong dan mengikuti pola yang sama:
service function di `services/`, komponen di `features/<nama-fitur>/components/`.

## SEO

- `app/sitemap.ts` — sitemap dinamis (`/sitemap.xml`), menggabungkan rute
  statis dengan slug komoditas pertanian dan berita dari database
- `app/robots.ts` — `/robots.txt`, men-disallow `/dashboard`, `/login`, `/api/`
- `lib/site-config.ts` — konstanta `SITE_URL`/`SITE_NAME` dipakai di seluruh
  metadata agar konsisten dan gampang diubah lewat `NEXT_PUBLIC_SITE_URL`
- `app/layout.tsx` — `metadataBase`, Open Graph & Twitter Card default,
  JSON-LD `GovernmentOrganization` untuk pencarian lokal
- Setiap halaman publik punya `alternates.canonical` dan `openGraph.url`
  masing-masing; dua halaman detail (`/potensi-pertanian/[slug]` dan
  `/berita/[slug]`) juga punya JSON-LD (`Product`, `NewsArticle`) dan
  Open Graph image dinamis dari cover/foto masing-masing

## Tahap Selanjutnya

1. ~~Perancangan database Supabase~~ selesai
2. ~~Landing page, Tentang Dusun, Potensi Pertanian~~ selesai
3. ~~Autentikasi login admin~~ selesai — lihat bagian "Alur Login Admin"
4. ~~SEO (sitemap, robots.txt, JSON-LD, canonical, Open Graph)~~ selesai
5. Fitur kosmetik tersisa: search berita/produk, PWA, dukungan multi-bahasa
6. Deployment ke Vercel: hubungkan repo, isi environment variables sesuai
   `.env.example`, set `NEXT_PUBLIC_SITE_URL` ke domain final agar
   sitemap/canonical/Open Graph mengarah ke URL produksi, bukan localhost

**Catatan:** hero landing page mereferensikan `/public/images/hero-placeholder.jpg`
yang belum ada — tambahkan foto aerial Dusun Jasem di sana (lihat
`public/images/README.txt`).

## Setelah KKN Selesai

Dashboard admin (`/dashboard`) memungkinkan perangkat Dusun Jasem
mengelola berita, produk, potensi pertanian, galeri, agenda, struktur
organisasi, dan profil dusun tanpa perlu menyentuh kode.
