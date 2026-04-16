"use client";

import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";

export function GlobalReach() {
  const dots = [
    {
      start: { lat: 28.6139, lng: 77.209 },
      end: { lat: 37.7749, lng: -122.4194 },
    }, // New Delhi to SF
    {
      start: { lat: 28.6139, lng: 77.209 },
      end: { lat: 51.5074, lng: -0.1278 },
    }, // New Delhi to London
    {
      start: { lat: 28.6139, lng: 77.209 },
      end: { lat: -33.8688, lng: 151.2093 },
    }, // New Delhi to Sydney
    {
      start: { lat: 28.6139, lng: 77.209 },
      end: { lat: -23.5505, lng: -46.6333 },
    }, // New Delhi to Sao Paulo
    {
      start: { lat: 28.6139, lng: 77.209 },
      end: { lat: 35.6764, lng: 139.65 },
    }, // New Delhi to Tokyo
    {
      start: { lat: 28.6139, lng: 77.209 },
      end: { lat: 6.5244, lng: 3.3792 },
    }, // New Delhi to Lagos
    {
      start: { lat: 28.6139, lng: 77.209 },
      end: { lat: 25.2048, lng: 55.2708 },
    }, // New Delhi to Dubai
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            A Global Digital Footprint
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            We've shipped winning platforms for startups and enterprises across
            every major continent. Our brilliant solutions cross borders.
          </motion.p>
        </div>

        <div className="w-full relative mt-8">
          <WorldMap dots={dots} />
        </div>
      </div>
    </section>
  );
}
