import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { EventForm } from "@/features/agenda/components/event-form";
import { createEvent } from "@/features/agenda/actions/create-event";

export default function TambahAgendaPage() {
  return (
    <div className="max-w-xl">
      <Link
        href="/dashboard/agenda"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest"
      >
        <ChevronLeft className="h-4 w-4" />
        Kembali ke Agenda
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
        Tambah Agenda
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Jadwalkan kegiatan dusun seperti pengajian, kerja bakti, atau musyawarah.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <EventForm action={createEvent} submitLabel="Simpan Agenda" />
      </div>
    </div>
  );
}
