import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteProductButton } from "./delete-product-button";
import { formatRupiah } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductTable({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Belum ada produk. Klik &quot;Tambah Produk&quot; untuk mulai mengisi
        produk unggulan.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-5 py-3">Nama</th>
            <th className="px-5 py-3">Harga</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Urutan</th>
            <th className="px-5 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-border last:border-0">
              <td className="px-5 py-3 font-medium text-foreground">{product.name}</td>
              <td className="px-5 py-3 text-muted-foreground">
                {product.price !== null ? formatRupiah(product.price) : "Hubungi kami"}
              </td>
              <td className="px-5 py-3">
                <span
                  className={
                    product.is_published
                      ? "inline-flex rounded-full bg-forest-light/20 px-2.5 py-1 text-xs font-medium text-forest"
                      : "inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  }
                >
                  {product.is_published ? "Tayang" : "Draft"}
                </span>
              </td>
              <td className="px-5 py-3 text-muted-foreground">{product.display_order}</td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/dashboard/produk/${product.id}`}
                    aria-label={`Edit ${product.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-forest-light/20 hover:text-forest"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteProductButton id={product.id} name={product.name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
