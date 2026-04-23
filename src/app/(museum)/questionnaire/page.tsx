"use client";

import { useTransparency } from "@/lib/TransparencyContext";
import Divider from "@/components/ui/Divider";

const FORM_URLS: Record<"A" | "B" | "C", string> = {
  A: "https://forms.office.com/e/BUaP0P1h0H",
  B: "https://forms.office.com/e/ZAtpFXiqfb",
  C: "https://forms.office.com/e/0hbTsC8LnL",
};

export default function QuestionnairePage() {
  const condition = useTransparency();
  const formUrl = FORM_URLS[condition];

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <p className="font-display text-xs uppercase tracking-[0.25em] text-gold">
        Research
      </p>
      <h1 className="mt-3 font-display text-4xl tracking-wide text-parchment md:text-5xl">
        Questionnaire
      </h1>

      <Divider variant="arabesque" className="my-8 max-w-xs" />

      <p className="max-w-2xl font-body text-lg leading-relaxed text-parchment/70">
        Thank you for exploring the Archaion collection. Please take a few
        minutes to complete the questionnaire below. Your participation
        contributes significantly to this research.
      </p>

      <iframe
        src={formUrl}
        className="mt-10 h-[800px] w-full border border-stone/20 bg-obsidian"
        title="Research Questionnaire"
        allowFullScreen
      />

      <p className="mt-4 text-center text-sm text-parchment/50">
        If the form does not load,{" "}
        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline underline-offset-2 transition-colors hover:text-parchment"
        >
          open it in a new tab
        </a>
        .
      </p>
    </section>
  );
}
