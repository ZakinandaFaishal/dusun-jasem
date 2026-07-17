import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getGalleryItems } from "@/services/gallery";
import { GalleryItemGrid } from "@/features/galeri/components/gallery-item-grid";

export default async function DashboardGaleriPage() {
  const items = await getGalleryItems();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Kelola Galeri
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Foto pertanian, kegiatan dusun, KKN, dan produk.
          </p>
        </div>
        <Link href="/dashboard/galeri/baru" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" />
          Tambah Foto
        </Link>
      </div>

      <div className="mt-6">
        <GalleryItemGrid items={items} />
      </div>
    </div>
  );
}
