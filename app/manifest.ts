import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Dusun Jasem",
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f2e8",
    theme_color: "#1f4d2b",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
    id: SITE_URL,
  };
}