import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sprout, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { PaginationNav } from "@/components/shared/pagination-nav";
import { getPublishedCommodities } from "@/services/agriculture";

export const metadata: Metadata = {
  title: "Potensi Pertanian",
  description:
    "Komoditas pertanian unggulan Dusun Jasem: luas lahan, musim tanam, dan hasil produksi.",
  alternates: { canonical: "/potensi-pertanian" },
  openGraph: { url: "/potensi-pertanian" },
};

type Props = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

const ITEMS_PER_PAGE = 6;

function parsePage(value?: string) {
  const page = Number(value);

  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

export default async function PotensiPertanianPage({ searchParams }: Props) {
  const commodities = await getPublishedCommodities();
  const resolvedSearchParams = await searchParams;
  const currentPage = parsePage(resolvedSearchParams?.page);
  const totalPages = Math.max(1, Math.ceil(commodities.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedCommodities = commodities.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <PageHeader
        eyebrow="Potensi Pertanian"
        title="Potensi Pertanian Dusun Jasem"
        description="Komoditas unggulan yang menopang perekonomian warga, dikelola oleh kelompok tani setempat."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
        {commodities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Data komoditas belum ditambahkan. Kelola lewat dashboard admin
            pada menu Kelola Potensi Pertanian.
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedCommodities.map((commodity) => (
                <Link
                  key={commodity.id}
                  href={`/potensi-pertanian/${commodity.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="relative h-44 w-full bg-forest-light/20">
                    {commodity.cover_image_url ? (
                      <Image
                        src={commodity.cover_image_url}
                        alt={commodity.name}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-forest">
                        <Sprout className="h-10 w-10" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h2 className="font-display text-lg font-bold text-foreground">
                      {commodity.name}
                    </h2>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {commodity.land_area_ha !== null ? (
                        <>
                          <dt className="font-medium text-foreground/70">Luas lahan</dt>
                          <dd>{commodity.land_area_ha} Ha</dd>
                        </>
                      ) : null}
                      {commodity.planting_season ? (
                        <>
                          <dt className="font-medium text-foreground/70">Musim tanam</dt>
                          <dd>{commodity.planting_season}</dd>
                        </>
                      ) : null}
                    </dl>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-forest">
                      Lihat detail
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <PaginationNav
              basePath="/potensi-pertanian"
              currentPage={safeCurrentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </section>
    </>
  );
}
