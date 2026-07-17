import type { LucideIcon } from "lucide-react";

type StatItemProps = {
  icon: LucideIcon;
  value: string;
  label: string;
};

export function StatItem({ icon: Icon, value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-2 text-center sm:items-start sm:text-left">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-light/20 text-forest">
        <Icon className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <span className="font-display text-2xl font-bold text-foreground">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
