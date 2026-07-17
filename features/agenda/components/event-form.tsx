"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toDateTimeLocalValue } from "@/lib/utils";
import type { EventFormState } from "../actions/create-event";
import type { AgendaEvent } from "@/types";

const INITIAL_STATE: EventFormState = { success: false, message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Menyimpan..." : label}
    </Button>
  );
}

type EventFormProps = {
  event?: AgendaEvent;
  action: (state: EventFormState, formData: FormData) => Promise<EventFormState>;
  submitLabel: string;
};

export function EventForm({ event, action, submitLabel }: EventFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_STATE);

  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="title">Judul Kegiatan</Label>
        <Input
          id="title"
          name="title"
          defaultValue={event?.title}
          placeholder="mis. Kerja Bakti RT 03"
          required
        />
        {state.fieldErrors?.title ? (
          <p className="text-xs text-red-600">{state.fieldErrors.title[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" name="description" defaultValue={event?.description ?? ""} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">Lokasi</Label>
        <Input
          id="location"
          name="location"
          defaultValue={event?.location ?? ""}
          placeholder="mis. Balai Dusun Jasem"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="agenda_type">Jenis Agenda</Label>
        <Select id="agenda_type" name="agenda_type" defaultValue={event?.agenda_type ?? "akan_dilaksanakan"} required>
          <option value="akan_dilaksanakan">Akan Dilaksanakan</option>
          <option value="rutin">Agenda Rutin</option>
        </Select>
        {state.fieldErrors?.agenda_type ? (
          <p className="text-xs text-red-600">{state.fieldErrors.agenda_type[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="javanese_date">Tanggalan Jawa</Label>
        <Input
          id="javanese_date"
          name="javanese_date"
          defaultValue={event?.javanese_date ?? ""}
          placeholder="mis. Jumat Kliwon, 12 Sura 1959"
        />
        <p className="text-xs text-muted-foreground">
          Isi manual sesuai kalender Jawa untuk publikasi agenda.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="starts_at">Waktu Mulai</Label>
          <Input
            id="starts_at"
            name="starts_at"
            type="datetime-local"
            defaultValue={event ? toDateTimeLocalValue(event.starts_at) : ""}
            required
          />
          {state.fieldErrors?.starts_at ? (
            <p className="text-xs text-red-600">{state.fieldErrors.starts_at[0]}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ends_at">Waktu Selesai (opsional)</Label>
          <Input
            id="ends_at"
            name="ends_at"
            type="datetime-local"
            defaultValue={event?.ends_at ? toDateTimeLocalValue(event.ends_at) : ""}
          />
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
