import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CommodityForm } from "@/features/potensi-pertanian/components/commodity-form";
import { createCommodity } from "@/features/potensi-pertanian/actions/create-commodity";

export default function TambahKomoditasPage() {
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
        Tambah Komoditas
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Isi data komoditas pertanian beserta foto sawah dan panen.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <CommodityForm action={createCommodity} submitLabel="Simpan Komoditas" />
      </div>
    </div>
  );
}
