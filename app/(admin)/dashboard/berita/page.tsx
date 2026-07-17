import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getAllNews } from "@/services/news";
import { NewsTable } from "@/features/berita/components/news-list";

export default async function DashboardBeritaPage() {
  const posts = await getAllNews();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Kelola Berita / Kegiatan
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Berita kegiatan dusun, panen, pelatihan, KKN, dan pertanian.
          </p>
        </div>
        <Link href="/dashboard/berita/baru" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" />
          Tulis Berita
        </Link>
      </div>

      <div className="mt-6">
        <NewsTable posts={posts} />
      </div>
    </div>
  );
}
