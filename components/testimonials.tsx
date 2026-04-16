"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  initials: string;
  accentColor: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Rahul Mehra",
    role: "Founder & CEO",
    company: "FinFlow Technologies",
    content:
      "Web Origin didn't just build our app — they helped us rethink the entire user journey. Our Day 1 retention went from 22% to 61% after the redesign. That's the kind of impact that changes a business.",
    rating: 5,
    initials: "RM",
    accentColor: "bg-primary/20 text-primary",
  },
  {
    name: "Priya Nair",
    role: "Head of Product",
    company: "BuildDesk Inc.",
    content:
      "We'd worked with three agencies before Web Origin. None of them understood our technical constraints the way they did. They shipped in 6 weeks, on budget, zero scope creep. They're our default studio now.",
    rating: 5,
    initials: "PN",
    accentColor: "bg-secondary/20 text-secondary",
  },
  {
    name: "Arjun Kapoor",
    role: "Co-founder",
    company: "LuxeCart",
    content:
      "Our Shopify store was leaking conversions. After Web Origin's performance and UX overhaul, our conversion rate went from 0.9% to 3.8% in 60 days. ROI on this project was 11x.",
    rating: 5,
    initials: "AK",
    accentColor: "bg-primary/20 text-primary",
  },
  {
    name: "Sneha Iyer",
    role: "CMO",
    company: "PulseMetrics",
    content:
      "The design system they built for us alone was worth the entire contract. Our internal team can now ship new features 3× faster because the components are so well-structured. World-class work.",
    rating: 5,
    initials: "SI",
    accentColor: "bg-secondary/20 text-secondary",
  },
];

export function Testimonials() {
  const duplicated = [...testimonials, ...testimonials];

  return (
    <SectionWrapper id="testimonials">
      <div className="text-center mb-16">
        <ScrollReveal>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-3">
            Client Stories
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Hear It From the People We&apos;ve Helped
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Not testimonials we wrote ourselves. Actual words from actual
            founders and product leaders.
          </p>
        </ScrollReveal>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {duplicated.map((testimonial, i) => (
            <div
              key={`${testimonial.name}-${i}`}
              className="flex-shrink-0 w-[340px] sm:w-[400px]"
            >
              <motion.div
                className="h-full p-7 rounded-2xl bg-card border border-border hover:border-primary/40 transition-all duration-300 flex flex-col"
                whileHover={{ y: -6 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className="fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Quote icon */}
                <Quote size={20} className="text-primary/40 mb-3" />

                {/* Quote content */}
                <p className="text-sm text-foreground/90 leading-relaxed mb-6 flex-1">
                  {testimonial.content}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${testimonial.accentColor}`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
