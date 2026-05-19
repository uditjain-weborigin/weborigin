"use client";

import { useEffect } from "react";

/**
 * SmoothScroll - High-performance inertial scroll using Lenis.
 *
 * Performance notes:
 *  - Lenis is dynamically imported AFTER first paint so it never blocks
 *    hydration, LCP, or TTI.
 *  - Skipped entirely on touch devices and when the user has
 *    `prefers-reduced-motion: reduce`.
 *  - Uses `requestIdleCallback` (with a `setTimeout` fallback) so we never
 *    fight the browser for the main thread during the critical path.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || isTouch) return;

    let lenis: { destroy: () => void; raf: (time: number) => void } | null =
      null;
    let rafId = 0;
    let cancelled = false;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    // Defer until the browser is idle so we never block first paint.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    const idle =
      w.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const id = idle(start);

    return () => {
      cancelled = true;
      if (typeof id === "number") clearTimeout(id);
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
