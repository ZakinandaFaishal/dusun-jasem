import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProductForm } from "@/features/produk/components/product-form";
import { createProduct } from "@/features/produk/actions/create-product";

export default function TambahProdukPage() {
  return (
    <div className="max-w-xl">
      <Link
        href="/dashboard/produk"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest"
      >
        <ChevronLeft className="h-4 w-4" />
        Kembali ke Produk Unggulan
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
        Tambah Produk
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Isi data produk UMKM atau hasil tani.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <ProductForm action={createProduct} submitLabel="Simpan Produk" />
      </div>
    </div>
  );
}
