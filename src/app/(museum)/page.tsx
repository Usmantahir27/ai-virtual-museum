"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ArtifactCard from "@/components/ui/ArtifactCard";
import Divider from "@/components/ui/Divider";
import { transitions } from "@/lib/tokens";
import { getFeaturedArtifacts, civilizations } from "@/lib/data";
import { useTransparency, getTransparencyLabel } from "@/lib/TransparencyContext";

// Dynamically import the 3D portal to avoid SSR issues with Three.js
const HeroPortal = dynamic(() => import("@/components/3d/HeroPortal"), {
  ssr: false,
});

function formatEra(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

const featuredArtifacts = getFeaturedArtifacts().slice(0, 4).map((a) => {
  const civ = civilizations.find((c) => c.id === a.civilizationId);
  return {
    slug: a.slug,
    name: a.name,
    civilization: civ?.name ?? a.civilizationId,
    dateRange: a.eraStart === a.eraEnd
      ? formatEra(a.eraStart)
      : `${formatEra(a.eraStart)} - ${formatEra(a.eraEnd)}`,
    provenance: a.provenance,
    imageUrl: a.imageUrl,
  };
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...transitions.goldReveal, delay: 0.3 + i * 0.15 },
  }),
};

export default function HomePage() {
  const condition = useTransparency();
  const transparencyLabel = getTransparencyLabel(condition);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <>
      {/* ── Research Disclaimer Modal ── */}
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-obsidian/80 pt-32 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.1, 1.0] }}
              className="mx-4 max-w-lg border border-stone/30 bg-obsidian px-8 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <h2 className="font-display text-xs uppercase tracking-[0.25em] text-gold">
                Research Disclaimer
              </h2>
              <p className="mt-5 font-body text-base leading-relaxed text-parchment/80">
                This website has been developed as part of an academic study
                aimed at evaluating user trust in AI-generated content. Visitors
                are kindly requested to complete the questionnaire provided at
                the end of the website, as their participation will contribute
                significantly to the research.
              </p>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="mt-8 w-full border border-gold/60 bg-transparent px-6 py-3 font-display text-xs uppercase tracking-[0.15em] text-gold transition-all duration-300 hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(212,160,23,0.15)]"
              >
                I Understand
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Section ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <HeroPortal />

        {/* Gradient overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian/80" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center px-4 text-center sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitions.goldReveal, delay: 0.2 }}
            className="font-display text-xs uppercase tracking-[0.25em] text-gold"
          >
            Welcome to
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitions.goldReveal, delay: 0.5 }}
            className="mt-4 font-display text-5xl tracking-[0.04em] text-gold sm:text-7xl md:text-9xl"
            style={{ lineHeight: 1.05 }}
          >
            ARCHAION
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitions.goldReveal, delay: 0.8 }}
            className="mt-6 max-w-lg font-body text-base leading-relaxed text-parchment/80 sm:text-xl md:text-2xl"
          >
            A Digital Sanctuary of Human Antiquity
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitions.goldReveal, delay: 1.1 }}
            className="mt-10"
          >
            <Link href="/collection">
              <Button variant="primary" size="lg">
                Enter the Museum
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent" />
      </section>

      {/* ── Divider ── */}
      <Divider variant="meander" className="mx-auto max-w-2xl" />

      {/* ── Featured Artifacts Section ── */}
      <section className="mx-auto max-w-6xl px-4 py-24 pt-32 sm:px-6 sm:pt-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="font-display text-xs uppercase tracking-[0.25em] text-gold"
          >
            The Collection
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-3 font-display text-4xl tracking-[0.03em] text-parchment md:text-5xl"
          >
            Featured Artifacts
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-4 max-w-md font-body text-lg text-parchment/60"
          >
            Explore masterworks spanning millennia of human civilization.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredArtifacts.map((artifact, i) => (
            <motion.div key={artifact.name} variants={fadeUp} custom={i}>
              <Link href={`/artifact/${artifact.slug}`}>
                <ArtifactCard
                  name={artifact.name}
                  civilization={artifact.civilization}
                  dateRange={artifact.dateRange}
                  imageUrl={artifact.imageUrl}
                  provenance={artifact.provenance}
                  transparencyLabel={transparencyLabel}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link href="/questionnaire">
            <Button variant="primary" size="lg">
              Continue to Questionnaire
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Bottom Divider ── */}
      <Divider variant="lotus" className="mx-auto max-w-2xl" />
    </>
  );
}
