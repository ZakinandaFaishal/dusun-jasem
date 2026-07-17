"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, X, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  links: {
    href: string;
    label: string;
  }[];
};

export function MobileNav({ links }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tutup drawer dengan tombol ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const drawerContent = (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[99] bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[100] flex h-[100dvh] w-72 max-w-[85vw] flex-col border-r border-border bg-background shadow-2xl transition-transform duration-300 ease-in-out md:hidden overscroll-none",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-white shadow-sm">
              <Sprout className="h-5 w-5" strokeWidth={2.5} />
            </span>

            <div>
              <p className="font-display font-bold text-foreground">Dusun Jasem</p>
              <p className="text-xs text-muted-foreground">Menu navigasi</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu"
            className="rounded-lg p-2 transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain p-4">
          <div className="space-y-1.5">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center rounded-2xl px-4 py-3.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-forest text-white"
                      : "text-foreground/80 hover:bg-forest-light/20 hover:text-forest"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0 border-t border-border p-5">
          <Link
            href="/potensi-pertanian"
            onClick={() => setOpen(false)}
            className="flex h-11 items-center justify-center rounded-2xl bg-forest font-medium text-white transition-colors hover:bg-forest-dark"
          >
            Jelajahi Potensi
          </Link>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buka menu navigasi"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted md:hidden lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {mounted && createPortal(drawerContent, document.body)}
    </>
  );
}