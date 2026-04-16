"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, ArrowUpRight } from "lucide-react";

/**
 * HeroReak – Brand Agency Hero
 *
 * Implements a "Z-index Sandwich" with Mouse Parallax:
 * 1. Bottom: Solid "CRAFTING" (Moves with mouse)
 * 2. Middle: Rotating Globe with Atmosphere (Moves opposite)
 * 3. Top: Stroke-only "BRAND" (Moves slightly less)
 */

const services = [
  "Brand Strategy",
  "Product Design",
  "Website Development",
  "SEO & Marketing",
];

export function HeroReak() {
  // Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  // Layer Transforms
  const textX = useTransform(sx, [-0.5, 0.5], ["-30px", "30px"]);
  const textY = useTransform(sy, [-0.5, 0.5], ["-15px", "15px"]);

  const globeX = useTransform(sx, [-0.5, 0.5], ["20px", "-20px"]);
  const globeY = useTransform(sy, [-0.5, 0.5], ["10px", "-10px"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      className="relative pt-[120px] pb-[40px] md:pt-[160px] md:pb-[60px] lg:pt-[200px] lg:pb-[80px] xl:pt-[260px] xl:pb-[110px] bg-no-repeat bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/hero-5-bg.jpg')" }}
    >
      <div className="w-full max-w-[1750px] mx-auto px-[15px]">
        {/* ── Title Area (Z-index Sandwich + Parallax) ── */}
        <div className="relative mb-[60px] md:mb-[80px] lg:mb-[100px] xl:mb-[140px]">
          {/* Layer 1: Bottom Text (Solid) */}
          <motion.div
            className="relative z-10 text-center pointer-events-none"
            style={{ x: textX, y: textY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display font-bold leading-[0.85] tracking-[-0.04em] text-white uppercase text-[80px] md:text-[140px] lg:text-[180px] xl:text-[240px] 2xl:text-[280px]">
              CRAFTING
            </h1>
          </motion.div>

          {/* Layer 2: Middle (The Globe + Atmosphere) */}
          <motion.div
            className="absolute top-[45%] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            style={{ x: globeX, y: globeY, left: "50%" }}
            initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] xl:w-[750px] xl:h-[750px] rounded-full overflow-hidden globe-atmosphere after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,black_0%,transparent_60%)]">
              <Image
                src="/images/glob.png"
                alt="Globe"
                width={750}
                height={750}
                className="w-full h-full object-cover animate-globe-spin"
                priority
              />
            </div>
          </motion.div>

          {/* Layer 3: Top Text (Stroke) */}
          <motion.div
            className="relative z-30 text-center mt-[-20px] md:mt-[-40px] lg:mt-[-60px] xl:mt-[-80px] pointer-events-none"
            style={{ x: textX, y: textY }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="font-display font-bold leading-[0.85] tracking-[-0.04em] uppercase text-[80px] md:text-[140px] lg:text-[180px] xl:text-[240px] 2xl:text-[280px] text-transparent"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
            >
              BRAND
            </h1>
          </motion.div>
        </div>

        {/* ── Bottom Content Bar ── */}
        <div className="relative z-40 mt-[40px] md:mt-0">
          <div className="flex flex-wrap -mx-[15px] items-end">
            {/* Left: Services list */}
            <div className="w-full md:w-1/2 lg:w-5/12 px-[15px] mb-[40px] md:mb-0">
              <motion.p
                className="font-display text-[12px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6 flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                What we do <ArrowDown size={14} />
              </motion.p>

              <nav className="space-y-0 border-t border-white/10 uppercase">
                {services.map((service, i) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href="#"
                      className="group flex justify-between items-center py-5 border-b border-white/10 text-white/80 text-[18px] md:text-[22px] font-bold no-underline transition-all duration-300 hover:text-white pl-0 hover:pl-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-white/20 group-hover:text-brand-primary">
                          0{i + 1}
                        </span>
                        <span className="font-display tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                          {service}
                        </span>
                      </div>
                      <span className="opacity-60 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white">
                        <ArrowRight size={18} />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Right: Description + CTA */}
            <div className="w-full md:w-1/2 lg:w-7/12 px-[15px] flex md:justify-end">
              <motion.div
                className="max-w-[480px]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <div className="mb-10 text-[16px] md:text-[18px] leading-[1.6]">
                  <p className="text-white font-medium mb-4">
                    WebOrigin is a full-service Digital Agency creating{" "}
                    <span className="text-brand-primary">premium</span> brand
                    experiences.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We are an award-winning design and art group specializing in
                    branding, web design, and high-end engineering. We turn
                    ideas into visceral digital products.
                  </p>
                </div>

                <motion.a
                  href="#portfolio"
                  className="group/btn inline-flex items-center justify-between gap-3 py-2.5 px-6 pr-2 rounded-full text-[15px] font-semibold uppercase text-white border border-white/20 backdrop-blur-3xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                  whileHover="hover"
                  initial="initial"
                >
                  <span className="relative overflow-hidden h-[1.2em] flex flex-col">
                    <motion.span
                      variants={{
                        initial: { y: 0 },
                        hover: { y: "-100%" },
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                    >
                      View our works
                    </motion.span>
                    <motion.span
                      variants={{
                        initial: { y: "0%" },
                        hover: { y: "-100%" },
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 block text-brand-primary"
                    >
                      View our works
                    </motion.span>
                  </span>

                  <motion.span
                    variants={{
                      initial: { scale: 1 },
                      hover: { scale: 1.1, rotate: 45 },
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[42px] w-[42px] rounded-full bg-white text-black inline-flex items-center justify-center flex-shrink-0"
                  >
                    <ArrowUpRight size={18} />
                  </motion.span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
