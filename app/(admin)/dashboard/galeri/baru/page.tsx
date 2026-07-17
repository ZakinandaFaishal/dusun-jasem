import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { GalleryItemForm } from "@/features/galeri/components/gallery-item-form";
import { createGalleryItem } from "@/features/galeri/actions/create-gallery-item";

export default function TambahFotoGaleriPage() {
  return (
    <div className="max-w-xl">
      <Link
        href="/dashboard/galeri"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest"
      >
        <ChevronLeft className="h-4 w-4" />
        Kembali ke Galeri
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
        Tambah Foto
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tambahkan foto baru ke galeri dusun.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <GalleryItemForm action={createGalleryItem} submitLabel="Simpan Foto" />
      </div>
    </div>
  );
}
