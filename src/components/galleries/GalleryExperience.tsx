"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { transitions } from "@/lib/tokens";
import Link from "next/link";
import GallerySelector, { type GalleryId } from "./GallerySelector";
import GalleryRoom from "@/components/3d/GalleryRoom";
import type { GalleryArtifact } from "@/components/3d/GalleryRoom";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getArtifactsByCivilization } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Per-gallery artifacts from real data                               */
/* ------------------------------------------------------------------ */

const civIdMap: Record<GalleryId, string> = {
  egypt: "civ-egypt",
  greece: "civ-greece",
  mesopotamia: "civ-mesopotamia",
  rome: "civ-rome",
};

const galleryColors: Record<GalleryId, string[]> = {
  egypt: ["#D4A017", "#C9A96E", "#A08836"],
  greece: ["#4A90D9", "#D0D0D0", "#5A7D9A"],
  mesopotamia: ["#C1440E", "#D4A574", "#A0522D"],
  rome: ["#C0C0C0", "#8B0000", "#B8860B"],
};

function getGalleryArtifacts(id: GalleryId): GalleryArtifact[] {
  const real = getArtifactsByCivilization(civIdMap[id]).slice(0, 3);
  const colors = galleryColors[id];
  return real.map((a, i) => ({
    name: a.name,
    color: colors[i % colors.length],
    imageUrl: a.imageUrl,
    slug: a.slug,
  }));
}

const galleryTitles: Record<GalleryId, string> = {
  egypt: "Egyptian Gallery",
  greece: "Greek Gallery",
  mesopotamia: "Mesopotamian Gallery",
  rome: "Roman Gallery",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GalleryExperience() {
  const [selectedGallery, setSelectedGallery] = useState<GalleryId | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<GalleryArtifact | null>(null);

  const handleArtifactClick = useCallback((artifact: GalleryArtifact) => {
    setSelectedArtifact((prev) => (prev?.name === artifact.name ? null : artifact));
  }, []);

  // ESC to exit fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFullscreen]);

  const galleryContent = selectedGallery && (
    <>
      {/* Title bar + controls */}
      <div className="flex items-center justify-between px-4 py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (isFullscreen) {
              setIsFullscreen(false);
            } else {
              setSelectedGallery(null);
              setSelectedArtifact(null);
            }
          }}
        >
          &larr; {isFullscreen ? "Exit Fullscreen" : "Back"}
        </Button>
        <h2 className="font-display text-xl tracking-wide text-parchment">
          {galleryTitles[selectedGallery]}
        </h2>
        {!isFullscreen ? (
          <button
            onClick={() => setIsFullscreen(true)}
            className="flex items-center gap-2 border border-stone/30 px-3 py-1.5 font-display text-[0.65rem] uppercase tracking-[0.15em] text-parchment/60 transition-all hover:border-gold/50 hover:text-gold"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Fullscreen
          </button>
        ) : (
          <div className="w-20" />
        )}
      </div>

      {/* Gallery + info panel */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* 3D Gallery */}
        <div className={selectedArtifact ? "flex-1" : "w-full"} style={{ minHeight: isFullscreen ? "calc(100vh - 56px)" : 500 }}>
          <GalleryRoom
            theme={selectedGallery}
            artifacts={getGalleryArtifacts(selectedGallery)}
            onArtifactClick={handleArtifactClick}
          />
        </div>

        {/* Artifact info card — slides in from right */}
        <AnimatePresence>
          {selectedArtifact && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={transitions.stone}
              className="w-80 shrink-0 overflow-y-auto border-l border-stone/20 bg-obsidian/95 backdrop-blur-sm"
            >
              <div className="p-5">
                <button
                  onClick={() => setSelectedArtifact(null)}
                  className="mb-4 flex h-7 w-7 items-center justify-center rounded-sm border border-stone/30 text-stone transition-colors hover:border-gold/50 hover:text-parchment"
                >
                  &times;
                </button>

                {/* Image */}
                {selectedArtifact.imageUrl && (
                  <div className="mb-4 aspect-[4/3] overflow-hidden border border-stone/20">
                    <img
                      src={selectedArtifact.imageUrl}
                      alt={selectedArtifact.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <h3 className="font-display text-lg tracking-wide text-parchment">
                  {selectedArtifact.name}
                </h3>

                <div className="mt-2">
                  <Badge variant="civilization">
                    {galleryTitles[selectedGallery].replace(" Gallery", "")}
                  </Badge>
                </div>

                {selectedArtifact.slug && (
                  <Link
                    href={`/artifact/${selectedArtifact.slug}`}
                    className="mt-5 inline-block w-full border border-gold px-4 py-2 text-center font-display text-xs uppercase tracking-[0.15em] text-parchment transition-shadow hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]"
                  >
                    View Full Details &rarr;
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!selectedGallery ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.stone}
          >
            <GallerySelector onSelect={setSelectedGallery} />
          </motion.div>
        ) : isFullscreen ? (
          /* Fullscreen overlay */
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="gallery-fullscreen flex flex-col"
            onClick={(e) => {
              // Click on backdrop (not on content) exits fullscreen
              if (e.target === e.currentTarget) setIsFullscreen(false);
            }}
          >
            {galleryContent}
          </motion.div>
        ) : (
          <motion.div
            key="room"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.stone}
            className="flex flex-col"
          >
            {galleryContent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
