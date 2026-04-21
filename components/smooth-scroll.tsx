"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll - High-performance inertial scroll using Lenis
 * Optimized for premium studio-grade fluidity.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for the absolute "maximum buttery smoothness" (simulating GSAP smooth: 1.5)
    const lenis = new Lenis({
      // We use a pure duration-based easing (Expo Out) instead of linear interpolation (lerp)
      // This is exactly how GSAP ScrollSmoother gets that heavy, premium momentum kick.
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo.easeOut
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1, // Keep at 1 so the initial flick feels natural
      syncTouch: false, // Allow native touch drag, but apply momentum after
      // lerp is deliberately omitted here so it doesn't conflict with duration/easing
    });

    lenisRef.current = lenis;

    // Custom RAF loop synced to browser refresh rate for maximum performance
    let rfId: number;
    function raf(time: number) {
      lenis.raf(time);
      rfId = requestAnimationFrame(raf);
    }
    rfId = requestAnimationFrame(raf);

    // Clean up
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rfId);
    };
  }, []);

  return <>{children}</>;
}
