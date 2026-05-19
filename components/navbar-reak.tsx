"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";

/**
 * NavbarReak – Enhanced version with Framer Motion, Scrollspy, and Premium Glassmorphism
 */

const navLinks = [
  { label: "Home", href: "/", section: "" },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Work", href: "/#portfolio", section: "portfolio" },
  { label: "Blog", href: "/blog", section: "blog" },
  { label: "Pricing", href: "/#pricing", section: "pricing" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export function NavbarReak() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle Scroll state
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      if (window.scrollY < 60) setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking (Scrollspy) — only meaningful on the homepage
  useEffect(() => {
    const sections = navLinks
      .map((l) => l.section)
      .filter((s) => s && s !== "blog");
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={[
          "fixed top-0 left-0 right-0 z-1000",
          "transition-[background,padding,backdrop-filter] duration-500 ease-in-out",
          "py-[25px]",
          scrolled
            ? "bg-black/40 backdrop-blur-xl py-[14px]! border-b border-white/10"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="w-full max-w-[1750px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex-none"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/" className="group">
              <Image
                src="/theweborigin.svg"
                alt="The Web Origin logo"
                width={180}
                height={36}
                className="brightness-110 contrast-125 transition-all duration-400 cubic-bezier(0.22,1,0.36,1)"
                style={{
                  width: scrolled ? "150px" : "180px",
                  height: scrolled ? "30px" : "36px",
                }}
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation">
            <ul className="hidden xl:flex items-center list-none m-0 p-0 gap-10">
              {navLinks.map((item, i) => {
                const isActive = activeSection === item.section;
                return (
                  <motion.li
                    key={item.label}
                    className="relative px-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={[
                        "flex items-center gap-1.5 text-[14px] uppercase tracking-widest font-bold no-underline transition-all duration-300 whitespace-nowrap",
                        isActive
                          ? "text-white"
                          : "text-white/40 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-bubble"
                        className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-white rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-6">
            {/* CTA */}
            <motion.a
              href="/#contact"
              className="hidden xl:inline-flex items-center justify-between gap-3 py-2.5 pl-[24px] pr-[10px] rounded-full text-[13px] font-bold uppercase tracking-wider text-white border border-white/20 backdrop-blur-3xl no-underline whitespace-nowrap"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.12)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Book a call</span>
              <span className="h-9 w-9 rounded-full bg-white text-black inline-flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </motion.a>

            {/* Hamburger */}
            <motion.button
              className="xl:hidden flex flex-col gap-[6px] cursor-pointer bg-transparent border-none p-2"
              onClick={() => setDrawerOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <span className="block w-[30px] h-[2px] bg-white rounded-full" />
              <span className="block w-[24px] h-[2px] bg-white rounded-full self-end" />
              <span className="block w-[30px] h-[2px] bg-white rounded-full" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer Overlay ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-1200 bg-[#05050a] flex flex-col px-[40px] pt-[40px] pb-[60px]"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between mb-16">
              <Link href="/" onClick={() => setDrawerOpen(false)}>
                <Image
                  src="/theweborigin.svg"
                  alt="The Web Origin logo"
                  width={160}
                  height={32}
                  className="brightness-125"
                  style={{ width: "160px", height: "32px" }}
                />
              </Link>
              <button
                className="bg-transparent border border-white/20 text-white w-12 h-12 rounded-full text-[28px] cursor-pointer flex items-center justify-center hover:bg-white/5 transition-colors"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation menu"
              >
                &times;
              </button>
            </div>

            {/* Drawer links */}
            <nav className="flex-1 flex flex-col justify-center gap-2">
              {navLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between font-display text-[48px] font-bold text-white/30 no-underline py-4 border-b border-white/5 transition-all duration-300 hover:text-white hover:pl-4"
                  >
                    <span>{item.label}</span>
                    <ArrowRight size={32} />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Drawer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href="/#contact"
                className="flex items-center justify-center gap-3 py-5 px-[40px] rounded-full text-lg font-bold uppercase tracking-widest text-black bg-white no-underline mt-[40px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => setDrawerOpen(false)}
              >
                Book a call
                <ArrowUpRight size={22} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
