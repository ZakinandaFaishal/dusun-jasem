import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteEventButton } from "./delete-event-button";
import { formatDateTime } from "@/lib/utils";
import type { AgendaEvent } from "@/types";

const AGENDA_TYPE_LABELS: Record<AgendaEvent["agenda_type"], string> = {
  rutin: "Agenda Rutin",
  akan_dilaksanakan: "Akan Dilaksanakan",
};

export function EventTable({ events }: { events: AgendaEvent[] }) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Belum ada agenda. Klik &quot;Tambah Agenda&quot; untuk menjadwalkan
        kegiatan.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-5 py-3">Kegiatan</th>
            <th className="px-5 py-3">Jenis</th>
            <th className="px-5 py-3">Waktu Mulai</th>
            <th className="px-5 py-3">Tanggalan Jawa</th>
            <th className="px-5 py-3">Lokasi</th>
            <th className="px-5 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-b border-border last:border-0">
              <td className="px-5 py-3 font-medium text-foreground">{event.title}</td>
              <td className="px-5 py-3 text-muted-foreground">
                <span className="rounded-full bg-forest-light/20 px-2.5 py-1 text-xs font-medium text-forest">
                  {AGENDA_TYPE_LABELS[event.agenda_type]}
                </span>
              </td>
              <td className="px-5 py-3 text-muted-foreground">
                {formatDateTime(event.starts_at)}
              </td>
              <td className="px-5 py-3 text-muted-foreground">{event.javanese_date ?? "-"}</td>
              <td className="px-5 py-3 text-muted-foreground">{event.location ?? "-"}</td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/dashboard/agenda/${event.id}`}
                    aria-label={`Edit ${event.title}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-forest-light/20 hover:text-forest"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteEventButton id={event.id} title={event.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
