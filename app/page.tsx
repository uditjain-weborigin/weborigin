import dynamic from "next/dynamic";
import { HeroReak } from "@/components/hero-reak";
import { NavbarReak } from "@/components/navbar-reak";
import { MarqueeTrack } from "@/components/marquee-track";

/**
 * Performance strategy
 *  - Above-the-fold (Navbar + Hero + Marquee): direct, eager imports so the
 *    LCP markup ships in the first SSR HTML payload.
 *  - Heavy interactive sections that the user only sees after scrolling
 *    (AboutReak with WebGL shader, GlobalReach with WorldMap, Portfolio,
 *    Pricing, etc.) are split into their own JS chunks with `dynamic()` so
 *    they don't bloat the initial bundle or block hydration.
 *  - We KEEP `ssr: true` so the HTML is still pre-rendered for SEO/AEO.
 */
const AboutReak = dynamic(() =>
  import("@/components/about-reak").then((mod) => mod.AboutReak),
);
const Metrics = dynamic(() =>
  import("@/components/metrics").then((mod) => mod.Metrics),
);
const GlobalReach = dynamic(() =>
  import("@/components/global-reach").then((mod) => mod.GlobalReach),
);
const Services = dynamic(() =>
  import("@/components/services").then((mod) => mod.Services),
);
const Portfolio = dynamic(() =>
  import("@/components/portfolio").then((mod) => mod.Portfolio),
);
const Process = dynamic(() =>
  import("@/components/process").then((mod) => mod.Process),
);
const Testimonials = dynamic(() =>
  import("@/components/testimonials").then((mod) => mod.Testimonials),
);
const Pricing = dynamic(() =>
  import("@/components/pricing").then((mod) => mod.Pricing),
);
const CTA = dynamic(() => import("@/components/cta").then((mod) => mod.CTA));
const Footer = dynamic(() =>
  import("@/components/footer").then((mod) => mod.Footer),
);

export default function Home() {
  return (
    <main
      id="main-content"
      className="relative w-full overflow-hidden bg-background"
    >
      <NavbarReak />
      <HeroReak />
      {/* <MarqueeTrack /> */}

      <AboutReak />
      <Metrics />
      <GlobalReach />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
