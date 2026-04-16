"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";
import Image from "next/image";

const categories = ["All", "E-Commerce", "SaaS", "Mobile", "Branding"] as const;
type Category = (typeof categories)[number];

interface ProjectProps {
  title: string;
  description: string;
  outcome: string;
  category: Exclude<Category, "All">;
  image: string;
  size: "tall" | "wide" | "square";
}

const projects: ProjectProps[] = [
  {
    title: "LuxeCart",
    description: "Premium e-commerce platform for a luxury fashion brand",
    outcome: "+340% conversion rate",
    category: "E-Commerce",
    image: "/portfolio-ecommerce.png",
    size: "tall",
  },
  {
    title: "PulseMetrics",
    description: "Real-time SaaS analytics dashboard for enterprise clients",
    outcome: "Launched in 6 weeks",
    category: "SaaS",
    image: "/portfolio-saas.png",
    size: "square",
  },
  {
    title: "Nexus Brand",
    description: "Full brand identity and design system for a Series A fintech",
    outcome: "Raised ₹12Cr post-launch",
    category: "Branding",
    image: "/portfolio-brand.png",
    size: "square",
  },
  {
    title: "FinFlow App",
    description: "B2C fintech app with 50k+ downloads in first 3 months",
    outcome: "4.8★ App Store rating",
    category: "Mobile",
    image: "/portfolio-mobile.png",
    size: "wide",
  },
  {
    title: "BuildDesk",
    description: "Enterprise project management platform with real-time collab",
    outcome: "3,200 active teams",
    category: "SaaS",
    image: "/portfolio-platform.png",
    size: "square",
  },
];

const sizeClasses = {
  tall: "row-span-2 min-h-[440px]",
  wide: "col-span-2 min-h-[240px]",
  square: "min-h-[240px]",
};

export function Portfolio() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <SectionWrapper id="portfolio">
      <div className="text-center mb-12">
        <ScrollReveal>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Our Work
          </p>
          <h2 className="text-fluid-section font-heading font-bold mb-4">
            Results You Can Measure
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Every project has a story. Here are a few that moved the needle.
          </p>
        </ScrollReveal>
      </div>

      {/* Filter tabs */}
      <ScrollReveal>
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
              whileTap={{ scale: 0.96 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </ScrollReveal>

      {/* Bento grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-colors duration-300 group ${sizeClasses[project.size]}`}
            >
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/96 via-background/20 to-transparent" />

              {/* Outcome badge — top left */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-sm text-[11px] text-primary font-semibold">
                  {project.outcome}
                </span>
              </div>

              {/* Category chip — top right */}
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 rounded-full bg-background/60 border border-border backdrop-blur-sm text-[11px] text-muted-foreground">
                  {project.category}
                </span>
              </div>

              {/* Content — clip-path reveal from bottom */}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="text-lg font-heading font-bold mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {project.description}
                </p>

                {/* CTA link — slides in on hover */}
                <motion.div
                  className="flex items-center gap-1.5 text-primary text-xs font-semibold"
                  initial={{ opacity: 0, y: 6 }}
                  whileHover={{ opacity: 1, y: 0 }}
                ></motion.div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                >
                  View Case Study
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
