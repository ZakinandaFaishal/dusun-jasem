"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { ImageUploadField } from "@/components/shared/image-upload-field";
import { createMember } from "../actions/create-member";
import type { MemberFormState } from "../actions/create-member";
import type { OrganizationGroup, OrganizationMember } from "@/types";

const GROUP_OPTIONS: { value: OrganizationGroup; label: string }[] = [
  { value: "kepala_dukuh", label: "Kepala Dukuh" },
  { value: "rt", label: "Ketua RT" },
  { value: "karang_taruna", label: "Karang Taruna" },
  { value: "pkk", label: "PKK" },
  { value: "kelompok_tani", label: "Kelompok Tani" },
  { value: "takmir", label: "Takmir" },
];

const INITIAL_STATE: MemberFormState = { success: false, message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Menyimpan..." : label}
    </Button>
  );
}

type MemberFormProps = {
  member?: OrganizationMember;
  action: (state: MemberFormState, formData: FormData) => Promise<MemberFormState>;
  submitLabel: string;
};

export function MemberForm({ member, action, submitLabel }: MemberFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_STATE);

  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="full_name">Nama Lengkap</Label>
        <Input
          id="full_name"
          name="full_name"
          defaultValue={member?.full_name}
          placeholder="mis. Suparman"
          required
        />
        {state.fieldErrors?.full_name ? (
          <p className="text-xs text-red-600">{state.fieldErrors.full_name[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="role_title">Jabatan</Label>
        <Input
          id="role_title"
          name="role_title"
          defaultValue={member?.role_title}
          placeholder="mis. Ketua RT 03"
          required
        />
        {state.fieldErrors?.role_title ? (
          <p className="text-xs text-red-600">{state.fieldErrors.role_title[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="group_type">Kelompok</Label>
        <Select id="group_type" name="group_type" defaultValue={member?.group_type} required>
          <option value="" disabled>
            Pilih kelompok
          </option>
          {GROUP_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {state.fieldErrors?.group_type ? (
          <p className="text-xs text-red-600">{state.fieldErrors.group_type[0]}</p>
        ) : null}
      </div>

      <ImageUploadField
        name="photo_url"
        label="Foto (opsional)"
        folder="organisasi"
        defaultValue={member?.photo_url}
      />
      {state.fieldErrors?.photo_url ? (
        <p className="text-xs text-red-600">{state.fieldErrors.photo_url[0]}</p>
      ) : null}

      <div className="grid gap-2">
        <Label htmlFor="display_order">Urutan Tampil</Label>
        <Input
          id="display_order"
          name="display_order"
          type="number"
          min={0}
          defaultValue={member?.display_order ?? 0}
        />
        <p className="text-xs text-muted-foreground">
          Angka lebih kecil tampil lebih dulu di dalam satu kelompok.
        </p>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
