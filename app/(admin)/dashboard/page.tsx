import Link from "next/link";
import { Users, Package, Sprout, Newspaper, Image as ImageIcon, CalendarDays, Settings, HelpCircle, ArrowRight } from "lucide-react";
import { getOrganizationMembers } from "@/services/organization";
import { getAllProducts } from "@/services/products";
import { getAllCommodities } from "@/services/agriculture";
import { getAllNews } from "@/services/news";
import { getGalleryItems } from "@/services/gallery";
import { getAllEvents } from "@/services/events";
import { getFaqs } from "@/services/faq";

export default async function DashboardPage() {
  const [members, products, commodities, news, gallery, events, faqs] = await Promise.all([
    getOrganizationMembers(),
    getAllProducts(),
    getAllCommodities(),
    getAllNews(),
    getGalleryItems(),
    getAllEvents(),
    getFaqs(),
  ]);

  const cards = [
    {
      href: "/dashboard/berita",
      icon: Newspaper,
      label: "Berita / Kegiatan",
      value: `${news.length} berita`,
    },
    {
      href: "/dashboard/produk",
      icon: Package,
      label: "Produk Unggulan",
      value: `${products.length} produk`,
    },
    {
      href: "/dashboard/pertanian",
      icon: Sprout,
      label: "Potensi Pertanian",
      value: `${commodities.length} komoditas`,
    },
    {
      href: "/dashboard/galeri",
      icon: ImageIcon,
      label: "Galeri",
      value: `${gallery.length} foto`,
    },
    {
      href: "/dashboard/agenda",
      icon: CalendarDays,
      label: "Agenda",
      value: `${events.length} kegiatan`,
    },
    {
      href: "/dashboard/organisasi",
      icon: Users,
      label: "Struktur Organisasi",
      value: `${members.length} anggota`,
    },
    {
      href: "/dashboard/faq",
      icon: HelpCircle,
      label: "FAQ",
      value: `${faqs.length} pertanyaan`,
    },
    {
      href: "/dashboard/profil",
      icon: Settings,
      label: "Profil Dusun",
      value: "Kelola profil resmi",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">
        Dashboard Admin — Dusun Jasem
      </h1>
      <p className="mt-1 text-muted-foreground">
        Ringkasan pengelolaan berita, produk, potensi pertanian, galeri,
        agenda, struktur organisasi, dan profil dusun.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-light/20 text-forest">
                <card.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-base font-bold text-foreground">
                  {card.label}
                </p>
                <p className="text-sm text-muted-foreground">{card.value}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-forest" />
          </Link>
        ))}
      </div>
    </div>
  );
}
