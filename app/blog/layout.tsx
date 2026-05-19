import dynamic from "next/dynamic";

import { NavbarReak } from "@/components/navbar-reak";

const Footer = dynamic(
  () => import("@/components/footer").then((mod) => mod.Footer),
  { ssr: true },
);

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-hidden bg-background">
      <NavbarReak />
      {children}
      <Footer />
    </div>
  );
}
