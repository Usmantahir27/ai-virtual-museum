"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import clsx from "clsx";
import { transitions } from "@/lib/tokens";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-gold text-parchment hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]",
  secondary: "border-stone text-parchment hover:border-sandstone",
  ghost: "border-transparent text-stone hover:text-parchment",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-1.5 text-xs",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={transitions.fast}
      className={clsx(
        "inline-flex items-center justify-center border font-display uppercase tracking-[0.15em] transition-all",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
