/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove X-Powered-By header (minor security hardening)
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    // Serve modern AVIF (smallest) with WebP as fallback — 30-50% smaller than JPEG
    formats: ["image/avif", "image/webp"],
    // Cache optimized images at the CDN edge for 30 days; stops Next from
    // re-encoding the same image on every cold start.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Next 16 requires every custom `quality` value used in <Image quality=…>
    // to be whitelisted here. We use 70 (hero backdrop) and 75 (default).
    qualities: [70, 75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  experimental: {
    // Tree-shake giant icon/animation/UI libraries on a per-import basis.
    // This alone typically chops 100-300 KB off the client JS bundle.
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "motion",
      "date-fns",
      "recharts",
      "embla-carousel-react",
      "@sanity/icons",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-avatar",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-context-menu",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-hover-card",
      "@radix-ui/react-label",
      "@radix-ui/react-menubar",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-progress",
      "@radix-ui/react-radio-group",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-slot",
      "@radix-ui/react-switch",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group",
      "@radix-ui/react-tooltip",
    ],
  },

  // Long-cache static assets we own under /public/images/.
  // (Next already serves /_next/static with immutable cache; no need to override.)
  async headers() {
    return [
      {
        source: "/images/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
