"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FaqFormState } from "../actions/create-faq";
import type { FaqItem } from "@/types";

const INITIAL_STATE: FaqFormState = { success: false, message: "" };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Menyimpan..." : label}
    </Button>
  );
}

type FaqFormProps = {
  faq?: FaqItem;
  action: (state: FaqFormState, formData: FormData) => Promise<FaqFormState>;
  submitLabel: string;
};

export function FaqForm({ faq, action, submitLabel }: FaqFormProps) {
  const [state, formAction] = useActionState(action, INITIAL_STATE);

  useEffect(() => {
    if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label htmlFor="question">Pertanyaan</Label>
        <Input
          id="question"
          name="question"
          defaultValue={faq?.question}
          placeholder="mis. Bagaimana cara membeli produk warga?"
          required
        />
        {state.fieldErrors?.question ? (
          <p className="text-xs text-red-600">{state.fieldErrors.question[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="answer">Jawaban</Label>
        <Textarea
          id="answer"
          name="answer"
          defaultValue={faq?.answer}
          placeholder="Tulis jawaban di sini"
          className="min-h-32"
          required
        />
        {state.fieldErrors?.answer ? (
          <p className="text-xs text-red-600">{state.fieldErrors.answer[0]}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="display_order">Urutan Tampil</Label>
        <Input
          id="display_order"
          name="display_order"
          type="number"
          min={0}
          defaultValue={faq?.display_order ?? 0}
        />
      </div>

      <div className="mt-2 flex items-center gap-3">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
