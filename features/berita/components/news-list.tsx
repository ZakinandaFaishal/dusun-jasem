import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteNewsButton } from "./delete-news-button";
import { formatDate } from "@/lib/utils";
import type { NewsCategory, NewsPost } from "@/types";

const CATEGORY_LABELS: Record<NewsCategory, string> = {
  kegiatan_dusun: "Kegiatan Dusun",
  panen: "Panen",
  pelatihan: "Pelatihan",
  kkn: "KKN",
  pertanian: "Pertanian",
};

export function NewsTable({ posts }: { posts: NewsPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Belum ada berita. Klik &quot;Tulis Berita&quot; untuk mulai mengisi
        Berita / Kegiatan.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-5 py-3">Judul</th>
            <th className="px-5 py-3">Kategori</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Tanggal Terbit</th>
            <th className="px-5 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-border last:border-0">
              <td className="px-5 py-3 font-medium text-foreground">{post.title}</td>
              <td className="px-5 py-3 text-muted-foreground">
                {CATEGORY_LABELS[post.category]}
              </td>
              <td className="px-5 py-3">
                <span
                  className={
                    post.is_published
                      ? "inline-flex rounded-full bg-forest-light/20 px-2.5 py-1 text-xs font-medium text-forest"
                      : "inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  }
                >
                  {post.is_published ? "Tayang" : "Draft"}
                </span>
              </td>
              <td className="px-5 py-3 text-muted-foreground">
                {post.published_at ? formatDate(post.published_at) : "-"}
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/dashboard/berita/${post.id}`}
                    aria-label={`Edit ${post.title}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-forest-light/20 hover:text-forest"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteNewsButton id={post.id} title={post.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
