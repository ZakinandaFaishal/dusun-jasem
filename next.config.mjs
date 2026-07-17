/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Aktifkan jika ingin memakai Partial Prerendering di Next 15
    // ppr: "incremental",
    serverActions: {
      // Default 1MB terlalu kecil untuk upload foto dari dashboard admin.
      bodySizeLimit: "8mb",
    },
  },
};

export default nextConfig;
