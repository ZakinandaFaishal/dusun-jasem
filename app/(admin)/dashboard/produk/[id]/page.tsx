import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ProductForm } from "@/features/produk/components/product-form";
import { updateProduct } from "@/features/produk/actions/update-product";
import { getProductById } from "@/services/products";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProdukPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const updateProductWithId = updateProduct.bind(null, product.id);

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
        Edit Produk
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{product.name}</p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <ProductForm
          product={product}
          action={updateProductWithId}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
