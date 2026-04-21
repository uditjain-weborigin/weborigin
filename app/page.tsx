import dynamic from "next/dynamic";
import { HeroReak } from "@/components/hero-reak";
import { NavbarReak } from "@/components/navbar-reak";

const AboutReak = dynamic(
  () => import("@/components/about-reak").then((mod) => mod.AboutReak),
  { ssr: true },
);
const MarqueeTrack = dynamic(
  () => import("@/components/marquee-track").then((mod) => mod.MarqueeTrack),
  { ssr: true },
);
const Metrics = dynamic(
  () => import("@/components/metrics").then((mod) => mod.Metrics),
  { ssr: true },
);
const GlobalReach = dynamic(
  () => import("@/components/global-reach").then((mod) => mod.GlobalReach),
  { ssr: true },
);
const Services = dynamic(
  () => import("@/components/services").then((mod) => mod.Services),
  { ssr: true },
);
const Portfolio = dynamic(
  () => import("@/components/portfolio").then((mod) => mod.Portfolio),
  { ssr: true },
);
const Process = dynamic(
  () => import("@/components/process").then((mod) => mod.Process),
  { ssr: true },
);
const Testimonials = dynamic(
  () => import("@/components/testimonials").then((mod) => mod.Testimonials),
  { ssr: true },
);
const Pricing = dynamic(
  () => import("@/components/pricing").then((mod) => mod.Pricing),
  { ssr: true },
);
const CTA = dynamic(() => import("@/components/cta").then((mod) => mod.CTA), {
  ssr: true,
});
const Footer = dynamic(
  () => import("@/components/footer").then((mod) => mod.Footer),
  { ssr: true },
);

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative w-full overflow-hidden bg-background"
    >
      {/* Navigation — Reak Brand Agency Dark style */}
      <NavbarReak />

      {/* Hero Section — Reak Brand Agency Dark style */}
      <HeroReak />

      {/* About Section — "Not just another agency" */}
      <AboutReak />

      {/* Tech Stack Marquee — sits between Hero and Metrics */}
      <MarqueeTrack />

      {/* Metrics Section */}
      <Metrics />

      {/* Global Reach */}
      <GlobalReach />

      {/* Services Section */}
      <Services />

      {/* Portfolio Section */}
      <Portfolio />

      {/* Process Section */}
      <Process />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Pricing Section */}
      <Pricing />

      {/* Call to Action */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  );
}
