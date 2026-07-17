import type { Metadata } from "next";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { getUpcomingEvents } from "@/services/events";
import { formatDate, formatDateTime } from "@/lib/utils";

const AGENDA_TYPE_LABELS = {
  rutin: "Agenda Rutin",
  akan_dilaksanakan: "Akan Dilaksanakan",
} as const;

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Jadwal kegiatan Dusun Jasem: pengajian, kerja bakti, musyawarah, dan panen bersama.",
  alternates: { canonical: "/agenda" },
  openGraph: { url: "/agenda" },
};

export default async function AgendaPage() {
  const events = await getUpcomingEvents();

  return (
    <>
      <PageHeader
        eyebrow="Agenda"
        title="Agenda Kegiatan Dusun Jasem"
        description="Jadwal kegiatan yang akan datang. Sampai jumpa di lapangan atau balai dusun!"
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
        {events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Belum ada agenda yang dijadwalkan saat ini.
          </div>
        ) : (
          <ol className="flex flex-col gap-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="flex gap-4 rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-light/20 text-forest">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-forest">
                    {formatDate(event.starts_at)}
                  </p>
                  <h2 className="mt-1 font-display text-lg font-bold text-foreground">
                    {event.title}
                  </h2>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium">
                    <span className="rounded-full bg-forest-light/20 px-2.5 py-1 text-forest">
                      {AGENDA_TYPE_LABELS[event.agenda_type]}
                    </span>
                    {event.javanese_date ? (
                      <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                        {event.javanese_date}
                      </span>
                    ) : null}
                  </div>
                  {event.description ? (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {formatDateTime(event.starts_at)}
                      {event.ends_at ? ` – ${formatDateTime(event.ends_at)}` : ""}
                    </span>
                    {event.location ? (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </span>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
