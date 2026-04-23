"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import { transitions } from "@/lib/tokens";

export type GalleryId = "egypt" | "greece" | "mesopotamia" | "rome";

interface Gallery {
  id: GalleryId;
  name: string;
  description: string;
  color: string;
}

const galleries: Gallery[] = [
  {
    id: "egypt",
    name: "Egyptian Gallery",
    description:
      "Explore pharaonic treasures, golden funerary masks, and the mysteries of the Nile.",
    color: "#D4A017",
  },
  {
    id: "greece",
    name: "Greek Gallery",
    description:
      "Admire marble sculptures, painted amphorae, and the birthplace of Western philosophy.",
    color: "#4A90D9",
  },
  {
    id: "mesopotamia",
    name: "Mesopotamian Gallery",
    description:
      "Discover cuneiform tablets, winged bulls, and relics from the cradle of civilization.",
    color: "#C1440E",
  },
  {
    id: "rome",
    name: "Roman Gallery",
    description:
      "Walk among imperial busts, intricate mosaics, and the engineering marvels of Rome.",
    color: "#8B0000",
  },
];

interface GallerySelectorProps {
  onSelect: (id: GalleryId) => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.stone },
};

export default function GallerySelector({ onSelect }: GallerySelectorProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
    >
      {galleries.map((gallery) => (
        <motion.div key={gallery.id} variants={itemVariants}>
          <div
            className="cursor-pointer"
            onClick={() => onSelect(gallery.id)}
          >
            <Card>
              <div
                className="mb-4 h-1 w-10 rounded"
                style={{ backgroundColor: gallery.color }}
              />
              <h3 className="font-display text-lg tracking-wide text-parchment">
                {gallery.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-parchment/60">
                {gallery.description}
              </p>
              <p
                className="mt-4 font-display text-xs uppercase tracking-[0.15em]"
                style={{ color: gallery.color }}
              >
                Enter Gallery &rarr;
              </p>
            </Card>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
