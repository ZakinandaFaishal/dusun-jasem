import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Newspaper } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ListSearchBar } from "@/components/shared/list-search-bar";
import { PaginationNav } from "@/components/shared/pagination-nav";
import { getPublishedNews } from "@/services/news";
import { formatDate } from "@/lib/utils";
import type { NewsCategory } from "@/types";

export const metadata: Metadata = {
  title: "Berita & Kegiatan",
  description:
    "Kabar terbaru kegiatan dusun, panen, pelatihan, KKN, dan pertanian di Dusun Jasem.",
  alternates: { canonical: "/berita" },
  openGraph: { url: "/berita" },
};

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  kegiatan_dusun: "Kegiatan Dusun",
  panen: "Panen",
  pelatihan: "Pelatihan",
  kkn: "KKN",
  pertanian: "Pertanian",
};

type BeritaPageProps = {
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

export default async function BeritaPage({ searchParams }: BeritaPageProps) {
  const posts = await getPublishedNews();
  const resolvedSearchParams = await searchParams;
  const query = normalizeQuery(resolvedSearchParams?.q ?? "");
  const currentPage = parsePage(resolvedSearchParams?.page);

  const filteredPosts = query
    ? posts.filter((post) => {
        const categoryLabel = CATEGORY_LABELS[post.category];
        return [post.title, post.content, post.author, categoryLabel]
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
    : posts;

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  return (
    <>
      <PageHeader
        eyebrow="Berita & Kegiatan"
        title="Berita & Kegiatan Dusun Jasem"
        description="Kabar kegiatan dusun, panen, pelatihan, kegiatan KKN, dan pertanian."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
        <ListSearchBar
          action="/berita"
          placeholder="Cari judul, isi, penulis, atau kategori berita"
          query={query}
          clearHref="/berita"
          submitLabel="Cari berita"
        />

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Belum ada berita yang dipublikasikan.
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Tidak ada berita yang cocok dengan pencarian{query ? ` "${query}"` : ""}.
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/berita/${post.slug}`}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="relative h-44 w-full bg-forest-light/20">
                    {post.cover_image_url ? (
                      <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-forest">
                        <Newspaper className="h-10 w-10" strokeWidth={1.5} />
                      </div>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-forest px-3 py-1 text-xs font-medium text-white">
                      {CATEGORY_LABELS[post.category]}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h2 className="font-display text-lg font-bold text-foreground">
                      {post.title}
                    </h2>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{post.content}</p>
                    <div className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {post.published_at ? formatDate(post.published_at) : ""}
                      <span>· {post.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <PaginationNav
              basePath="/berita"
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
