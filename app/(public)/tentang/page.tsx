import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDusunProfile } from "@/services/profile";

export const metadata: Metadata = {
  title: "Tentang Dusun",
  description:
    "Sejarah, visi, misi, dan letak geografis Dusun Jasem, Kalurahan Srimulyo, Kapanewon Piyungan, Kabupaten Bantul.",
  alternates: { canonical: "/tentang" },
  openGraph: { url: "/tentang" },
};

export default async function TentangPage() {
  const profile = await getDusunProfile();

  const hasMapCoordinates =
    profile.map_latitude !== null && profile.map_longitude !== null;

  return (
    <>
      <PageHeader
        eyebrow="Tentang Dusun"
        title={`Tentang ${profile.name}`}
        description="Mengenal lebih dekat sejarah, visi, misi, dan kondisi wilayah dusun kami."
      />

<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
  {/* Sejarah */}
  <div>
    <h2 className="font-display text-xl font-bold text-foreground">Sejarah</h2>
    <p className="mt-3 whitespace-pre-line text-justify text-muted-foreground">
      {profile.sejarah ?? "Sejarah dusun akan segera dilengkapi oleh perangkat dusun."}
    </p>
  </div>

        {/* Visi & Misi */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Visi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-sm text-muted-foreground text-justify">
                {profile.visi ?? "Visi dusun akan segera dilengkapi oleh perangkat dusun."}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Misi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-sm text-muted-foreground text-justify">
                {profile.misi ?? "Misi dusun akan segera dilengkapi oleh perangkat dusun."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Kondisi Wilayah */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-forest">
              Letak Geografis
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-justify">
              {profile.letak_geografis ?? "Belum diisi."}
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-forest">
              Batas Wilayah
            </h3>
            <p className="whitespace-pre-line text-sm text-muted-foreground">
              {profile.batas_wilayah ?? "Belum diisi."}
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-forest">
              Kondisi Alam
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-justify">
              {profile.kondisi_alam ?? "Belum diisi."}
            </p>
          </div>
        </div>

        {/* Peta Lokasi */}
        <div className="mt-12">
          <h2 className="font-display text-xl font-bold text-foreground">Peta Lokasi</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-border">
            {hasMapCoordinates ? (
              <iframe
                title={`Peta lokasi ${profile.name}`}
                src={`https://www.google.com/maps?q=${profile.map_latitude},${profile.map_longitude}&z=15&output=embed`}
                width="100%"
                height="400"
                loading="lazy"
                className="block"
              />
            ) : (
              <div className="flex h-72 items-center justify-center bg-muted text-sm text-muted-foreground">
                Koordinat peta belum diisi. Tambahkan lewat dashboard admin
                pada menu Kelola Profil Dusun.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
