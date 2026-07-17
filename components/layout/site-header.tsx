import Link from "next/link";
import { Sprout } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/tentang", label: "Tentang" },
  { href: "/struktur-organisasi", label: "Struktur Organisasi" },
  { href: "/potensi-pertanian", label: "Potensi Pertanian" },
  { href: "/produk", label: "Produk" },
  { href: "/berita", label: "Berita" },
  { href: "/galeri", label: "Galeri" },
  { href: "/agenda", label: "Agenda" },
  { href: "/kontak", label: "Kontak" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 md:h-18 lg:px-12 xl:px-16">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <MobileNav links={NAV_LINKS} />

          {/* DITAMBAHKAN: shrink-0 agar logo tidak tergencet */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-white shadow-sm">
              <Sprout className="h-5 w-5" strokeWidth={2.5} />
            </span>

            {/* DITAMBAHKAN: whitespace-nowrap agar teks "Dusun Jasem" tidak terputus jadi dua baris */}
            <span className="whitespace-nowrap font-display text-base font-bold text-foreground sm:text-[1.05rem]">
              Dusun Jasem
            </span>
          </Link>
        </div>

        {/* DIUBAH: md:flex diganti menjadi lg:flex agar di tablet masuk ke MobileNav */}
        <nav className="hidden items-center gap-4 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              // DITAMBAHKAN: whitespace-nowrap agar menu seperti "Struktur Organisasi" tetap 1 baris
              className="whitespace-nowrap text-sm font-medium text-foreground/75 transition-colors hover:text-forest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* DIUBAH: Tombol tetap muncul di tablet (md:block) tapi posisinya dirapikan di kanan */}
        <div className="hidden shrink-0 md:block">
          <Link
            href="/potensi-pertanian"
            className={cn(
              buttonVariants({ size: "sm" }),
              "whitespace-nowrap shadow-sm" // Memastikan teks tombol selalu 1 baris
            )}
          >
            Jelajahi Potensi
          </Link>
        </div>
      </div>
    </header>
  );
}