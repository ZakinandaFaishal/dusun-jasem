"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  Sprout,
  Newspaper,
  Image as ImageIcon,
  CalendarDays,
  Settings,
  HelpCircle,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOutAction } from "@/features/auth/actions/auth-actions";

const ACTIVE_LINKS = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/dashboard/berita", label: "Berita / Kegiatan", icon: Newspaper },
  { href: "/dashboard/produk", label: "Produk Unggulan", icon: Package },
  { href: "/dashboard/pertanian", label: "Potensi Pertanian", icon: Sprout },
  { href: "/dashboard/galeri", label: "Galeri", icon: ImageIcon },
  { href: "/dashboard/agenda", label: "Agenda", icon: CalendarDays },
  { href: "/dashboard/organisasi", label: "Struktur Organisasi", icon: Users },
  { href: "/dashboard/faq", label: "FAQ", icon: HelpCircle },
  { href: "/dashboard/profil", label: "Profil Dusun", icon: Settings },
];

// Breakpoint tunggal (lg = 1024px) yang jadi acuan: di bawahnya (HP & tablet)
// sidebar berubah jadi drawer yang dipicu hamburger; di atasnya (desktop)
// sidebar statis seperti semula. Konsisten dengan breakpoint yang sudah
// dipakai di SiteHeader publik.

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Kunci scroll body selagi drawer terbuka di layar kecil, dan pastikan
  // drawer otomatis tertutup kalau viewport di-resize ke ukuran desktop.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Top bar mobile & tablet — pengganti sidebar statis di bawah breakpoint lg */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-4 sm:px-6 lg:hidden">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-white">
            <Sprout className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-display text-sm font-bold text-foreground">
            Dusun Jasem
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Buka menu navigasi"
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-forest-light/20 hover:text-forest"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Backdrop — hanya muncul saat drawer terbuka, di bawah breakpoint lg */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar: drawer yang digeser dari kiri di HP/tablet, statis di desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-border bg-card transition-transform duration-200 ease-in-out lg:static lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 lg:shrink-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-white">
              <Sprout className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="font-display text-sm font-bold text-foreground">
              Dusun Jasem
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Tutup menu navigasi"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/60 transition-colors hover:bg-forest-light/20 hover:text-forest lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {ACTIVE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-forest-light/20 hover:text-forest"
            >
              <link.icon className="h-4 w-4 shrink-0" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="shrink-0 border-t border-border p-4">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-forest"
          >
            <ExternalLink className="h-4 w-4" />
            Lihat Website
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
