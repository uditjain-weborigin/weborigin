"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

interface MetricProps {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
  description: string;
}

const metrics: MetricProps[] = [
  {
    label: "Projects Shipped",
    value: 120,
    suffix: "+",
    description: "Across e-commerce, SaaS, fintech, and D2C brands",
  },
  {
    label: "Avg. Lighthouse Score",
    value: 96,
    suffix: "/100",
    description: "Performance score across all sites we've built",
  },
  {
    label: "Client Retention",
    value: 91,
    suffix: "%",
    description: "Clients who come back for a second project",
  },
  {
    label: "Time to Launch",
    value: 4,
    suffix: " wks",
    description: "Average time from brief to live for a standard site",
  },
];

function AnimatedCounter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(decimals)));
      }
    }, step);

    return () => clearInterval(timer);
  }, [isInView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Metrics() {
  return (
    <SectionWrapper id="metrics" gradient>
      <div className="text-center mb-14">
        <ScrollReveal>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Numbers Don&apos;t Lie
          </p>
          <h2 className="text-fluid-section font-heading font-bold mb-4">
            Built on Proof, Not Promises
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            We&apos;re transparent about our track record. Here&apos;s what
            working with us actually looks like.
          </p>
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric, i) => (
          <ScrollReveal key={metric.label} delay={i * 0.1} direction="up">
            <motion.div
              className="p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 text-center group"
              whileHover={{ translateY: -6, transition: { duration: 0.25 } }}
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </div>
              <h3 className="text-sm font-semibold mb-2">{metric.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
