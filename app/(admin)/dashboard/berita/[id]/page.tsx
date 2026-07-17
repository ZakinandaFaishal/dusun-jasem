import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { NewsForm } from "@/features/berita/components/news-form";
import { updateNews } from "@/features/berita/actions/update-news";
import { getNewsById } from "@/services/news";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBeritaPage({ params }: Props) {
  const { id } = await params;
  const news = await getNewsById(id);

  if (!news) {
    notFound();
  }

  const updateNewsWithId = updateNews.bind(null, news.id);

  return (
    <div className="max-w-2xl">
      <Link
        href="/dashboard/berita"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest"
      >
        <ChevronLeft className="h-4 w-4" />
        Kembali ke Berita / Kegiatan
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
        Edit Berita
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{news.title}</p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <NewsForm news={news} action={updateNewsWithId} submitLabel="Simpan Perubahan" />
      </div>
    </div>
  );
}
