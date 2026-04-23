"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import TimelineNode from "./TimelineNode";
import CivilizationDrawer, {
  type CivilizationData,
} from "./CivilizationDrawer";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface TimelineCivilization extends CivilizationData {
  periodStart: number;
  periodEnd: number;
}

const CIVILIZATIONS: TimelineCivilization[] = [
  {
    id: "lomekwi",
    name: "Lomekwi Stone Tools",
    dateLabel: "3.3M BCE",
    region: "East Africa",
    description:
      "The oldest known stone tools, predating the genus Homo. Discovered at Lomekwi 3 in Kenya, these 3.3-million-year-old artifacts rewrote the timeline of technological innovation and challenged assumptions about who first made tools.",
    periodStart: -3300000,
    periodEnd: -3300000,
    artifacts: [
      { name: "Lomekwi Core", type: "Stone Tool", date: "3.3M BCE" },
      { name: "Anvil Stone", type: "Stone Tool", date: "3.3M BCE" },
      { name: "Flaked Cobble", type: "Stone Tool", date: "3.3M BCE" },
    ],
  },
  {
    id: "mesopotamia",
    name: "Mesopotamia",
    dateLabel: "3500 \u2013 539 BCE",
    region: "Western Asia",
    description:
      "Often called the cradle of civilization, Mesopotamia developed between the Tigris and Euphrates rivers. The Sumerians, Akkadians, Babylonians, and Assyrians successively built complex urban societies, inventing cuneiform writing, the wheel, and codified law.",
    periodStart: -3500,
    periodEnd: -539,
    artifacts: [
      { name: "Standard of Ur", type: "Mosaic Panel", date: "c. 2600 BCE" },
      { name: "Code of Hammurabi", type: "Stele", date: "c. 1754 BCE" },
      { name: "Ishtar Gate Fragment", type: "Glazed Brick", date: "c. 575 BCE" },
    ],
  },
  {
    id: "indus",
    name: "Indus Valley",
    dateLabel: "3300 \u2013 1300 BCE",
    region: "South Asia",
    description:
      "One of the most advanced early urban cultures, with sophisticated city planning, drainage systems, and standardized weights. Major cities like Mohenjo-daro supported populations of tens of thousands. Its undeciphered script remains one of archaeology\u2019s greatest mysteries.",
    periodStart: -3300,
    periodEnd: -1300,
    artifacts: [
      { name: "Dancing Girl", type: "Bronze Sculpture", date: "c. 2500 BCE" },
      { name: "Priest-King Bust", type: "Stone Sculpture", date: "c. 2400 BCE" },
      { name: "Pashupati Seal", type: "Steatite Seal", date: "c. 2350 BCE" },
    ],
  },
  {
    id: "egypt",
    name: "Ancient Egypt",
    dateLabel: "3100 \u2013 30 BCE",
    region: "North Africa",
    description:
      "One of the longest-lasting civilizations in history, Ancient Egypt flourished along the Nile for over three millennia. Known for monumental architecture, hieroglyphic writing, and elaborate burial practices, Egypt produced some of the most iconic artifacts in human history.",
    periodStart: -3100,
    periodEnd: -30,
    artifacts: [
      { name: "Rosetta Stone", type: "Stele", date: "196 BCE" },
      { name: "Mask of Tutankhamun", type: "Funerary Mask", date: "c. 1323 BCE" },
      { name: "Narmer Palette", type: "Ceremonial Palette", date: "c. 3100 BCE" },
    ],
  },
  {
    id: "china",
    name: "Ancient China",
    dateLabel: "2070 \u2013 221 BCE",
    region: "East Asia",
    description:
      "Ancient Chinese civilization, spanning from the Xia dynasty through the Qin, developed along the Yellow and Yangtze rivers. China produced transformative inventions including paper, silk weaving, and bronze casting, while Confucian and Daoist philosophies shaped East Asian thought for millennia.",
    periodStart: -2070,
    periodEnd: -221,
    artifacts: [
      { name: "Ritual Bronze Vessel (Ding)", type: "Bronze", date: "c. 1200 BCE" },
      { name: "Oracle Bone", type: "Inscribed Bone", date: "c. 1250 BCE" },
      { name: "Jade Bi Disc", type: "Jade Artifact", date: "c. 3000 BCE" },
    ],
  },
  {
    id: "maya",
    name: "Maya Civilization",
    dateLabel: "2000 BCE \u2013 1500 CE",
    region: "Central America",
    description:
      "The Maya developed one of the most sophisticated writing systems in the pre-Columbian Americas and created an extraordinarily accurate calendar. Their achievements in astronomy, mathematics, and monumental architecture rival any civilization of the ancient world.",
    periodStart: -2000,
    periodEnd: 1500,
    artifacts: [
      { name: "Jade Death Mask", type: "Funerary Mask", date: "c. 683 CE" },
      { name: "Dresden Codex", type: "Manuscript", date: "c. 1200 CE" },
      { name: "Chichen Itza Chac Mool", type: "Stone Sculpture", date: "c. 900 CE" },
    ],
  },
  {
    id: "greece",
    name: "Ancient Greece",
    dateLabel: "800 \u2013 146 BCE",
    region: "Southern Europe",
    description:
      "Ancient Greece laid the intellectual foundations of Western civilization through pioneering contributions to philosophy, democracy, theater, and the sciences. City-states such as Athens and Sparta developed distinct political systems that continue to influence governance today.",
    periodStart: -800,
    periodEnd: -146,
    artifacts: [
      { name: "Elgin Marbles Fragment", type: "Marble Relief", date: "c. 447 BCE" },
      { name: "Antikythera Mechanism", type: "Bronze Device", date: "c. 100 BCE" },
      { name: "Attic Red-Figure Krater", type: "Ceramic", date: "c. 450 BCE" },
    ],
  },
  {
    id: "persia",
    name: "Persian Empire",
    dateLabel: "550 \u2013 330 BCE",
    region: "Western / Central Asia",
    description:
      "The Achaemenid Persian Empire, founded by Cyrus the Great, became the largest empire the ancient world had yet seen. Renowned for its administrative sophistication, religious tolerance, and monumental architecture at Persepolis.",
    periodStart: -550,
    periodEnd: -330,
    artifacts: [
      { name: "Persepolis Relief", type: "Stone Relief", date: "c. 500 BCE" },
      { name: "Cyrus Cylinder", type: "Clay Cylinder", date: "c. 539 BCE" },
      { name: "Oxus Treasure Armlet", type: "Gold Bracelet", date: "c. 500 BCE" },
    ],
  },
  {
    id: "rome",
    name: "Roman Empire",
    dateLabel: "509 BCE \u2013 476 CE",
    region: "Mediterranean",
    description:
      "From a small settlement on the Tiber, Rome grew into one of the largest empires the ancient world ever saw. Roman engineering, law, and military organization shaped the development of Europe. The empire\u2019s cultural and architectural achievements remain landmarks of human ingenuity.",
    periodStart: -509,
    periodEnd: 476,
    artifacts: [
      { name: "Augustus of Prima Porta", type: "Marble Statue", date: "1st c. CE" },
      { name: "Portland Vase", type: "Cameo Glass", date: "c. 25 CE" },
      { name: "Trajan\u2019s Column Fragment", type: "Marble Relief", date: "113 CE" },
    ],
  },
  {
    id: "islamic",
    name: "Islamic Golden Age",
    dateLabel: "750 \u2013 1258 CE",
    region: "Middle East / North Africa",
    description:
      "A period of extraordinary cultural, economic, and scientific flourishing in the Islamic world. Scholars preserved and expanded upon Greek, Persian, and Indian knowledge, making groundbreaking advances in algebra, optics, medicine, and astronomy.",
    periodStart: 750,
    periodEnd: 1258,
    artifacts: [
      { name: "Astrolabe of Ibn al-Shatir", type: "Brass Instrument", date: "c. 1350 CE" },
      { name: "Alhambra Vase", type: "Lustre Ceramic", date: "c. 1400 CE" },
      { name: "Quran Folio (Kufic)", type: "Manuscript", date: "c. 900 CE" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

const TIMELINE_WIDTH = 6000;
const PADDING = 120;

const SORTED_CIVILIZATIONS = [...CIVILIZATIONS].sort(
  (a, b) => a.periodStart - b.periodStart,
);

function civToPosition(index: number): number {
  const count = SORTED_CIVILIZATIONS.length;
  if (count <= 1) return TIMELINE_WIDTH / 2;
  return PADDING + index * ((TIMELINE_WIDTH - PADDING * 2) / (count - 1));
}

/* ------------------------------------------------------------------ */
/*  Arrow Button                                                       */
/* ------------------------------------------------------------------ */

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const path = direction === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13";
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone/30 bg-obsidian/60 text-parchment/50 backdrop-blur-sm transition-all hover:border-gold/50 hover:text-gold hover:shadow-[0_0_12px_rgba(212,160,23,0.2)]"
      aria-label={`Scroll timeline ${direction}`}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TimelineView() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<TimelineCivilization | null>(null);

  const handleSelect = useCallback(
    (civ: TimelineCivilization) => {
      setSelected((prev) => {
        const next = prev?.id === civ.id ? null : civ;
        if (next) {
          // Scroll to drawer after state update
          setTimeout(() => {
            drawerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
        return next;
      });
    },
    [],
  );

  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.5;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="w-full">
      {/* Timeline row: arrow — track — arrow */}
      <div className="flex items-center gap-5 px-8 md:px-14">
        <ArrowButton direction="left" onClick={() => scroll("left")} />

        {/* Scrollable timeline — no visible scrollbar */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex-1 overflow-x-auto scroll-smooth"
        >
          <div
            className="relative"
            style={{ width: TIMELINE_WIDTH, height: 200 }}
          >
            {/* Timeline band — through the dot centers, behind node content */}
            <div
              className="absolute left-0 right-0 top-[26px] h-[2px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C9A96E33 5%, #C9A96E44 50%, #C9A96E33 95%, transparent)",
              }}
              aria-hidden="true"
            />

            {/* Civilization nodes */}
            {SORTED_CIVILIZATIONS.map((civ, i) => {
              const x = civToPosition(i);
              return (
                <div
                  key={civ.id}
                  className="absolute z-10"
                  style={{ left: x, top: 10, transform: "translateX(-50%)" }}
                >
                  <TimelineNode
                    name={civ.name}
                    dateLabel={civ.dateLabel}
                    isSelected={selected?.id === civ.id}
                    onClick={() => handleSelect(civ)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <ArrowButton direction="right" onClick={() => scroll("right")} />
      </div>

      {/* Drawer anchor */}
      <div ref={drawerRef}>
        <CivilizationDrawer
          civilization={selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </div>
  );
}
