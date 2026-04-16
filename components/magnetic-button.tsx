"use client";

import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  strength, // unused now
  as: Tag = "button",
  href,
  onClick,
}: MagneticButtonProps) {
  const innerProps = Tag === "a" ? { href, onClick } : { onClick };

  return (
    <div className="inline-block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Tag className={className} {...(innerProps as Record<string, unknown>)}>
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}
