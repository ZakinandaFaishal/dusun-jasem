import Link from "next/link";
import { ChevronRight } from "lucide-react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-14">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Link href="/" className="hover:text-forest">
            Beranda
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{eyebrow}</span>
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
