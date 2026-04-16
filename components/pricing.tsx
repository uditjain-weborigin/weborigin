"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

interface PlanProps {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  forWho: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const plans: PlanProps[] = [
  {
    name: "Starter",
    price: "₹29,999",
    priceNote: "one-time",
    description: "A fast, professional website to get you online and credible.",
    forWho: "Ideal for freelancers, consultants & small businesses",
    cta: "Get Started",
    features: [
      "Up to 5 pages (Home, About, Services, Blog, Contact)",
      "Mobile-first responsive design",
      "Basic on-page SEO setup",
      "Contact form with email notifications",
      "2 revision rounds",
      "30-day post-launch support",
    ],
  },
  {
    name: "Growth",
    price: "₹79,999",
    priceNote: "one-time",
    description:
      "A full-featured web presence built for traffic and conversions.",
    forWho: "For growing startups & D2C brands",
    cta: "Start the Conversation",
    highlighted: true,
    features: [
      "Up to 15 pages + CMS integration",
      "Custom UI/UX design (Figma → Code)",
      "Full technical SEO + schema markup",
      "GA4 + Hotjar analytics setup",
      "Performance audit (target 90+ Lighthouse)",
      "Unlimited revisions during build",
      "60-day post-launch support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceNote: "scoped to you",
    description:
      "End-to-end product design and engineering for complex platforms.",
    forWho: "For funded startups, SaaS & enterprise teams",
    cta: "Talk to Us",
    features: [
      "Full-stack web app development",
      "Design system + component library",
      "API integrations & backend services",
      "CI/CD pipeline & deployment setup",
      "Dedicated project manager",
      "Monthly retainer available",
      "Priority Slack support channel",
    ],
  },
];

export function Pricing() {
  return (
    <SectionWrapper id="pricing" gradient>
      <div className="text-center mb-14">
        <ScrollReveal>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-fluid-section font-heading font-bold mb-4">
            Honest Pricing. No Surprises.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Every project is scoped before we charge a rupee. If the numbers
            don&apos;t work for you, we&apos;ll tell you upfront.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {plans.map((plan, i) => (
          <ScrollReveal key={plan.name} delay={i * 0.1}>
            <motion.div
              className={`
                relative flex flex-col h-full p-7 rounded-2xl border transition-all duration-300
                ${
                  plan.highlighted
                    ? "border-primary/50 bg-gradient-to-b from-primary/8 to-card"
                    : "border-border bg-card hover:border-primary/30"
                }
              `}
              whileHover={{ translateY: -5 }}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold whitespace-nowrap">
                  Most Popular
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-lg font-heading font-bold mb-1">
                  {plan.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-5">
                  {plan.forWho}
                </p>

                <div className="flex items-end gap-1.5 mb-2">
                  <span className="text-4xl font-heading font-bold">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground text-sm mb-1">
                      {plan.priceNote}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* CTA */}
              <motion.a
                href="#contact"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm mb-7 transition-all ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.cta}
                <ArrowUpRight size={14} />
              </motion.a>

              {/* Divider */}
              <div className="border-t border-border mb-6" />

              {/* Features */}
              <div className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom note */}
      <ScrollReveal>
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Need something in between? All plans are customisable.{" "}
            <a
              href="#contact"
              className="text-primary hover:underline underline-offset-2"
            >
              Let&apos;s talk ↗
            </a>
          </p>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
