"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ArtifactCard from "@/components/ui/ArtifactCard";
import type { Artifact } from "./CollectionView";

interface CollectionGridProps {
  artifacts: Artifact[];
  transparencyLabel?: string | null;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] as const },
  },
};

export default function CollectionGrid({ artifacts, transparencyLabel }: CollectionGridProps) {
  if (artifacts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-stone/60">
          No artifacts match your filters
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={artifacts.map((a) => a.id).join(",")}
    >
      {artifacts.map((artifact) => (
        <motion.div
          key={artifact.id}
          variants={itemVariants}
          className=""
        >
          <Link href={`/artifact/${artifact.slug}`} className="block">
            <ArtifactCard
              name={artifact.name}
              civilization={artifact.civilization}
              dateRange={artifact.dateRange}
              imageUrl={artifact.imageUrl || undefined}
              provenance={artifact.provenance}
              transparencyLabel={transparencyLabel}
            />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
