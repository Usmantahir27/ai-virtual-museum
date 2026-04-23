"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { transitions } from "@/lib/tokens";

interface ScholarlySection {
  title: string;
  content: string;
}

interface ScholarlyNotesProps {
  sections: ScholarlySection[];
}

function AccordionItem({
  section,
  isOpen,
  onToggle,
}: {
  section: ScholarlySection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-stone/20">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-gold"
      >
        <h4 className="font-display text-base tracking-wide text-parchment">
          {section.title}
        </h4>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={transitions.fast}
          className="text-gold"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transitions.stone}
            className="overflow-hidden"
          >
            <p className="pb-5 font-body text-base leading-relaxed text-stone">
              {section.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ScholarlyNotes({ sections }: ScholarlyNotesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y-0">
      {sections.map((section, index) => (
        <AccordionItem
          key={index}
          section={section}
          isOpen={openIndex === index}
          onToggle={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
}
