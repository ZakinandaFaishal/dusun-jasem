import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { MemberForm } from "@/features/organisasi/components/member-form";
import { createMember } from "@/features/organisasi/actions/create-member";

export default function TambahAnggotaPage() {
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
        Tambah Anggota
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Isi data anggota struktur organisasi dusun.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <MemberForm action={createMember} submitLabel="Simpan Anggota" />
      </div>
    </div>
  );
}
