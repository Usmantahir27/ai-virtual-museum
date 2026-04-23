"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { transitions } from "@/lib/tokens";

interface CardProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  header,
  footer,
  children,
  className,
}: CardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        borderColor: "rgba(212, 160, 23, 0.5)",
      }}
      transition={transitions.stone}
      className={clsx(
        "border border-stone/30 bg-obsidian/80 transition-shadow hover:shadow-[0_8px_30px_rgba(212,160,23,0.1)]",
        className,
      )}
    >
      {header && (
        <div className="border-b border-stone/20 px-6 py-4">{header}</div>
      )}
      <div className="px-6 py-5">{children}</div>
      {footer && (
        <div className="border-t border-stone/20 px-6 py-4">{footer}</div>
      )}
    </motion.div>
  );
}
