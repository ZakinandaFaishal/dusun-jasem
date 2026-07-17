import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getAllEvents } from "@/services/events";
import { EventTable } from "@/features/agenda/components/event-list";

export default async function DashboardAgendaPage() {
  const events = await getAllEvents();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Kelola Agenda
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Jadwal pengajian, kerja bakti, musyawarah, dan panen bersama.
          </p>
        </div>
        <Link href="/dashboard/agenda/baru" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" />
          Tambah Agenda
        </Link>
      </div>

      <div className="mt-6">
        <EventTable events={events} />
      </div>
    </div>
  );
}
