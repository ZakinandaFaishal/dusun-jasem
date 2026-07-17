import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Manrope, Geist } from "next/font/google";
import { Toaster } from "sonner";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/site-config";
import "./globals.css";
import { PwaRegister } from "@/components/shared/pwa-register";
import { cn } from "@/lib/utils";

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  title: {
    default: `${SITE_NAME} — Harmoni Alam, Pertanian, dan Kebersamaan`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  themeColor: "#1f4d2b",
  keywords: [
    "Dusun Jasem",
    "Srimulyo",
    "Piyungan",
    "Bantul",
    "Yogyakarta",
    "potensi pertanian",
    "produk UMKM desa",
    "profil dusun",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Harmoni Alam, Pertanian, dan Kebersamaan`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Harmoni Alam, Pertanian, dan Kebersamaan`,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
};

// JSON-LD: menandai situs sebagai entitas pemerintahan lokal (dusun) dengan
// lokasi geografis, agar mesin pencari bisa menampilkan rich result yang
// relevan untuk pencarian lokal ("dusun jasem", "wisata piyungan bantul", dst).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Srimulyo, Piyungan",
    addressRegion: "Bantul, Daerah Istimewa Yogyakarta",
    addressCountry: "ID",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${fontDisplay.variable} ${geist.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-center" />
        <PwaRegister />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
