import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { GalleryItemForm } from "@/features/galeri/components/gallery-item-form";
import { updateGalleryItem } from "@/features/galeri/actions/update-gallery-item";
import { getGalleryItemById } from "@/services/gallery";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditFotoGaleriPage({ params }: Props) {
  const { id } = await params;
  const item = await getGalleryItemById(id);

  if (!item) {
    notFound();
  }

  const updateGalleryItemWithId = updateGalleryItem.bind(null, item.id);

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
        Edit Foto
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{item.title}</p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <GalleryItemForm
          item={item}
          action={updateGalleryItemWithId}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
