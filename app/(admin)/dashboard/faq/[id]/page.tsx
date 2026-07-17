import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { FaqForm } from "@/features/faq/components/faq-form";
import { updateFaq } from "@/features/faq/actions/update-faq";
import { getFaqById } from "@/services/faq";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditFaqPage({ params }: Props) {
  const { id } = await params;
  const faq = await getFaqById(id);

  if (!faq) {
    notFound();
  }

  const updateFaqWithId = updateFaq.bind(null, faq.id);

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
        Edit FAQ
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{faq.question}</p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <FaqForm faq={faq} action={updateFaqWithId} submitLabel="Simpan Perubahan" />
      </div>
    </div>
  );
}
