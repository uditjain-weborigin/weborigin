"use client";

import { ParticleSystem } from "@/components/particles";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HeroReak } from "@/components/hero-reak";
import { NavbarReak } from "@/components/navbar-reak";
import { MarqueeTrack } from "@/components/marquee-track";
import { Metrics } from "@/components/metrics";
import { GlobalReach } from "@/components/global-reach";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Process } from "@/components/process";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-background">
      {/* Background Elements */}
      {/* <ParticleSystem /> */}
      {/* <CustomCursor /> */}

      {/* Navigation — Reak Brand Agency Dark style */}
      <NavbarReak />

      {/* Hero Section — Reak Brand Agency Dark style */}
      <HeroReak />

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
