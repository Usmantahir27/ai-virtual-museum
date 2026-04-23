"use client";

import { motion } from "framer-motion";
import { transitions } from "@/lib/tokens";

interface ProvenanceEvent {
  year: string;
  title: string;
  description: string;
}

interface ProvenanceTimelineProps {
  events: ProvenanceEvent[];
}

export default function ProvenanceTimeline({
  events,
}: ProvenanceTimelineProps) {
  return (
    <div className="relative pl-8">
      {/* Vertical gold line */}
      <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent" />

      <div className="flex flex-col gap-10">
        {events.map((event, index) => (
          <motion.div
            key={event.year + index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              ...transitions.stone,
              delay: index * 0.15,
            }}
            className="relative"
          >
            {/* Gold dot */}
            <div className="absolute -left-[22.5px] top-1 h-3 w-3 rounded-full border-2 border-gold bg-obsidian" />

            {/* Year */}
            <p className="font-mono text-sm text-gold">{event.year}</p>

            {/* Title */}
            <h4 className="mt-1 font-display text-lg tracking-wide text-parchment">
              {event.title}
            </h4>

            {/* Description */}
            <p className="mt-1 font-body text-sm leading-relaxed text-stone">
              {event.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
