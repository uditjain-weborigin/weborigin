"use client";

import { motion } from "framer-motion";
import { MessageSquare, Compass, Layers, Rocket } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
  duration: string;
}

const steps: ProcessStepProps[] = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We spend 60 minutes understanding your business, users, competitors, and goals — no templates, no checklists.",
    detail: "Business audit · User research · Competitive analysis",
    icon: <MessageSquare className="w-5 h-5" />,
    duration: "Week 1",
  },
  {
    number: "02",
    title: "Strategy & Architecture",
    description:
      "We map the sitemap, user flows, and technical stack. You see the full plan before a single pixel is designed.",
    detail: "Sitemap · Tech stack · Project roadmap",
    icon: <Compass className="w-5 h-5" />,
    duration: "Week 1–2",
  },
  {
    number: "03",
    title: "Design & Build",
    description:
      "High-fidelity designs, then production code. Weekly check-ins so you're never out of the loop.",
    detail: "Figma designs · Component dev · QA testing",
    icon: <Layers className="w-5 h-5" />,
    duration: "Week 2–5",
  },
  {
    number: "04",
    title: "Launch & Grow",
    description:
      "We deploy, monitor, and don't disappear. Post-launch support, analytics setup, and iteration cycles included.",
    detail: "CI/CD deploy · Analytics · 30-day support",
    icon: <Rocket className="w-5 h-5" />,
    duration: "Week 5–6",
  },
];

export function Process() {
  return (
    <SectionWrapper id="process" gradient>
      <div className="text-center mb-16">
        <ScrollReveal>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            How We Work
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            From Brief to Live in 6 Weeks
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A transparent, structured process. No surprise invoices. No scope
            creep. No ghosting.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 0.1}>
            <motion.div
              className="relative p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 group overflow-hidden"
              whileHover={{ translateY: -4 }}
            >
              {/* Step number watermark */}
              <div className="absolute -top-4 -right-2 text-8xl font-heading font-bold text-primary/4 group-hover:text-primary/8 transition-colors select-none">
                {step.number}
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    {step.icon}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium bg-muted px-2.5 py-1 rounded-full">
                    {step.duration}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {step.detail.split(" · ").map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
