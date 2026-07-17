import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { EventForm } from "@/features/agenda/components/event-form";
import { updateEvent } from "@/features/agenda/actions/update-event";
import { getEventById } from "@/services/events";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditAgendaPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  const updateEventWithId = updateEvent.bind(null, event.id);

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
        Edit Agenda
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{event.title}</p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <EventForm event={event} action={updateEventWithId} submitLabel="Simpan Perubahan" />
      </div>
    </div>
  );
}
