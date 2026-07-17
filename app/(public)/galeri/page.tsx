import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { getGalleryItems } from "@/services/gallery";
import { getPublishedNews } from "@/services/news";
import { GalleryBrowser } from "@/features/galeri/components/gallery-browser";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Dokumentasi foto pertanian, kegiatan dusun, KKN, dan produk unggulan Dusun Jasem.",
  alternates: { canonical: "/galeri" },
  openGraph: { url: "/galeri" },
};

export default async function GaleriPage() {
  const [items, newsPosts] = await Promise.all([getGalleryItems(), getPublishedNews()]);
  const attachmentPosts = newsPosts.filter((post) => post.attachment_url);
  const galleryAttachmentItems = items.filter((item) => item.attachment_url);

  return (
    <>
      <PageHeader
        eyebrow="Galeri"
        title="Galeri Dusun Jasem"
        description="Dokumentasi kegiatan pertanian, kegiatan dusun, KKN, dan produk warga."
      />
 
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
      {/*
        {attachmentPosts.length > 0 ? (
          <div className="mb-12 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
                Lampiran Berita
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
                Dokumen dari berita yang dipublikasikan
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Lampiran PDF atau tautan dari berita terbaru ditampilkan di sini agar mudah
                diakses dari halaman galeri.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {attachmentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={post.attachment_url as string}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-forest hover:bg-forest-light/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-light/20 text-forest">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-medium text-foreground group-hover:text-forest">
                      {post.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Buka lampiran berita</p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {galleryAttachmentItems.length > 0 ? (
          <div className="mb-12 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-forest">
                Lampiran Galeri
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
                Dokumen tambahan dari item galeri
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Lampiran PDF atau tautan yang disimpan pada item galeri ditampilkan di bagian ini.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryAttachmentItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.attachment_url as string}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-4 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-forest hover:bg-forest-light/10"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-forest-light/20 text-forest">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-medium text-foreground group-hover:text-forest">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.category.replace(/_/g, " ")} · Buka lampiran galeri
                    </p>
                  </div>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        ) : null}
*/}
        <GalleryBrowser items={items} />
      </section> 
    </>
  );
}
