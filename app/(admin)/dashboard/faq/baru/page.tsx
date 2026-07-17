import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { FaqForm } from "@/features/faq/components/faq-form";
import { createFaq } from "@/features/faq/actions/create-faq";

export default function TambahFaqPage() {
  return (
    <div className="max-w-xl">
      <Link
        href="/dashboard/faq"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest"
      >
        <ChevronLeft className="h-4 w-4" />
        Kembali ke FAQ
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
        Tambah FAQ
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tambahkan pertanyaan umum baru.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <FaqForm action={createFaq} submitLabel="Simpan FAQ" />
      </div>
    </div>
  );
}
