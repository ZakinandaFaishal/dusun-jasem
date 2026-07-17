import Link from "next/link";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ListSearchBarProps = {
  action: string;
  placeholder: string;
  query: string;
  clearHref: string;
  submitLabel: string;
};

export function ListSearchBar({
  action,
  placeholder,
  query,
  clearHref,
  submitLabel,
}: ListSearchBarProps) {
  return (
    <form
      action={action}
      method="get"
      className="mb-8 rounded-3xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur sm:p-5"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <label className="flex-1 space-y-2">
          <span className="text-sm font-medium text-foreground">Pencarian</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={query}
              placeholder={placeholder}
              className="h-12 rounded-2xl pl-11"
            />
          </div>
        </label>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          <button
            type="submit"
            className={cn(buttonVariants({ size: "lg" }), "rounded-2xl px-6")}
          >
            {submitLabel}
          </button>

          {query ? (
            <Link
              href={clearHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-2xl px-6",
              )}
            >
              <X className="mr-2 h-4 w-4" />
              Reset
            </Link>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Gunakan kata kunci untuk menyaring hasil tanpa berpindah halaman.
      </p>
    </form>
  );
}