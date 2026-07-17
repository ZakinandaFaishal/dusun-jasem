import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Ruler, CalendarRange, Wheat, Sprout } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { getCommodityBySlug, getCommodityPhotos, getPublishedCommodities } from "@/services/agriculture";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const commodities = await getPublishedCommodities();
  return commodities.map((commodity) => ({ slug: commodity.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const commodity = await getCommodityBySlug(slug);

  if (!commodity) {
    return { title: "Komoditas Tidak Ditemukan" };
  }

  const description =
    commodity.description ??
    `Detail komoditas ${commodity.name} di Dusun Jasem: luas lahan, musim tanam, dan hasil produksi.`;

  return {
    title: commodity.name,
    description,
    alternates: { canonical: `/potensi-pertanian/${commodity.slug}` },
    openGraph: {
      url: `/potensi-pertanian/${commodity.slug}`,
      title: commodity.name,
      description,
      images: commodity.cover_image_url ? [commodity.cover_image_url] : undefined,
    },
  };
}

export default async function CommodityDetailPage({ params }: Props) {
  const { slug } = await params;
  const commodity = await getCommodityBySlug(slug);

  if (!commodity) {
    notFound();
  }

  const photos = await getCommodityPhotos(commodity.id);

  const stats = [
    {
      icon: Ruler,
      label: "Luas Lahan",
      value: commodity.land_area_ha !== null ? `${commodity.land_area_ha} Ha` : "-",
    },
    {
      icon: CalendarRange,
      label: "Musim Tanam",
      value: commodity.planting_season ?? "-",
    },
    {
      icon: Wheat,
      label: "Hasil Produksi",
      value: commodity.harvest_yield ?? "-",
    },
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: commodity.name,
    description: commodity.description ?? undefined,
    image: commodity.cover_image_url ?? undefined,
    category: "Hasil Pertanian",
    brand: { "@type": "Organization", name: "Dusun Jasem" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <PageHeader eyebrow="Potensi Pertanian" title={commodity.name} />

      <section className="mx-auto max-w-4xl px-6 py-14">
        {/* Cover */}
        <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-forest-light/20 sm:h-96">
          {commodity.cover_image_url ? (
            <Image
              src={commodity.cover_image_url}
              alt={commodity.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-forest">
              <Sprout className="h-16 w-16" strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-light/20 text-forest">
                <stat.icon className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Deskripsi */}
        {commodity.description ? (
          <div className="mt-10">
            <h2 className="font-display text-xl font-bold text-foreground">Deskripsi</h2>
            <p className="mt-3 whitespace-pre-line text-muted-foreground">
              {commodity.description}
            </p>
          </div>
        ) : null}

        {/* Galeri foto sawah & panen */}
        {photos.length > 0 ? (
          <div className="mt-10">
            <h2 className="font-display text-xl font-bold text-foreground">
              Foto Sawah &amp; Panen
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-square overflow-hidden rounded-xl bg-muted"
                >
                  <Image
                    src={photo.image_url}
                    alt={photo.caption ?? commodity.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 33vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
