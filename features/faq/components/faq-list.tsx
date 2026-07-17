import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteFaqButton } from "./delete-faq-button";
import type { FaqItem } from "@/types";

export function FaqTable({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Belum ada FAQ. Klik &quot;Tambah FAQ&quot; untuk mulai mengisi
        pertanyaan umum.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-5 py-3">Pertanyaan</th>
            <th className="px-5 py-3">Urutan</th>
            <th className="px-5 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id} className="border-b border-border last:border-0">
              <td className="px-5 py-3 font-medium text-foreground">{faq.question}</td>
              <td className="px-5 py-3 text-muted-foreground">{faq.display_order}</td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/dashboard/faq/${faq.id}`}
                    aria-label={`Edit ${faq.question}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-forest-light/20 hover:text-forest"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteFaqButton id={faq.id} question={faq.question} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
