"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { label: "UI/UX Design", href: "#services" },
      { label: "Web Development", href: "#services" },
      { label: "Performance & SEO", href: "#services" },
      { label: "Analytics & CRO", href: "#services" },
    ],
    Company: [
      { label: "Our Work", href: "#portfolio" },
      { label: "How We Work", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact Us", href: "#contact" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Refund Policy", href: "#refunds" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/weborigin", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/weborigin",
      label: "LinkedIn",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/weborigin_in",
      label: "Twitter",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/weborigin.in",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="text-2xl font-heading font-bold text-primary mb-4">
              Web Origin
            </div>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-5">
              A full-service digital studio based in India, building websites
              and web apps for ambitious brands worldwide.
            </p>
            <p className="text-xs text-muted-foreground">
              📍 Bangalore, India · Remote-first
            </p>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx + 1) * 0.1 }}
            >
              <h3 className="font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {currentYear} Web Origin Studio Pvt. Ltd. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  whileHover={{ y: -3 }}
                  aria-label={social.label}
                >
                  <Icon size={15} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
