import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock, Instagram, Facebook } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { getDusunProfile } from "@/services/profile";
import { buttonVariants } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Alamat, kontak, dan jam pelayanan Dusun Jasem.",
  alternates: { canonical: "/kontak" },
  openGraph: { url: "/kontak" },
};

export default async function KontakPage() {
  const profile = await getDusunProfile();

  const contactItems = [
    { icon: MapPin, label: "Alamat", value: profile.alamat },
    { icon: Phone, label: "Nomor Kepala Dukuh", value: profile.telepon_kepala_dukuh },
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Clock, label: "Jam Pelayanan", value: profile.jam_pelayanan },
  ].filter((item) => item.value);

  const hasMap = profile.map_latitude !== null && profile.map_longitude !== null;

  return (
    <>
      <PageHeader
        eyebrow="Kontak"
        title="Hubungi Kami"
        description="Ada pertanyaan atau ingin berkunjung? Ini cara menghubungi perangkat Dusun Jasem."
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="flex flex-col gap-5">
              {contactItems.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Informasi kontak belum diisi. Kelola lewat dashboard admin
                  pada menu Kelola Profil Dusun.
                </p>
              ) : (
                contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-light/20 text-forest">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {profile.whatsapp ? (
                <a
                  href={buildWhatsAppLink(
                    profile.whatsapp,
                    `Halo, saya ingin bertanya tentang Dusun Jasem.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ size: "sm" })}
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat WhatsApp
                </a>
              ) : null}

              {profile.instagram_url ? (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              ) : null}

              {profile.facebook_url ? (
                <a
                  href={profile.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative min-h-72 overflow-hidden rounded-2xl border border-border bg-muted">
            {hasMap ? (
              <iframe
                title="Lokasi Dusun Jasem"
                src={`https://www.google.com/maps?q=${profile.map_latitude},${profile.map_longitude}&output=embed`}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-full min-h-72 items-center justify-center text-sm text-muted-foreground">
                Titik lokasi belum diatur di Profil Dusun.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
