"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Code2,
  Zap,
  BarChart3,
  Search,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

const services = [
  {
    number: "01",
    icon: Palette,
    title: "UI/UX Design",
    description:
      "We obsess over the details — from user flows to micro-interactions. Every screen we design has a job to do, and it does it beautifully.",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    tag: "Design",
  },
  {
    number: "02",
    icon: Code2,
    title: "Web Development",
    description:
      "Next.js, React, TypeScript — we build fast, accessible, and maintainable web apps that scale without breaking a sweat.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
    tag: "Engineering",
  },
  {
    number: "03",
    icon: Zap,
    title: "Performance Optimization",
    description:
      "A 1-second delay costs you 7% conversions. We audit, rebuild, and ship sites that score 95+ on Lighthouse, every time.",
    tags: ["Core Web Vitals", "Lighthouse", "CDN", "Caching"],
    tag: "Core Web Vitals",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Analytics & CRO",
    description:
      "We set up GA4, Hotjar, and A/B tests to turn your traffic into data — then use that data to turn clicks into customers.",
    tags: ["GA4", "Hotjar", "A/B Testing", "Funnels"],
    tag: "Growth",
  },
  {
    number: "05",
    icon: Search,
    title: "Technical SEO",
    description:
      "Schema markup, Core Web Vitals, structured content — we handle the technical SEO that agencies skip and Google rewards.",
    tags: ["Schema", "Sitemaps", "Crawl Audit", "Page Speed"],
    tag: "Organic Growth",
  },
  {
    number: "06",
    icon: ShieldCheck,
    title: "Security & Maintenance",
    description:
      "Monthly updates, vulnerability scans, and 99.9% uptime SLA. Your site stays live, fast, and safe — we handle it so you don't have to.",
    tags: ["SSL", "Uptime Monitoring", "Backups", "Monthly Updates"],
    tag: "Reliability",
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="services">
      <div className="text-center mb-16">
        <ScrollReveal>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="text-fluid-section font-heading font-bold mb-4">
            One Studio. Every Capability.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            No handoffs, no miscommunication. Strategy, design, and dev happen
            in the same room.
          </p>
        </ScrollReveal>
      </div>

      {/* Interactive numbered list */}
      <div className="divide-y divide-border">
        {services.map((service, i) => {
          const Icon = service.icon;
          const isActive = activeIndex === i;

          return (
            <ScrollReveal key={service.number} delay={i * 0.05}>
              <motion.div
                className={`group cursor-pointer transition-colors duration-300 ${
                  isActive ? "bg-primary/3" : "hover:bg-muted/30"
                }`}
                onHoverStart={() => setActiveIndex(i)}
                onHoverEnd={() => setActiveIndex(null)}
              >
                {/* Row header — always visible */}
                <div className="flex items-center justify-between py-6 px-2 md:px-4">
                  {/* Left: number + icon + title */}
                  <div className="flex items-center gap-5 md:gap-8">
                    <span
                      className={`text-sm font-mono font-bold tabular-nums transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-muted-foreground/40"
                      }`}
                    >
                      {service.number}
                    </span>

                    <motion.div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon size={16} />
                    </motion.div>

                    <h3
                      className={`text-lg md:text-xl font-heading font-bold transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Right: tag + arrow */}
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-xs text-muted-foreground font-medium bg-muted px-2.5 py-1 rounded-full">
                      {service.tag}
                    </span>
                    <motion.div
                      animate={{
                        rotate: isActive ? 45 : 0,
                        color: isActive ? "#39ff14" : "#8a8795",
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      <ArrowUpRight size={18} />
                    </motion.div>
                  </div>
                </div>

                {/* Expandable panel */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 md:px-4 pb-6 pl-[4.5rem] md:pl-[6.25rem] flex flex-col sm:flex-row gap-6 items-start">
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg flex-1">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2 flex-shrink-0">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-full border border-primary/20 text-primary bg-primary/5"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
