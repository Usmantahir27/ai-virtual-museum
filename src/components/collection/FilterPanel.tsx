"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const ARTIFACT_TYPES = [
  "sculpture",
  "vessel",
  "scroll",
  "coin",
  "jewellery",
  "weapon",
  "tool",
  "textile",
  "mosaic",
  "architecture",
] as const;

export interface FilterValues {
  civilization: string;
  type: string;
  material: string;
  eraStart: number | null;
  eraEnd: number | null;
  significance: number | null;
  search: string;
}

export const EMPTY_FILTERS: FilterValues = {
  civilization: "",
  type: "",
  material: "",
  eraStart: null,
  eraEnd: null,
  significance: null,
  search: "",
};

interface FilterPanelProps {
  civilizations: string[];
  onChange: (filters: FilterValues) => void;
  filters: FilterValues;
}

const selectClass =
  "w-full appearance-none rounded-sm border border-stone/30 bg-obsidian/90 px-3 py-2 font-body text-sm text-parchment outline-none transition-colors focus:border-gold/60 focus:ring-1 focus:ring-gold/40";
const inputClass =
  "w-full rounded-sm border border-stone/30 bg-obsidian/90 px-3 py-2 font-body text-sm text-parchment placeholder:text-stone/50 outline-none transition-colors focus:border-gold/60 focus:ring-1 focus:ring-gold/40";
const labelClass =
  "mb-1.5 block font-display text-[0.65rem] uppercase tracking-[0.15em] text-parchment/60";

export default function FilterPanel({
  civilizations,
  onChange,
  filters,
}: FilterPanelProps) {
  const update = (partial: Partial<FilterValues>) => {
    onChange({ ...filters, ...partial });
  };

  return (
    <div className="rounded-sm border border-stone/20 bg-obsidian/60 p-5">
      {/* Search */}
      <div className="mb-5">
        <label className={labelClass}>Search</label>
        <input
          type="text"
          placeholder="Search artifacts..."
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Civilization */}
        <div>
          <label className={labelClass}>Civilization</label>
          <select
            value={filters.civilization}
            onChange={(e) => update({ civilization: e.target.value })}
            className={selectClass}
          >
            <option value="">All</option>
            {civilizations.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className={labelClass}>Type</label>
          <select
            value={filters.type}
            onChange={(e) => update({ type: e.target.value })}
            className={selectClass}
          >
            <option value="">All</option>
            {ARTIFACT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Material */}
        <div>
          <label className={labelClass}>Material</label>
          <input
            type="text"
            placeholder="e.g. marble"
            value={filters.material}
            onChange={(e) => update({ material: e.target.value })}
            className={inputClass}
          />
        </div>

        {/* Era Start */}
        <div>
          <label className={labelClass}>Era From</label>
          <input
            type="number"
            placeholder="-3000"
            value={filters.eraStart ?? ""}
            onChange={(e) =>
              update({
                eraStart: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className={inputClass}
          />
        </div>

        {/* Era End */}
        <div>
          <label className={labelClass}>Era To</label>
          <input
            type="number"
            placeholder="500"
            value={filters.eraEnd ?? ""}
            onChange={(e) =>
              update({
                eraEnd: e.target.value === "" ? null : Number(e.target.value),
              })
            }
            className={inputClass}
          />
        </div>

        {/* Significance */}
        <div>
          <label className={labelClass}>Significance</label>
          <div className="flex items-center gap-1 pt-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() =>
                  update({
                    significance: filters.significance === n ? null : n,
                  })
                }
                className={`h-6 w-6 rounded-full border transition-colors ${
                  filters.significance !== null && n <= filters.significance
                    ? "border-gold bg-gold/30 text-gold"
                    : "border-stone/30 bg-obsidian/40 text-stone/40 hover:border-stone/60"
                }`}
                aria-label={`${n} star significance`}
              >
                <span className="text-xs leading-none">{n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="mt-5 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(EMPTY_FILTERS)}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
