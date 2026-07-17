import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { getFaqs } from "@/services/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Pertanyaan umum mengenai Dusun Jasem.",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq" },
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Pertanyaan Umum"
        description="Jawaban singkat untuk pertanyaan yang sering diajukan mengenai Dusun Jasem."
      />

      <section className="mx-auto max-w-3xl px-6 py-14">
        {faqs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Belum ada pertanyaan yang ditambahkan.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group rounded-2xl border border-border bg-card p-5 open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-foreground">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
