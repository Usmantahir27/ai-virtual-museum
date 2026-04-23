import type { Metadata } from "next";
import Divider from "@/components/ui/Divider";
import AncientMap from "@/components/map/AncientMap";
import { civilizations } from "@/lib/data/civilizations";

export const metadata: Metadata = { title: "The Atlas — Archaion" };

export default function AtlasPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      {/* Header */}
      <div className="text-center">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-gold">
          Ancient World
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-wide text-parchment md:text-5xl">
          The Atlas
        </h1>
        <Divider variant="meander" className="mx-auto mt-8 max-w-xs" />
        <p className="mx-auto mt-8 max-w-xl font-body text-lg leading-relaxed text-parchment/60">
          Explore the ancient world through geography. Click a civilization to
          learn more about its history, artifacts, and cultural achievements.
        </p>
      </div>

      {/* Map */}
      <div className="mt-14">
        <AncientMap />
      </div>

      {/* Legend */}
      <div className="mt-14">
        <h2 className="mb-6 text-center font-display text-sm uppercase tracking-[0.2em] text-sandstone">
          Civilizations
        </h2>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {civilizations.map((civ) => (
            <div key={civ.id} className="flex items-center gap-2">
              <span
                className="inline-block h-3 w-3 rounded-sm"
                style={{ backgroundColor: civ.colorHex }}
              />
              <span className="font-body text-sm text-parchment/70">
                {civ.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
