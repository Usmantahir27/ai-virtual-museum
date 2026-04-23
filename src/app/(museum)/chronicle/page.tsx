import type { Metadata } from "next";
import Divider from "@/components/ui/Divider";
import TimelineView from "@/components/timeline/TimelineView";

export const metadata: Metadata = { title: "The Chronicle | Archaion" };

export default function ChroniclePage() {
  return (
    <section className="w-full py-24">
      {/* Header */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-gold">
          Traversing Time
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-wide text-parchment md:text-5xl">
          The Chronicle
        </h1>
        <Divider variant="meander" className="mx-auto mt-8 max-w-xs" />
        <p className="mx-auto mt-8 max-w-2xl font-body text-lg leading-relaxed text-parchment/70">
          From the earliest stone tools shaped 3.3 million years ago to the
          flourishing of medieval empires, trace the arc of human ingenuity
          across a single, sweeping timeline.
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-16 w-full">
        <TimelineView />
      </div>

      {/* Instructions */}
      <p className="mt-8 text-center font-mono text-xs tracking-wide text-stone/60">
        Scroll horizontally to traverse time. Click a civilization to explore.
      </p>
    </section>
  );
}
