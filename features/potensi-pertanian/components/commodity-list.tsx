import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteCommodityButton } from "./delete-commodity-button";
import type { AgricultureCommodity } from "@/types";

export function CommodityTable({ commodities }: { commodities: AgricultureCommodity[] }) {
  if (commodities.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Belum ada komoditas. Klik &quot;Tambah Komoditas&quot; untuk mulai
        mengisi potensi pertanian.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-5 py-3">Nama</th>
            <th className="px-5 py-3">Luas Lahan</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Urutan</th>
            <th className="px-5 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {commodities.map((commodity) => (
            <tr key={commodity.id} className="border-b border-border last:border-0">
              <td className="px-5 py-3 font-medium text-foreground">{commodity.name}</td>
              <td className="px-5 py-3 text-muted-foreground">
                {commodity.land_area_ha !== null ? `${commodity.land_area_ha} Ha` : "-"}
              </td>
              <td className="px-5 py-3">
                <span
                  className={
                    commodity.is_published
                      ? "inline-flex rounded-full bg-forest-light/20 px-2.5 py-1 text-xs font-medium text-forest"
                      : "inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  }
                >
                  {commodity.is_published ? "Tayang" : "Draft"}
                </span>
              </td>
              <td className="px-5 py-3 text-muted-foreground">{commodity.display_order}</td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/dashboard/pertanian/${commodity.id}`}
                    aria-label={`Edit ${commodity.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-forest-light/20 hover:text-forest"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteCommodityButton id={commodity.id} name={commodity.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
