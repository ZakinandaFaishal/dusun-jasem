// Alternatif: divider gelombang halus (filled), pengganti garis tangga
// yang berisiko kelihatan berantakan saat di-scale ke berbagai lebar layar.

export function TerraceDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 40 C 150 10, 350 10, 600 40 C 850 70, 1050 70, 1200 40 L1200 80 L0 80 Z"
        className="fill-forest-light/25"
      />
      <path
        d="M0 55 C 200 25, 400 25, 600 55 C 800 85, 1000 85, 1200 55 L1200 80 L0 80 Z"
        className="fill-forest-light/40"
      />
    </svg>
  );
}