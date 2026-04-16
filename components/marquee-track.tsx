"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const startups = [
  "Zerodha",
  "Razorpay",
  "CRED",
  "Meesho",
  "Postman",
  "Groww",
  "Swiggy",
  "Zomato",
  "Oyo",
  "Zepto",
  "Paytm",
  "Lenskart",
  "PhonePe",
  "Spinny",
];

export function MarqueeTrack() {
  const baseX = useMotionValue(0);
  const baseVelocity = -0.8; // Slower, more premium scroll speed

  useAnimationFrame((_, delta) => {
    const moveBy = baseVelocity * (delta / 16);
    const current = baseX.get();
    // Reset when scrolling far enough
    baseX.set(current <= -1800 ? 0 : current + moveBy);
  });

  const items = [...startups, ...startups, ...startups];

  return (
    <div className="relative w-full py-16 md:py-24 overflow-hidden border-y border-border/60 bg-background/50">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center whitespace-nowrap"
        style={{ x: baseX }}
      >
        {items.map((startup, i) => (
          <span
            key={`${startup}-${i}`}
            className="inline-flex items-center mx-12 md:mx-20"
          >
            {/* 
              Stylized to look like a grayscale logo/wordmark 
              - Added pb-2 and leading-relaxed to prevent descender clipping on letters like 'g', 'y', 'p'
            */}
            <span className="text-2xl md:text-4xl font-heading font-extrabold text-muted-foreground/30 hover:text-muted-foreground/70 transition-colors cursor-default select-none tracking-tighter lowercase leading-relaxed pb-2 pt-1">
              {startup}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
