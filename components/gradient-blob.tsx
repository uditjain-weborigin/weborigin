import { motion } from "framer-motion";

interface GradientBlobProps {
  className?: string;
  color?: "violet" | "cyan" | "coral";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function GradientBlob({
  className = "",
  color = "violet",
  size = "md",
  animate = true,
}: GradientBlobProps) {
  const sizeMap = {
    sm: "w-40 h-40",
    md: "w-80 h-80",
    lg: "w-[600px] h-[600px]",
  };

  const colorMap = {
    violet: "from-primary via-primary/50 to-transparent",
    cyan: "from-accent via-accent/50 to-transparent",
    coral: "from-destructive via-destructive/50 to-transparent",
  };

  return (
    <motion.div
      animate={
        animate
          ? {
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 180, 360],
            }
          : { scale: 1, opacity: 0.3, rotate: 0 }
      }
      transition={
        animate
          ? {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : undefined
      }
      className={`
        absolute pointer-events-none
        rounded-full blur-3xl
        ${sizeMap[size]}
        bg-gradient-to-r ${colorMap[color]}
        mix-blend-screen
        ${className}
      `}
    />
  );
}
