import type { Metadata } from "next";
import { Suspense } from "react";
import Divider from "@/components/ui/Divider";
import CollectionView from "@/components/collection/CollectionView";

export const metadata: Metadata = {
  title: "The Collection | Archaion",
  description:
    "Browse the Archaion museum's curated collection of artifacts spanning millennia of human civilization.",
};

export default function CollectionPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 pt-32 sm:px-6 sm:pt-28">
      {/* Header */}
      <div className="text-center">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-gold">
          Artifacts
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-wide text-parchment md:text-5xl">
          The Collection
        </h1>
        <Divider variant="arabesque" className="mx-auto mt-8 max-w-xs" />
        <p className="mx-auto mt-10 max-w-2xl font-body text-lg leading-relaxed text-stone">
          Explore our curated assembly of artifacts from the ancient world
          &mdash; sculptures carved in marble, scrolls inscribed on papyrus,
          vessels shaped in gold, and relics that bear witness to civilizations
          long since passed into legend.
        </p>
      </div>

      {/* Collection browser */}
      <div className="mt-16">
        <Suspense>
          <CollectionView />
        </Suspense>
      </div>
    </section>
  );
}
