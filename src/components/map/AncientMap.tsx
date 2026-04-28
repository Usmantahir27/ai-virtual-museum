"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { transitions } from "@/lib/tokens";
import { civilizations, type Civilization } from "@/lib/data/civilizations";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  SVG region definitions                                             */
/* ------------------------------------------------------------------ */

interface CivRegion {
  civId: string;
  points: string;
}

const regions: CivRegion[] = [
  { civId: "civ-egypt", points: "470,240 480,220 500,215 510,225 510,270 500,290 485,285 475,260" },
  { civId: "civ-mesopotamia", points: "530,190 555,175 575,185 580,205 570,225 545,235 525,220 520,200" },
  { civId: "civ-greece", points: "475,175 490,165 505,170 510,185 505,200 490,205 478,195" },
  { civId: "civ-rome", points: "440,160 460,145 480,155 485,170 475,190 455,195 435,185 430,170" },
  { civId: "civ-persia", points: "580,190 610,175 640,185 650,210 640,230 610,235 585,225" },
  { civId: "civ-indus", points: "640,230 660,215 680,225 685,250 675,270 655,265 640,250" },
  { civId: "civ-china", points: "720,170 755,155 785,165 800,190 790,220 760,235 730,225 715,200" },
  { civId: "civ-mesoamerica", points: "150,240 175,230 195,240 200,260 190,280 170,285 150,270" },
];

const landmasses = [
  "M380,100 L420,85 460,90 500,95 520,110 530,130 520,160 510,170 480,155 440,160 420,170 400,165 380,155 370,130Z",
  "M420,200 L470,190 510,210 530,240 540,280 530,330 510,370 480,390 450,380 430,350 420,310 415,270 410,240Z",
  "M520,200 L560,185 590,195 600,220 590,250 570,270 540,260 520,240Z",
  "M600,180 L640,160 680,170 700,190 710,220 700,260 680,280 650,270 630,240 610,220Z",
  "M700,100 L740,80 780,90 810,110 820,150 810,190 790,220 760,240 730,230 710,200 700,160Z",
  "M390,80 L405,75 415,85 410,95 395,95Z",
  "M440,50 L460,40 475,50 480,75 470,90 455,85 445,70Z",
  "M50,60 L120,50 180,70 210,100 220,140 210,180 190,210 160,230 130,235 100,220 70,190 50,150 40,110Z",
  "M140,235 L180,230 200,240 210,260 200,290 175,300 155,290 140,270Z",
  "M180,300 L210,290 240,310 250,350 240,400 220,430 190,440 165,420 155,380 160,340Z",
  "M740,260 L760,255 775,265 770,280 755,285 740,275Z",
  "M780,270 L800,265 810,278 800,290 785,285Z",
];

/* ------------------------------------------------------------------ */
/*  Civ → Collection filter name mapping                               */
/* ------------------------------------------------------------------ */

const civToCollectionName: Record<string, string> = {
  "civ-egypt": "Egyptian",
  "civ-greece": "Greek",
  "civ-rome": "Roman",
  "civ-mesopotamia": "Mesopotamian",
  "civ-china": "Chinese",
  "civ-mesoamerica": "Mesoamerican",
  "civ-persia": "Persian",
  "civ-indus": "Indus",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatYear(y: number) {
  return y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`;
}

const MIN_YEAR = -3500;
const MAX_YEAR = 1600;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function AncientMap() {
  const [selectedCiv, setSelectedCiv] = useState<Civilization | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [yearFrom, setYearFrom] = useState(MIN_YEAR);
  const [yearTo, setYearTo] = useState(MAX_YEAR);

  // Ensure from <= to
  const handleFrom = (v: number) => setYearFrom(Math.min(v, yearTo));
  const handleTo = (v: number) => setYearTo(Math.max(v, yearFrom));

  const visibleRegions = useMemo(
    () =>
      regions.filter((r) => {
        const civ = civilizations.find((c) => c.id === r.civId);
        if (!civ) return false;
        return civ.periodStart <= yearTo && civ.periodEnd >= yearFrom;
      }),
    [yearFrom, yearTo],
  );

  const civMap = useMemo(() => {
    const m = new Map<string, Civilization>();
    civilizations.forEach((c) => m.set(c.id, c));
    return m;
  }, []);

  const fromPct = ((yearFrom - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
  const toPct = ((yearTo - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;

  return (
    <div className="relative w-full">
      {/* SVG Map */}
      <div className="relative overflow-hidden rounded border border-stone/20 bg-[#0f1923]">
        <svg viewBox="0 0 900 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="500" fill="#0f1923" />

          {Array.from({ length: 9 }, (_, i) => (
            <line key={`vg-${i}`} x1={(i + 1) * 90} y1="0" x2={(i + 1) * 90} y2="500" stroke="#1a2a35" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <line key={`hg-${i}`} x1="0" y1={(i + 1) * 100} x2="900" y2={(i + 1) * 100} stroke="#1a2a35" strokeWidth="0.5" />
          ))}

          <g transform="translate(845,45)" opacity="0.3">
            <line x1="0" y1="-20" x2="0" y2="20" stroke="#C9A96E" strokeWidth="1" />
            <line x1="-20" y1="0" x2="20" y2="0" stroke="#C9A96E" strokeWidth="1" />
            <polygon points="0,-22 -3,-15 3,-15" fill="#D4A017" />
            <text y="-25" textAnchor="middle" fill="#D4A017" fontSize="8" fontFamily="serif">N</text>
          </g>

          {landmasses.map((d, i) => (
            <path key={`land-${i}`} d={d} fill="#C9A96E" fillOpacity="0.15" stroke="#6B5E4A" strokeWidth="0.75" strokeOpacity="0.4" />
          ))}

          {visibleRegions.map((region) => {
            const civ = civMap.get(region.civId)!;
            const isSelected = selectedCiv?.id === region.civId;
            const isHovered = hoveredId === region.civId;

            return (
              <g key={region.civId}>
                <polygon
                  points={region.points}
                  fill={civ.colorHex}
                  fillOpacity={isSelected ? 0.6 : isHovered ? 0.45 : 0.3}
                  stroke={civ.colorHex}
                  strokeWidth={isSelected ? 2 : 1}
                  strokeOpacity={isSelected ? 1 : 0.6}
                  className="cursor-pointer transition-all duration-300"
                  style={{ filter: isHovered ? `drop-shadow(0 0 8px ${civ.colorHex})` : "none" }}
                  onClick={() => setSelectedCiv(isSelected ? null : civ)}
                  onMouseEnter={() => setHoveredId(region.civId)}
                  onMouseLeave={() => setHoveredId(null)}
                />
                {(() => {
                  const pts = region.points.split(" ").map((p) => {
                    const [x, y] = p.split(",").map(Number);
                    return { x, y };
                  });
                  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
                  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
                  return (
                    <text
                      x={cx} y={cy}
                      textAnchor="middle" dominantBaseline="middle"
                      fill="#F5EDD6" fontSize="7" fontFamily="serif"
                      className="pointer-events-none select-none"
                      opacity={isHovered || isSelected ? 1 : 0.7}
                    >
                      {civ.name.length > 12 ? civ.name.split(" ")[0] : civ.name}
                    </text>
                  );
                })()}
              </g>
            );
          })}
        </svg>

        {/* Info panel */}
        <AnimatePresence>
          {selectedCiv && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={transitions.stone}
              className="absolute right-2 top-4 left-2 z-10 w-[calc(100%-1rem)] max-w-[18rem] rounded border border-stone/30 bg-obsidian/95 p-5 shadow-lg backdrop-blur-sm sm:right-4 sm:left-auto sm:w-72"
            >
              <button
                onClick={() => setSelectedCiv(null)}
                className="absolute right-3 top-3 text-stone hover:text-parchment"
              >
                &times;
              </button>
              <div className="mb-3 h-1 w-12 rounded" style={{ backgroundColor: selectedCiv.colorHex }} />
              <h3 className="font-display text-lg tracking-wide text-parchment">
                {selectedCiv.name}
              </h3>
              <p className="mt-1 font-display text-[0.65rem] uppercase tracking-[0.15em] text-gold">
                {formatYear(selectedCiv.periodStart)} &ndash; {formatYear(selectedCiv.periodEnd)}
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-parchment/60">
                {selectedCiv.description.slice(0, 180)}...
              </p>
              <p className="mt-3 font-body text-xs text-sandstone">
                Region: {selectedCiv.region}
              </p>
              <Link
                href={`/collection?civilization=${encodeURIComponent(civToCollectionName[selectedCiv.id] || "")}`}
                className="mt-4 inline-block border border-gold px-4 py-1.5 font-display text-xs uppercase tracking-[0.15em] text-parchment transition-shadow hover:shadow-[0_0_20px_rgba(212,160,23,0.3)]"
              >
                View Artifacts &rarr;
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dual Range Slider — Ancient themed */}
      <div className="mt-8 px-2">
        {/* Decorative border */}
        <div className="rounded border border-stone/20 bg-obsidian/40 px-6 py-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-display text-[0.65rem] uppercase tracking-[0.15em] text-parchment/40">
              Time Period Filter
            </span>
            <span className="font-display text-sm tracking-wide text-gold">
              {formatYear(yearFrom)} &ndash; {formatYear(yearTo)}
            </span>
          </div>

          {/* Slider track with highlighted range */}
          <div className="relative h-6">
            {/* Background track */}
            <div className="absolute left-0 right-0 top-[10px] h-[4px] rounded-full" style={{ background: "linear-gradient(to right, #6B5E4A33, #C9A96E22, #6B5E4A33)" }} />
            {/* Active range highlight */}
            <div
              className="absolute top-[10px] h-[4px] rounded-full"
              style={{
                left: `${fromPct}%`,
                width: `${toPct - fromPct}%`,
                background: "linear-gradient(to right, #D4A01766, #D4A017aa, #D4A01766)",
                boxShadow: "0 0 8px rgba(212, 160, 23, 0.3)",
              }}
            />
            {/* From slider */}
            <input
              type="range"
              min={MIN_YEAR}
              max={MAX_YEAR}
              step={50}
              value={yearFrom}
              onChange={(e) => handleFrom(Number(e.target.value))}
              className="ancient-slider pointer-events-none absolute inset-0 w-full [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto"
              style={{ zIndex: 2 }}
            />
            {/* To slider */}
            <input
              type="range"
              min={MIN_YEAR}
              max={MAX_YEAR}
              step={50}
              value={yearTo}
              onChange={(e) => handleTo(Number(e.target.value))}
              className="ancient-slider pointer-events-none absolute inset-0 w-full [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto"
              style={{ zIndex: 3 }}
            />
          </div>

          {/* Min/max labels */}
          <div className="mt-1 flex justify-between">
            <span className="font-mono text-[0.6rem] text-parchment/30">3500 BCE</span>
            <span className="font-mono text-[0.6rem] text-parchment/30">1600 CE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
