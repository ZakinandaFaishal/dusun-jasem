import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getAllProducts } from "@/services/products";
import { ProductTable } from "@/features/produk/components/product-list";

export default async function DashboardProdukPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Kelola Produk Unggulan
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Produk UMKM dan hasil tani warga Dusun Jasem.
          </p>
        </div>
        <Link href="/dashboard/produk/baru" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" />
          Tambah Produk
        </Link>
      </div>

      <div className="mt-6">
        <ProductTable products={products} />
      </div>
    </div>
  );
}
