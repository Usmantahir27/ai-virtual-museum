import type { Metadata } from "next";
import Divider from "@/components/ui/Divider";
import GalleryExperience from "@/components/galleries/GalleryExperience";

export const metadata: Metadata = { title: "Virtual Galleries — Archaion" };

export default function GalleriesPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-24 pt-32 sm:px-6 sm:pt-28">
      {/* Header */}
      <div className="text-center">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-gold">
          Exhibits
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-wide text-parchment md:text-5xl">
          Virtual Galleries
        </h1>
        <Divider variant="arabesque" className="mx-auto mt-8 max-w-xs" />
        <p className="mx-auto mt-8 max-w-xl font-body text-lg leading-relaxed text-stone">
          Step inside our themed exhibition halls. Select a gallery to explore a
          curated space of ancient artifacts rendered in three dimensions.
        </p>
      </div>

      {/* Gallery Experience */}
      <div className="mt-14">
        <GalleryExperience />
      </div>
    </section>
  );
}
