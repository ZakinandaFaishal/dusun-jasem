"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, FileText, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GalleryCategory, GalleryItem } from "@/types";

const CATEGORY_FILTERS: { value: GalleryCategory | "semua"; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "pertanian", label: "Pertanian" },
  { value: "kegiatan_dusun", label: "Kegiatan Dusun" },
  { value: "kkn", label: "KKN" },
  { value: "produk", label: "Produk" },
];

const ITEMS_PER_PAGE = 8;

export function GalleryBrowser({ items }: { items: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "semua">("semua");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (activeCategory === "semua") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedItems = filteredItems.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATEGORY_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => {
              setActiveCategory(filter.value);
              setCurrentPage(1);
            }}
            className={
              activeCategory === filter.value
                ? "rounded-full bg-forest px-4 py-1.5 text-sm font-medium text-white"
                : "rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-forest hover:text-forest"
            }
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Belum ada foto untuk kategori ini.
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {paginatedItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxItem(item)}
                className="group relative aspect-square overflow-x-auto rounded-2xl bg-forest-light/20"
              >
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <div className="flex items-end justify-between gap-2">
                    <p className="truncate text-left text-sm font-medium text-white">
                      {item.title}
                    </p>
                    {item.attachment_url ? (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white">
                        <FileText className="h-3 w-3" />
                        Lampiran
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={safeCurrentPage === 1}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-lg px-3",
                safeCurrentPage === 1 && "pointer-events-none opacity-50",
              )}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Sebelumnya
            </button>

            <div className="flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={cn(
                    buttonVariants({
                      variant: safeCurrentPage === pageNumber ? "default" : "outline",
                      size: "sm",
                    }),
                    "min-w-10 rounded-lg px-3",
                    safeCurrentPage === pageNumber && "bg-forest text-white hover:bg-forest/90",
                  )}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={safeCurrentPage === totalPages}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-lg px-3",
                safeCurrentPage === totalPages && "pointer-events-none opacity-50",
              )}
            >
              Berikutnya
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </nav>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Halaman {safeCurrentPage} dari {totalPages}
          </p>
        </>
      )}

      {lightboxItem ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
        >
          <button
            type="button"
            onClick={() => setLightboxItem(null)}
            aria-label="Tutup"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            onClick={(event) => event.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-3xl flex-col items-center"
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={lightboxItem.image_url}
                alt={lightboxItem.title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-white">
              {lightboxItem.title}
            </p>
            {lightboxItem.attachment_url ? (
              <a
                href={lightboxItem.attachment_url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-forest transition-colors hover:bg-white/90"
              >
                <ExternalLink className="h-4 w-4" />
                Buka Lampiran
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
