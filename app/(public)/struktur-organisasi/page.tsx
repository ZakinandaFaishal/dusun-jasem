import type { Metadata } from "next";
import Image from "next/image";
import { User } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { getOrganizationMembers } from "@/services/organization";
import type { OrganizationGroup, OrganizationMember } from "@/types";

export const metadata: Metadata = {
  title: "Struktur Organisasi",
  description:
    "Susunan perangkat dan lembaga Dusun Jasem: Kepala Dukuh, Ketua RT, Karang Taruna, PKK, Kelompok Tani, dan Takmir.",
  alternates: { canonical: "/struktur-organisasi" },
  openGraph: { url: "/struktur-organisasi" },
};

// Urutan tampil & label Bahasa Indonesia untuk tiap kelompok. Urutan di
// array ini yang menentukan urutan section pada halaman, terlepas dari
// urutan data yang dikembalikan Supabase.
const GROUP_ORDER: { type: OrganizationGroup; label: string }[] = [
  { type: "kepala_dukuh", label: "Kepala Dukuh" },
  { type: "rt", label: "Ketua RT" },
  { type: "karang_taruna", label: "Karang Taruna" },
  { type: "pkk", label: "PKK" },
  { type: "kelompok_tani", label: "Kelompok Tani" },
  { type: "takmir", label: "Takmir" },
];

function MemberCard({ member }: { member: OrganizationMember }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-md">
      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-forest-light/20">
        {member.photo_url ? (
          <Image
            src={member.photo_url}
            alt={member.full_name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-forest">
            <User className="h-8 w-8" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div>
        <p className="font-display text-sm font-bold text-foreground">
          {member.full_name}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{member.role_title}</p>
      </div>
    </div>
  );
}

export default async function StrukturOrganisasiPage() {
  const members = await getOrganizationMembers();

  const groups = GROUP_ORDER.map((group) => ({
    ...group,
    members: members.filter((member) => member.group_type === group.type),
  }));

  const hasAnyMember = members.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Struktur Organisasi"
        title="Struktur Organisasi Dusun Jasem"
        description="Perangkat dusun dan lembaga yang menjalankan roda organisasi bersama warga."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
        {!hasAnyMember ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Data struktur organisasi belum ditambahkan. Kelola lewat dashboard
            admin pada menu Kelola Struktur Organisasi.
          </div>
        ) : (
          <div className="flex flex-col gap-14">
            {groups
              .filter((group) => group.members.length > 0)
              .map((group) => (
                <div key={group.type}>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {group.label}
                  </h2>
                  <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                    {group.members.map((member) => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>
    </>
  );
}
