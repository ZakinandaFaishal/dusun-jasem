import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getAllCommodities } from "@/services/agriculture";
import { CommodityTable } from "@/features/potensi-pertanian/components/commodity-list";

export default async function DashboardPertanianPage() {
  const commodities = await getAllCommodities();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Kelola Potensi Pertanian
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Komoditas unggulan beserta luas lahan, musim tanam, dan hasil
            produksi.
          </p>
        </div>
        <Link href="/dashboard/pertanian/baru" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" />
          Tambah Komoditas
        </Link>
      </div>

      <div className="mt-6">
        <CommodityTable commodities={commodities} />
      </div>
    </div>
  );
}
