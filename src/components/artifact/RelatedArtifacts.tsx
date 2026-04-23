"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { transitions } from "@/lib/tokens";
import { useTransparency, getTransparencyLabel } from "@/lib/TransparencyContext";

interface RelatedArtifact {
  slug: string;
  name: string;
  civilization: string;
  dateRange: string;
  imageUrl?: string;
}

interface RelatedArtifactsProps {
  artifacts: RelatedArtifact[];
}

export default function RelatedArtifacts({ artifacts }: RelatedArtifactsProps) {
  const condition = useTransparency();
  const transparencyLabel = getTransparencyLabel(condition);

  if (artifacts.length === 0) return null;

  return (
    <div className="-mx-6 px-6">
      <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
        {artifacts.map((artifact, index) => (
          <motion.div
            key={artifact.slug}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              ...transitions.stoneSlide,
              delay: index * 0.1,
            }}
            className="snap-start"
          >
            <Link href={`/artifact/${artifact.slug}`} className="block">
              <article className="group w-56 shrink-0 border border-stone/20 bg-obsidian/60 transition-all hover:border-gold/40 hover:shadow-[0_8px_30px_rgba(212,160,23,0.1)]">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden bg-obsidian/80">
                  {artifact.imageUrl ? (
                    <img
                      src={artifact.imageUrl}
                      alt={artifact.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-30"
                      >
                        <path
                          d="M18 8h12M20 8c-1 4-4 8-4 16 0 6 2 10 4 12h8c2-2 4-6 4-12 0-8-3-12-4-16M16 36h16c1 0 2 1 2 2v2H14v-2c0-1 1-2 2-2z"
                          stroke="#C9A96E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="px-4 py-3">
                  <h4 className="font-display text-sm tracking-wide text-parchment transition-colors group-hover:text-gold">
                    {artifact.name}
                  </h4>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[0.65rem] text-parchment/50">
                    <span className="text-gold">●</span>
                    <span>{artifact.civilization}</span>
                    <span className="text-parchment/30">·</span>
                    <span>{artifact.dateRange}</span>
                  </p>
                  {transparencyLabel && (
                    <p className="mt-2 border-t border-stone/20 pt-2 text-[0.6rem] italic text-parchment/40">
                      {transparencyLabel}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
