import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getFaqs } from "@/services/faq";
import { FaqTable } from "@/features/faq/components/faq-list";

export default async function DashboardFaqPage() {
  const faqs = await getFaqs();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Kelola FAQ
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pertanyaan umum mengenai Dusun Jasem.
          </p>
        </div>
        <Link href="/dashboard/faq/baru" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" />
          Tambah FAQ
        </Link>
      </div>

      <div className="mt-6">
        <FaqTable faqs={faqs} />
      </div>
    </div>
  );
}
