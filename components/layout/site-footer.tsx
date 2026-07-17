import Link from "next/link";
import { Sprout, Instagram, Facebook, MapPin } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/tentang", label: "Tentang Dusun" },
  { href: "/struktur-organisasi", label: "Struktur Organisasi" },
  { href: "/potensi-pertanian", label: "Potensi Pertanian" },
  { href: "/produk", label: "Produk Unggulan" },
  { href: "/berita", label: "Berita" },
  { href: "/agenda", label: "Agenda" },
  { href: "/faq", label: "FAQ" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-forest-dark text-white">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-12 lg:py-16 xl:px-16">
        <div className="flex flex-col gap-3 lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 shadow-sm">
              <Sprout className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-base font-bold sm:text-lg">Dusun Jasem</span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/70">
            Kalurahan Srimulyo, Kapanewon Piyungan, Kabupaten Bantul, Daerah
            Istimewa Yogyakarta.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram Dusun Jasem"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Facebook Dusun Jasem"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/60">
            Jelajahi
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-white/60">
            Kontak
          </p>
          <div className="mt-4 flex items-start gap-2 text-sm leading-6 text-white/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Dusun Jasem, Srimulyo, Piyungan, Bantul, DIY</span>
          </div>
          <Link
            href="/kontak"
            className="mt-3 inline-block text-sm font-semibold text-forest-light hover:underline"
          >
            Lihat kontak lengkap →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="text-center text-xs text-white/60">
          © {new Date().getFullYear()} Dusun Jasem. Dikelola oleh perangkat
          dusun bersama Tim KKN.
        </p>
      </div>
    </footer>
  );
}
