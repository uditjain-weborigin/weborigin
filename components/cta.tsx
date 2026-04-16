"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Phone, CheckCircle2, Loader2 } from "lucide-react";
import { SectionWrapper } from "./section-wrapper";
import { ScrollReveal } from "./scroll-reveal";
import { GradientBlob } from "./gradient-blob";

// Formspree endpoint — free tier, up to 50 submissions/month
// Replace YOUR_FORM_ID with your actual Formspree form ID from formspree.io
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";

type FormState = "idle" | "loading" | "success" | "error";

export function CTA() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="relative overflow-hidden">
        <GradientBlob
          color="violet"
          size="lg"
          className="top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 opacity-10"
          animate={false}
        />
        <GradientBlob
          color="cyan"
          size="md"
          className="top-1/2 right-0 translate-x-1/2 -translate-y-1/2 opacity-8"
          animate={false}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Copy */}
            <ScrollReveal>
              <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
                Let&apos;s Talk
              </p>
              <h2 className="text-fluid-section font-heading font-bold mb-5 leading-tight">
                Got a Project in Mind?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed text-sm">
                Drop us a message and we&apos;ll get back within 24 hours with a
                personalised proposal. No boilerplate. No sales pitch. Just a
                real conversation about what you actually need.
              </p>

              {/* Contact details */}
              <div className="space-y-3">
                <a
                  href="mailto:hello@theweborigin.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Mail size={14} />
                  </div>
                  hello@theweborigin.com
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Phone size={14} />
                  </div>
                  +91 98765 43210
                </a>
              </div>

              {/* Trust signals */}
              <div className="mt-8 pt-8 border-t border-border space-y-2">
                {[
                  "Response within 24 hours",
                  "Free project audit included",
                  "No commitment required",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <CheckCircle2
                      size={13}
                      className="text-primary flex-shrink-0"
                    />
                    {t}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Right: Form */}
            <ScrollReveal delay={0.15}>
              <div className="p-7 rounded-2xl bg-card border border-border">
                <AnimatePresence mode="wait">
                  {formState === "success" ? (
                    <motion.div
                      key="success"
                      className="flex flex-col items-center justify-center text-center py-10 gap-4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <CheckCircle2 size={28} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-heading font-bold">
                        Message Sent!
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Thanks — we&apos;ll be in touch within 24 hours.
                      </p>
                      <button
                        onClick={() => setFormState("idle")}
                        className="text-xs text-primary hover:underline underline-offset-2"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className="text-lg font-heading font-bold mb-5">
                        Get a Free Quote
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="field-name"
                            className="text-xs text-muted-foreground mb-1.5 block"
                          >
                            Your name *
                          </label>
                          <input
                            id="field-name"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            autoComplete="name"
                            placeholder="Rahul Mehra"
                            className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="field-email"
                            className="text-xs text-muted-foreground mb-1.5 block"
                          >
                            Work email *
                          </label>
                          <input
                            id="field-email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            placeholder="rahul@company.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="field-message"
                          className="text-xs text-muted-foreground mb-1.5 block"
                        >
                          Tell us about your project *
                        </label>
                        <textarea
                          id="field-message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          placeholder="What are you building? What's your budget and timeline?"
                          rows={4}
                          className="w-full px-4 py-2.5 rounded-xl bg-input border border-border text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                        />
                      </div>

                      {formState === "error" && (
                        <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                          Something went wrong. Please email us directly at
                          hello@theweborigin.com
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={formState === "loading"}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-70 transition-all"
                        whileHover={{
                          scale: formState === "loading" ? 1 : 1.02,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {formState === "loading" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight size={16} />
                          </>
                        )}
                      </motion.button>

                      <p className="text-xs text-muted-foreground text-center">
                        We respond within 24 hours on business days.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
