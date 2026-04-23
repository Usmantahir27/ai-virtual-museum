"use client";

import { motion } from "framer-motion";
import { transitions } from "@/lib/tokens";

interface TimelineNodeProps {
  name: string;
  dateLabel: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function TimelineNode({
  name,
  dateLabel,
  isSelected,
  onClick,
}: TimelineNodeProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.25 }}
      transition={transitions.fast}
      className="group flex flex-col items-center gap-2 focus:outline-none"
      aria-label={`${name}, ${dateLabel}`}
    >
      {/* Glow circle */}
      <span className="relative flex items-center justify-center">
        <span
          className={
            "absolute h-8 w-8 rounded-full bg-gold/20 blur-md transition-opacity duration-500 " +
            (isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60")
          }
        />
        <span
          className={
            "relative h-4 w-4 rounded-full border border-gold/60 transition-colors duration-300 " +
            (isSelected
              ? "bg-gold shadow-[0_0_12px_rgba(212,160,23,0.6)]"
              : "bg-gold/70 group-hover:bg-gold")
          }
          style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
        />
      </span>

      {/* Label — with background to sit above the timeline band */}
      <span className="max-w-[120px] rounded-sm bg-obsidian/80 px-1.5 py-0.5 text-center font-display text-[0.65rem] uppercase leading-tight tracking-[0.1em] text-parchment/80 transition-colors duration-300 group-hover:text-parchment">
        {name}
      </span>
      <span className="rounded-sm bg-obsidian/80 px-1 font-mono text-[0.6rem] text-parchment/50">
        {dateLabel}
      </span>
    </motion.button>
  );
}
