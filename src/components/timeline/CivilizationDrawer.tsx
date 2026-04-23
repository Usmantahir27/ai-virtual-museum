"use client";

import { motion, AnimatePresence } from "framer-motion";
import { transitions } from "@/lib/tokens";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { artifacts as allArtifacts } from "@/lib/data";

interface Artifact {
  name: string;
  type: string;
  date: string;
}

export interface CivilizationData {
  id: string;
  name: string;
  dateLabel: string;
  region: string;
  description: string;
  artifacts: Artifact[];
}

interface CivilizationDrawerProps {
  civilization: CivilizationData | null;
  onClose: () => void;
}

function findRealArtifact(name: string) {
  const lower = name.toLowerCase();
  return allArtifacts.find(
    (a) =>
      a.name.toLowerCase() === lower ||
      a.name.toLowerCase().includes(lower) ||
      lower.includes(a.name.toLowerCase()),
  );
}

export default function CivilizationDrawer({
  civilization,
  onClose,
}: CivilizationDrawerProps) {
  return (
    <AnimatePresence mode="wait">
      {civilization && (
        <motion.div
          key={civilization.id}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={transitions.stoneSlide}
          className="mt-8 border-t-2 border-gold/50 bg-obsidian/90 px-8 py-8 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display text-2xl tracking-wide text-parchment">
                {civilization.name}
              </h3>
              <div className="mt-2 flex items-center gap-3">
                <span className="font-mono text-sm text-gold">
                  {civilization.dateLabel}
                </span>
                <Badge variant="civilization">{civilization.region}</Badge>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-sm border border-stone/30 text-stone transition-colors hover:border-gold/50 hover:text-parchment"
              aria-label="Close panel"
            >
              &times;
            </button>
          </div>

          {/* Description */}
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-parchment/70">
            {civilization.description}
          </p>

          {/* Artifact cards — equal sizes */}
          <div className="mt-6">
            <h4 className="mb-3 font-display text-xs uppercase tracking-[0.15em] text-gold/80">
              Notable Artifacts
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {civilization.artifacts.map((artifact) => {
                const real = findRealArtifact(artifact.name);
                const card = (
                  <div className="group flex h-full flex-col border border-stone/20 bg-obsidian/60 transition-all hover:border-gold/40 hover:shadow-[0_4px_20px_rgba(212,160,23,0.1)]">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden bg-obsidian/80">
                      {real?.imageUrl ? (
                        <img
                          src={real.imageUrl}
                          alt={artifact.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <svg
                            width="32"
                            height="32"
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
                    <div className="flex flex-1 flex-col px-4 py-3">
                      <p className="font-display text-xs tracking-wide text-parchment transition-colors group-hover:text-gold">
                        {artifact.name}
                      </p>
                      <div className="mt-auto flex items-center gap-2 pt-2">
                        <Badge variant="type">{artifact.type}</Badge>
                        <span className="font-mono text-[0.6rem] text-parchment/50">
                          {artifact.date}
                        </span>
                      </div>
                    </div>
                  </div>
                );

                return real ? (
                  <Link
                    key={artifact.name}
                    href={`/artifact/${real.slug}`}
                    className="block"
                  >
                    {card}
                  </Link>
                ) : (
                  <div key={artifact.name}>{card}</div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
