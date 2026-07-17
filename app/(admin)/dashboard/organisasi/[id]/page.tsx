import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { MemberForm } from "@/features/organisasi/components/member-form";
import { updateMember } from "@/features/organisasi/actions/update-member";
import { getOrganizationMemberById } from "@/services/organization";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditAnggotaPage({ params }: Props) {
  const { id } = await params;
  const member = await getOrganizationMemberById(id);

  if (!member) {
    notFound();
  }

  const updateMemberWithId = updateMember.bind(null, member.id);

  return (
    <div className="max-w-xl">
      <Link
        href="/dashboard/organisasi"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-forest"
      >
        <ChevronLeft className="h-4 w-4" />
        Kembali ke Struktur Organisasi
      </Link>

      <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
        Edit Anggota
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{member.full_name}</p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <MemberForm
          member={member}
          action={updateMemberWithId}
          submitLabel="Simpan Perubahan"
        />
      </div>
    </div>
  );
}
