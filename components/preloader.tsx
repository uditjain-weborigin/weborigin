"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show preloader on route change or initial load
    setIsLoading(true);

    const handleComplete = () => {
      // Ensure smooth transition away after rendering
      setTimeout(() => setIsLoading(false), 300);
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
      return () => window.removeEventListener("load", handleComplete);
    }
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-[40px]"
        >
          <div className="relative w-[100px] h-[100px]">
            <span className="absolute inline-block w-[100px] h-[100px] rounded-full bg-white opacity-50 animate-oit-preloader" />
            <span
              className="absolute inline-block w-[100px] h-[100px] rounded-full bg-white opacity-50 animate-oit-preloader"
              style={{ animationDelay: "-0.9s" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
