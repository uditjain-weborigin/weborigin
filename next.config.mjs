/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "motion"],
  },
};

export default nextConfig;
