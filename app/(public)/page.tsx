import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, MapPinned, Sprout, Users2, Wheat } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TerraceDivider } from "@/components/shared/terrace-divider";
import { StatItem } from "@/components/shared/stat-item";
import { getDusunProfile } from "@/services/profile";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default async function LandingPage() {
  const profile = await getDusunProfile();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative isolate flex min-h-[560px] flex-col justify-center overflow-hidden bg-forest-dark sm:min-h-[80vh] lg:min-h-[600px] xl:min-h-[100vh]">
        <div
          className="absolute inset-0 bg-[url('/images/hero-placeholder.webp')] bg-cover bg-center opacity-80"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/70 to-forest-dark/20" />

        <div className="relative mx-auto flex w-full max-w-screen-2xl flex-col items-start gap-5 px-4 py-12 sm:px-6 sm:py-16 md:px-8 lg:px-12 xl:px-16">
          <div className="flex w-full flex-col items-start gap-4 md:gap-6">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-forest-light sm:text-sm">
              {profile.name}
            </p>

            <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl lg:text-6xl xl:text-[4rem]">
              {profile.tagline}
            </h1>

            <p className="max-w-xl text-left text-sm leading-relaxed text-white/80 sm:text-base md:max-w-2xl md:text-lg md:leading-7 lg:max-w-3xl">
              Media informasi resmi, potensi pertanian, dan produk unggulan
              warga {profile.name} — Kalurahan Srimulyo, Kapanewon Piyungan,
              Kabupaten Bantul.
            </p>

            {/* BUTTONS: Menggunakan flex-wrap agar menyusun rapi tanpa stretch rata kanan-kiri di mobile */}
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/tentang"
                className={cn(
                  buttonVariants({ variant: "light", size: "lg" }),
                  "bg-white text-forest hover:bg-white/90",
                )}
              >
                Tentang Dusun
              </Link>
              <Link
                href="/potensi-pertanian"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-white bg-transparent text-white hover:bg-white hover:text-forest-dark",
                )}
              >
                Potensi Pertanian
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <TerraceDivider className="h-8 w-full text-border" /> */}

      {/* STATISTIK SINGKAT */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
            <StatItem icon={MapPinned} value={String(profile.total_rt)} label="Jumlah RT" />
            <StatItem
              icon={Users}
              value={profile.total_penduduk.toLocaleString("id-ID")}
              label="Jumlah Penduduk"
            />
            <StatItem
              icon={Sprout}
              value={`${profile.luas_wilayah_ha.toLocaleString("id-ID")} Ha`}
              label="Luas Wilayah"
            />
            <StatItem
              icon={Users2}
              value={String(profile.jumlah_kelompok_tani)}
              label="Kelompok Tani"
            />
            <div className="col-span-2 flex justify-center sm:col-span-1 lg:col-span-1">
              <StatItem
                icon={Wheat}
                value={profile.komoditas_unggulan ?? "-"}
                label="Komoditas Unggulan"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TEASER: Potensi Pertanian & Produk Unggulan */}
      <section className="bg-muted/40 py-16 sm:py-24">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-forest sm:text-sm">
              Jelajahi Dusun Jasem
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl">
              Potensi & Produk Unggulan Kami
            </h2>
          </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
            <Link
              href="/potensi-pertanian"
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 transition-shadow hover:shadow-lg"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-light/20 text-forest sm:h-14 sm:w-14">
                  <Sprout className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.25} />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-foreground sm:text-2xl">
                  Potensi Pertanian
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Kenali komoditas unggulan, luas lahan, musim tanam, dan hasil
                  produksi dari setiap kelompok tani di {profile.name}.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest sm:text-base">
                Lihat komoditas
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
              </span>
            </Link>

            <Link
              href="/produk"
              className="group flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8 transition-shadow hover:shadow-lg"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-earth/15 text-earth sm:h-14 sm:w-14">
                  <Users2 className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.25} />
                </span>
                <h2 className="mt-5 font-display text-xl font-bold text-foreground sm:text-2xl">
                  Produk Unggulan
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Jelajahi hasil tani dan produk UMKM warga, lengkap dengan
                  kontak untuk pemesanan langsung.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest sm:text-base">
                Lihat produk
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 sm:h-5 sm:w-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}