import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { NewsForm } from "@/features/berita/components/news-form";
import { createNews } from "@/features/berita/actions/create-news";

export default function TulisBeritaPage() {
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
        Tulis Berita
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Bagikan kegiatan atau kabar terbaru dari Dusun Jasem.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <NewsForm action={createNews} submitLabel="Simpan Berita" />
      </div>
    </div>
  );
}
