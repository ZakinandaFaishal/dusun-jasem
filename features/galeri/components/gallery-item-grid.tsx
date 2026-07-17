import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { DeleteGalleryItemButton } from "./delete-gallery-item-button";
import type { GalleryCategory, GalleryItem } from "@/types";

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  pertanian: "Pertanian",
  kegiatan_dusun: "Kegiatan Dusun",
  kkn: "KKN",
  produk: "Produk",
};

export function GalleryItemGrid({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Belum ada foto. Klik &quot;Tambah Foto&quot; untuk mulai mengisi
        galeri.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.id} className="group relative overflow-x-auto rounded-2xl border border-border">
          <div className="relative aspect-square bg-forest-light/20">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          </div>

          <div className="absolute right-2 top-2 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Link
              href={`/dashboard/galeri/${item.id}`}
              aria-label={`Edit ${item.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-muted-foreground shadow-sm transition-colors hover:bg-forest-light/20 hover:text-forest"
            >
              <Pencil className="h-4 w-4" />
            </Link>
            <DeleteGalleryItemButton id={item.id} title={item.title} />
          </div>

          <div className="p-3">
            <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
            <p className="text-xs text-muted-foreground">
              {CATEGORY_LABELS[item.category]} · Urutan {item.display_order}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
