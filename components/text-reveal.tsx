"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  stagger?: number;
  className?: string;
  delay?: number;
  /** 'word' (default) gives a more editorial feel than character stagger */
  mode?: "word" | "char";
}

export function TextReveal({
  text,
  stagger = 0.07,
  className = "",
  delay = 0,
  mode = "word",
}: TextRevealProps) {
  const items = mode === "word" ? text.split(" ") : text.split("");

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {item}
            {mode === "word" && i < items.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
