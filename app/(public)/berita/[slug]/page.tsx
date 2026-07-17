import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, FileText, User, Newspaper } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { getNewsBySlug, getPublishedNews } from "@/services/news";
import { formatDate } from "@/lib/utils";
import type { NewsCategory } from "@/types";

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  kegiatan_dusun: "Kegiatan Dusun",
  panen: "Panen",
  pelatihan: "Pelatihan",
  kkn: "KKN",
  pertanian: "Pertanian",
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedNews();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    return { title: "Berita Tidak Ditemukan" };
  }

  const description = post.content.slice(0, 150);

  return {
    title: post.title,
    description,
    alternates: { canonical: `/berita/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/berita/${post.slug}`,
      title: post.title,
      description,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
      publishedTime: post.published_at ?? undefined,
      authors: [post.author],
    },
  };
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content.split(/\n\s*\n/).filter((p) => p.trim().length > 0);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    image: post.cover_image_url ?? undefined,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Dusun Jasem" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PageHeader eyebrow="Berita & Kegiatan" title={post.title} />

      <section className="mx-auto max-w-3xl px-6 py-14">
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="rounded-full bg-forest-light/20 px-3 py-1 text-xs font-medium text-forest">
            {CATEGORY_LABELS[post.category]}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {post.published_at ? formatDate(post.published_at) : ""}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            {post.author}
          </span>
        </div>

        <div className="mt-6 relative h-64 w-full overflow-hidden rounded-2xl bg-forest-light/20 sm:h-96">
          {post.cover_image_url ? (
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 768px, 100vw"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-forest">
              <Newspaper className="h-16 w-16" strokeWidth={1.5} />
            </div>
          )}
        </div>

        {post.attachment_url ? (
          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-light/20 text-forest">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">Lampiran Berita</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  File atau tautan tambahan untuk berita ini.
                </p>
                <Link
                  href={post.attachment_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest/90"
                >
                  Buka Lampiran
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-4 text-muted-foreground">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
