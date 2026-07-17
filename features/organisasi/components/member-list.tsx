import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteMemberButton } from "./delete-member-button";
import type { OrganizationGroup, OrganizationMember } from "@/types";

const GROUP_LABELS: Record<OrganizationGroup, string> = {
  kepala_dukuh: "Kepala Dukuh",
  rt: "Ketua RT",
  karang_taruna: "Karang Taruna",
  pkk: "PKK",
  kelompok_tani: "Kelompok Tani",
  takmir: "Takmir",
};

export function MemberTable({ members }: { members: OrganizationMember[] }) {
  if (members.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
        Belum ada anggota. Klik &quot;Tambah Anggota&quot; untuk mulai mengisi
        struktur organisasi.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="border-b border-border bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-5 py-3">Nama</th>
            <th className="px-5 py-3">Jabatan</th>
            <th className="px-5 py-3">Kelompok</th>
            <th className="px-5 py-3">Urutan</th>
            <th className="px-5 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b border-border last:border-0">
              <td className="px-5 py-3 font-medium text-foreground">
                {member.full_name}
              </td>
              <td className="px-5 py-3 text-muted-foreground">{member.role_title}</td>
              <td className="px-5 py-3 text-muted-foreground">
                {GROUP_LABELS[member.group_type]}
              </td>
              <td className="px-5 py-3 text-muted-foreground">{member.display_order}</td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/dashboard/organisasi/${member.id}`}
                    aria-label={`Edit ${member.full_name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-forest-light/20 hover:text-forest"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <DeleteMemberButton id={member.id} name={member.full_name} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
