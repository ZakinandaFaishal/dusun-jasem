import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getOrganizationMembers } from "@/services/organization";
import { MemberTable } from "@/features/organisasi/components/member-list";

export default async function DashboardOrganisasiPage() {
  const members = await getOrganizationMembers();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Kelola Struktur Organisasi
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kepala Dukuh, Ketua RT, Karang Taruna, PKK, dan Kelompok Tani.
          </p>
        </div>
        <Link href="/dashboard/organisasi/baru" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" />
          Tambah Anggota
        </Link>
      </div>

      <div className="mt-6">
        <MemberTable members={members} />
      </div>
    </div>
  );
}
