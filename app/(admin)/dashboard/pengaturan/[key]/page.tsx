type Props = {
  params: Promise<{ key: string }>;
};

export default async function PengaturanDetailPage({ params }: Props) {
  const { key } = await params;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">
        Pengaturan: {key}
      </h1>
      <p className="mt-1 text-muted-foreground">
        Halaman ini masih dalam pengembangan.
      </p>
    </div>
  );
}