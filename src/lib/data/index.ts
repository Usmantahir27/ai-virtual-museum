export { civilizations } from "@/lib/data/civilizations";
export type { Civilization } from "@/lib/data/civilizations";

export { artifacts } from "@/lib/data/artifacts";
export type { Artifact } from "@/lib/data/artifacts";

import { civilizations } from "@/lib/data/civilizations";
import { artifacts } from "@/lib/data/artifacts";
import type { Artifact } from "@/lib/data/artifacts";

// ── Lookup helpers ───────────────────────────────────────────────────

export function getArtifactBySlug(slug: string): Artifact | undefined {
  return artifacts.find((a) => a.slug === slug);
}

export function getArtifactsByCivilization(civId: string): Artifact[] {
  return artifacts.filter((a) => a.civilizationId === civId);
}

export function getCivilizationBySlug(slug: string) {
  return civilizations.find((c) => c.slug === slug);
}

export function getFeaturedArtifacts(): Artifact[] {
  return artifacts.filter((a) => a.isFeatured);
}

// ── Search ───────────────────────────────────────────────────────────

export function searchArtifacts(query: string): Artifact[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return artifacts.filter((a) => {
    const haystack = [
      a.name,
      a.description,
      a.provenance,
      a.scholarlyNotes,
      ...a.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

// ── Filter ───────────────────────────────────────────────────────────

export interface ArtifactFilters {
  civilizationId?: string;
  type?: string;
  material?: string;
  eraStart?: number;
  eraEnd?: number;
}

export function filterArtifacts(filters: ArtifactFilters): Artifact[] {
  return artifacts.filter((a) => {
    if (filters.civilizationId && a.civilizationId !== filters.civilizationId) {
      return false;
    }

    if (filters.type && a.type !== filters.type) {
      return false;
    }

    if (
      filters.material &&
      !a.material.some((m) => m.toLowerCase().includes(filters.material!.toLowerCase()))
    ) {
      return false;
    }

    if (filters.eraStart !== undefined && a.eraEnd < filters.eraStart) {
      return false;
    }

    if (filters.eraEnd !== undefined && a.eraStart > filters.eraEnd) {
      return false;
    }

    return true;
  });
}
