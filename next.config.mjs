/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern AVIF (smallest) with WebP as fallback — 30-50% smaller than JPEG
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  // Remove X-Powered-By header (minor security hardening)
  poweredByHeader: false,
};

export default nextConfig;
