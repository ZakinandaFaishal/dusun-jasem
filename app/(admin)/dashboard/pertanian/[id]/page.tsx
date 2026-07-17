import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { CommodityForm } from "@/features/potensi-pertanian/components/commodity-form";
import { updateCommodity } from "@/features/potensi-pertanian/actions/update-commodity";
import { getCommodityById, getCommodityPhotos } from "@/services/agriculture";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditKomoditasPage({ params }: Props) {
  const { id } = await params;
  const commodity = await getCommodityById(id);

  if (!commodity) {
    notFound();
  }

  const photos = await getCommodityPhotos(commodity.id);
  const updateCommodityWithId = updateCommodity.bind(null, commodity.id);

  return (
    <div className="max-w-xl">
      <Link
        href="/dashboard/pertanian"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest"
      >
        <ChevronLeft className="h-4 w-4" />
        Kembali ke Potensi Pertanian
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
        Edit Komoditas
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{commodity.name}</p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <CommodityForm
          commodity={commodity}
          photos={photos}
          action={updateCommodityWithId}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
