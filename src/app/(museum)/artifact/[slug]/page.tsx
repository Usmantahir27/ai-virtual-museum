import Divider from "@/components/ui/Divider";
import Badge from "@/components/ui/Badge";
import ArtifactViewer from "@/components/3d/ArtifactViewer";
import ProvenanceTimeline from "@/components/artifact/ProvenanceTimeline";
import ScholarlyNotes from "@/components/artifact/ScholarlyNotes";
import RelatedArtifacts from "@/components/artifact/RelatedArtifacts";
import TransparencyLabel from "@/components/ui/TransparencyLabel";
import {
  getArtifactBySlug,
  getArtifactsByCivilization,
  civilizations,
  artifacts,
} from "@/lib/data";
import type { Artifact } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  Static params for static export                                    */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return artifacts.map((a) => ({ slug: a.slug }));
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getCivilizationName(civId: string): string {
  return civilizations.find((c) => c.id === civId)?.name ?? civId;
}

function formatEra(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  return `${year} CE`;
}

function formatDateRange(artifact: Artifact): string {
  if (artifact.eraStart === artifact.eraEnd) return formatEra(artifact.eraStart);
  return `${formatEra(artifact.eraStart)} - ${formatEra(artifact.eraEnd)}`;
}

function formatDimensions(d: Artifact["dimensions"]): string {
  const parts: string[] = [];
  if (d.heightCm) parts.push(`${d.heightCm} cm H`);
  if (d.widthCm) parts.push(`${d.widthCm} cm W`);
  if (d.depthCm) parts.push(`${d.depthCm} cm D`);
  if (d.weightKg) parts.push(`${d.weightKg} kg`);
  return parts.join(" x ");
}

function buildProvenanceEvents(
  artifact: Artifact,
): { year: string; title: string; description: string }[] {
  const events: { year: string; title: string; description: string }[] = [];

  // First event: the artifact's creation era
  events.push({
    year: formatEra(artifact.eraStart),
    title: "Creation",
    description: `Originally created during this period. ${artifact.description.split(".")[0]}.`,
  });

  // Parse the provenance string into 1-2 additional discovery/acquisition events
  const sentences = artifact.provenance
    .split(/\.(?:\s|$)/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length >= 1) {
    const yearMatch1 = sentences[0].match(/\b(\d{3,4})\b/);
    events.push({
      year: yearMatch1 ? yearMatch1[1] : "Modern Era",
      title: "Discovery",
      description: sentences[0] + ".",
    });
  }

  if (sentences.length >= 2) {
    const yearMatch2 = sentences[1].match(/\b(\d{3,4})\b/);
    events.push({
      year: yearMatch2 ? yearMatch2[1] : "Later",
      title: "Acquisition & Study",
      description: sentences[1] + ".",
    });
  }

  return events;
}

function buildScholarlyNoteSections(
  artifact: Artifact,
): { title: string; content: string }[] {
  const notes = artifact.scholarlyNotes;
  if (!notes) return [];

  // Split at sentence boundaries roughly in half to create 1-2 sections
  const sentences = notes
    .split(/\.(?:\s|$)/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length <= 2) {
    return [{ title: "Scholarly Analysis", content: notes }];
  }

  const mid = Math.ceil(sentences.length / 2);
  const firstHalf = sentences.slice(0, mid).join(". ") + ".";
  const secondHalf = sentences.slice(mid).join(". ") + ".";

  return [
    { title: "Historical Significance", content: firstHalf },
    { title: "Research & Analysis", content: secondHalf },
  ];
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

interface ArtifactPageProps {
  params: Promise<{ slug: string }>;
}

function SignificanceStars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "#D4A017" : "none"}
          stroke="#D4A017"
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default async function ArtifactPage({ params }: ArtifactPageProps) {
  const { slug } = await params;
  const artifact = getArtifactBySlug(slug);

  if (!artifact) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-gold">
          Not Found
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-wide text-parchment">
          Artifact not found
        </h1>
        <Divider variant="lotus" className="mx-auto mt-8 max-w-xs" />
        <p className="mt-10 font-body text-lg text-stone">
          The artifact &ldquo;{slug.replace(/-/g, " ")}&rdquo; could not be
          located in the Archaion collection.
        </p>
      </section>
    );
  }

  const civilizationName = getCivilizationName(artifact.civilizationId);
  const dateRange = formatDateRange(artifact);
  const dimensions = formatDimensions(artifact.dimensions);
  const materialDisplay = artifact.material.join(", ");
  const provenanceEvents = buildProvenanceEvents(artifact);
  const scholarlyNoteSections = buildScholarlyNoteSections(artifact);

  // Related artifacts: other artifacts from the same civilization (excluding current)
  const relatedArtifacts = getArtifactsByCivilization(artifact.civilizationId)
    .filter((a) => a.slug !== artifact.slug)
    .slice(0, 3)
    .map((a) => ({
      slug: a.slug,
      name: a.name,
      civilization: getCivilizationName(a.civilizationId),
      dateRange: formatDateRange(a),
      imageUrl: a.imageUrl,
    }));

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 pt-32 sm:px-6 sm:pt-28">
      {/* ---- Header ---- */}
      <header className="mb-12">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-gold">
          Artifact
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-wide text-parchment md:text-5xl">
          {artifact.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge variant="civilization">{civilizationName}</Badge>
          <Badge variant="era">{dateRange}</Badge>
          <Badge variant="type">{artifact.type}</Badge>
        </div>
        <TransparencyLabel className="mt-6" />
      </header>

      {/* ---- Main Grid: Viewer + Metadata ---- */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Viewer — 2/3 width */}
        <div className="lg:col-span-2">
          <div className="h-[400px] overflow-hidden border border-stone/20 bg-obsidian sm:h-[500px]">
            {artifact.imageUrl ? (
              <img
                src={artifact.imageUrl}
                alt={artifact.name}
                className="h-full w-full object-contain bg-obsidian"
              />
            ) : (
              <ArtifactViewer
                artifactName={artifact.name}
                artifactType={artifact.type}
              />
            )}
          </div>
        </div>

        {/* Metadata Panel — 1/3 width */}
        <aside className="flex flex-col gap-6 border border-stone/20 bg-obsidian/40 p-6">
          <h3 className="font-display text-xs uppercase tracking-[0.2em] text-gold">
            Artifact Details
          </h3>

          <div className="flex flex-col gap-4">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-stone">
                Material
              </p>
              <p className="mt-1 font-body text-base text-parchment">
                {materialDisplay}
              </p>
            </div>

            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-stone">
                Dimensions
              </p>
              <p className="mt-1 font-body text-base text-parchment">
                {dimensions}
              </p>
            </div>

            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-stone">
                Museum Location
              </p>
              <p className="mt-1 font-body text-base text-parchment">
                {artifact.museumLocation}
              </p>
            </div>

            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-stone">
                Significance
              </p>
              <div className="mt-1">
                <SignificanceStars count={artifact.significance} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ---- Description ---- */}
      <section className="mt-12">
        <p className="mx-auto max-w-3xl font-body text-lg leading-relaxed text-parchment/90">
          {artifact.description}
        </p>
      </section>

      <Divider variant="lotus" className="mx-auto mt-14 max-w-md" />

      {/* ---- Provenance Timeline ---- */}
      <section className="mt-14">
        <h2 className="mb-8 font-display text-2xl tracking-wide text-parchment">
          Provenance
        </h2>
        <div className="mx-auto max-w-2xl">
          <ProvenanceTimeline events={provenanceEvents} />
        </div>
      </section>

      <Divider variant="meander" className="mx-auto mt-14 max-w-md" />

      {/* ---- Scholarly Notes ---- */}
      <section className="mt-14">
        <h2 className="mb-6 font-display text-2xl tracking-wide text-parchment">
          Scholarly Notes
        </h2>
        <div className="mx-auto max-w-3xl">
          <ScholarlyNotes sections={scholarlyNoteSections} />
        </div>
      </section>

      <Divider variant="arabesque" className="mx-auto mt-14 max-w-md" />

      {/* ---- Related Artifacts ---- */}
      <section className="mt-14">
        <h2 className="mb-6 font-display text-2xl tracking-wide text-parchment">
          Related Artifacts
        </h2>
        <RelatedArtifacts artifacts={relatedArtifacts} />
      </section>

      {/* ---- Bottom Divider ---- */}
      <Divider variant="lotus" className="mx-auto mt-16 max-w-xs" />
    </article>
  );
}
