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
    // Initialize Lenis with premium 'inertial' settings
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.1, // Linear interpolation for smoothness
    });

    lenisRef.current = lenis;

    // Custom RAF loop for maximum performance
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
