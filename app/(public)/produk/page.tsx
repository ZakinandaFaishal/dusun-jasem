import type { Metadata } from "next";
import Image from "next/image";
import { Package, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ListSearchBar } from "@/components/shared/list-search-bar";
import { PaginationNav } from "@/components/shared/pagination-nav";
import { buttonVariants } from "@/components/ui/button";
import { getPublishedProducts } from "@/services/products";
import { buildWhatsAppLink, formatRupiah } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Produk Unggulan",
  description:
    "Produk UMKM dan hasil tani unggulan warga Dusun Jasem, lengkap dengan kontak pembelian.",
  alternates: { canonical: "/produk" },
  openGraph: { url: "/produk" },
};

type ProdukPageProps = {
  searchParams?: Promise<{
    q?: string;
    page?: string;
  }>;
};

const ITEMS_PER_PAGE = 6;

function normalizeQuery(value: string) {
  return value.trim().toLowerCase();
}

function parsePage(value?: string) {
  const page = Number(value);

  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

export default async function ProdukPage({ searchParams }: ProdukPageProps) {
  const products = await getPublishedProducts();
  const resolvedSearchParams = await searchParams;
  const query = normalizeQuery(resolvedSearchParams?.q ?? "");
  const currentPage = parsePage(resolvedSearchParams?.page);

  const filteredProducts = query
    ? products.filter((product) => {
        return [product.name, product.description ?? "", product.contact_whatsapp ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
    : products;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <PageHeader
        eyebrow="Produk Unggulan"
        title="Produk Unggulan Dusun Jasem"
        description="Hasil UMKM dan hasil tani warga yang bisa langsung dipesan lewat WhatsApp."
      />

      <section className="mx-auto max-w-6xl px-6 py-14">
        <ListSearchBar
          action="/produk"
          placeholder="Cari nama produk atau deskripsinya"
          query={query}
          clearHref="/produk"
          submitLabel="Cari produk"
        />

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Data produk belum ditambahkan. Kelola lewat dashboard admin pada
            menu Kelola Produk.
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Tidak ada produk yang cocok dengan pencarian{query ? ` "${query}"` : ""}.
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="relative h-44 w-full bg-forest-light/20">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-forest">
                        <Package className="h-10 w-10" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div>
                      <h2 className="font-display text-lg font-bold text-foreground">
                        {product.name}
                      </h2>
                      <p className="mt-1 text-sm font-semibold text-forest">
                        {product.price !== null
                          ? formatRupiah(product.price)
                          : "Hubungi kami"}
                      </p>
                    </div>

                    {product.description ? (
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    ) : null}

                    {product.contact_whatsapp ? (
                      <a
                        href={buildWhatsAppLink(
                          product.contact_whatsapp,
                          `Halo, saya tertarik dengan produk "${product.name}" dari Dusun Jasem.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({
                          size: "sm",
                          className: "mt-auto self-start",
                        })}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Pesan via WhatsApp
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <PaginationNav
              basePath="/produk"
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              query={query ? { q: query } : undefined}
            />
          </>
        )}
      </section>
    </>
  );
}
