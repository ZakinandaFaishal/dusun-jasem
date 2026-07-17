import Link from "next/link";
import { Plus } from "lucide-react";

export default function PengaturanPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Pengaturan
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola konfigurasi tambahan situs.
          </p>
        </div>
        <Link
          href="/dashboard/pengaturan/baru"
          className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-dark"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </Link>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Halaman ini masih dalam pengembangan.
      </p>
    </div>
  );
}