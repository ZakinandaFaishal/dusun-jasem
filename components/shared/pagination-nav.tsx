import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaginationNavProps = {
  basePath: string;
  currentPage: number;
  totalPages: number;
  query?: Record<string, string | undefined>;
};

function buildHref(basePath: string, page: number, query?: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  params.set("page", String(page));

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const queryString = params.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
}

export function PaginationNav({
  basePath,
  currentPage,
  totalPages,
  query,
}: PaginationNavProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={buildHref(basePath, Math.max(1, currentPage - 1), query)}
        aria-disabled={currentPage === 1}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "rounded-lg px-3",
          currentPage === 1 && "pointer-events-none opacity-50",
        )}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Sebelumnya
      </Link>

      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <Link
            key={pageNumber}
            href={buildHref(basePath, pageNumber, query)}
            aria-current={currentPage === pageNumber ? "page" : undefined}
            className={cn(
              buttonVariants({
                variant: currentPage === pageNumber ? "default" : "outline",
                size: "sm",
              }),
              "min-w-10 rounded-lg px-3",
              currentPage === pageNumber && "bg-forest text-white hover:bg-forest/90",
            )}
          >
            {pageNumber}
          </Link>
        ))}
      </div>

      <Link
        href={buildHref(basePath, Math.min(totalPages, currentPage + 1), query)}
        aria-disabled={currentPage === totalPages}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "rounded-lg px-3",
          currentPage === totalPages && "pointer-events-none opacity-50",
        )}
      >
        Berikutnya
        <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </nav>
  );
}