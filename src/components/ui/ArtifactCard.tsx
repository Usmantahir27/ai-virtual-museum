"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { transitions } from "@/lib/tokens";

interface ArtifactCardProps {
  name: string;
  civilization: string;
  dateRange: string;
  imageUrl?: string;
  provenance?: string;
  className?: string;
  transparencyLabel?: string | null;
}

export default function ArtifactCard({
  name,
  civilization,
  dateRange,
  imageUrl,
  provenance,
  className,
  transparencyLabel,
}: ArtifactCardProps) {
  return (
    <motion.article
      whileHover={{
        y: -6,
        borderColor: "rgba(212, 160, 23, 0.6)",
      }}
      transition={transitions.stone}
      className={clsx(
        "group flex h-full flex-col border border-stone/30 bg-obsidian/80 transition-shadow hover:shadow-[0_12px_40px_rgba(212,160,23,0.12)]",
        className,
      )}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-obsidian">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.43,0.13,0.23,0.96)] group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-obsidian to-obsidian/80">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-30"
            >
              {/* Amphora / vessel silhouette */}
              <path
                d="M18 8h12M20 8c-1 4-4 8-4 16 0 6 2 10 4 12h8c2-2 4-6 4-12 0-8-3-12-4-16M16 36h16c1 0 2 1 2 2v2H14v-2c0-1 1-2 2-2z"
                stroke="#C9A96E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 14c2 1 6 1 8 0"
                stroke="#C9A96E"
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
            <span className="font-display text-[0.6rem] uppercase tracking-[0.25em] text-stone/30">
              No Image Available
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 py-4">
        <h3 className="font-display text-lg tracking-wide text-parchment">
          {name}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-parchment/60">
          <span className="text-gold">●</span>
          <span>{civilization}</span>
          <span className="text-parchment/30">·</span>
          <span>{dateRange}</span>
        </p>
        {provenance && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-parchment/50">
            {provenance}
          </p>
        )}
        {transparencyLabel && (
          <p className="mt-3 border-t border-stone/20 pt-3 text-xs italic text-parchment/50">
            {transparencyLabel}
          </p>
        )}
      </div>
    </motion.article>
  );
}
