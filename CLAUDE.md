# Archaion — Project Context

## Overview
Archaion is an immersive digital museum exploring the ancient world. It features a 3D WebGL entrance portal, interactive timelines, artifact collections with filtering, geographic SVG maps, 3D artifact viewers, and virtual gallery walkthroughs.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (`@theme inline` for tokens)
- **3D:** React Three Fiber + @react-three/drei + Three.js
- **Animation:** Framer Motion, GSAP (available)
- **Smooth Scroll:** @studio-freight/lenis
- **React:** 19 (with React Compiler enabled)
- **Utilities:** clsx
- **Node:** >=22 (see .nvmrc)

## Design System
- **Fonts:** Cinzel (display/headings), Cormorant Garamond (body), Fira Code (mono)
- **Color Palette:** obsidian (#1A1A2E) background, parchment (#F5F0E8) text, gold (#C9A84C) accent, sandstone, terracotta, lapis, stone, ochre
- **Always dark theme** — no light/dark toggle, obsidian is the base
- **Design tokens** live in `src/lib/tokens.ts`
- **Tailwind tokens** registered via `@theme inline` in `globals.css`

## Architecture
```
src/
  app/
    layout.tsx            # Root layout (fonts, metadata)
    globals.css           # Tailwind theme & base styles
    (museum)/             # Route group with museum layout
      layout.tsx          # Applies MuseumLayout (header/footer/transitions)
      page.tsx            # Grand Entrance (3D portal + featured artifacts)
      chronicle/          # Horizontal scroll timeline
      collection/         # Masonry grid with filtering
      artifact/[slug]/    # Artifact detail (3D viewer, provenance, notes)
      atlas/              # Interactive SVG ancient world map
      galleries/          # 3D gallery room walkthroughs
  components/
    ui/                   # Reusable UI primitives (Button, Badge, Card, etc.)
    layout/               # Shell (Header, Footer, MuseumLayout, PageTransition)
    3d/                   # R3F components (HeroPortal, GoldParticles, ArtifactViewer, GalleryRoom)
    timeline/             # Chronicle components (TimelineView, TimelineNode, CivilizationDrawer)
    collection/           # Collection components (CollectionView, CollectionGrid, FilterPanel)
    artifact/             # Artifact detail components (ProvenanceTimeline, ScholarlyNotes, RelatedArtifacts)
    map/                  # Atlas components (AncientMap)
    galleries/            # Gallery components (GallerySelector, GalleryExperience)
  lib/
    tokens.ts             # Design token constants
    data/                 # Mock data layer
      civilizations.ts    # 8 civilizations with metadata
      artifacts.ts        # 24 real-world artifacts with full metadata
      index.ts            # Helper functions (search, filter, getBySlug, etc.)
```

## Data Layer
Currently uses local TypeScript mock data (`src/lib/data/`). The master plan envisions PostgreSQL + Drizzle ORM + tRPC + Meilisearch for the production backend.

## Conventions
- Components use `"use client"` only when they need browser APIs, R3F, or Framer Motion
- Page components are server components by default
- 3D components use `dynamic(() => import(...), { ssr: false })` to avoid SSR issues
- Cinzel font for all headings and navigation (uppercase, tracked)
- Cormorant Garamond for body text
- Gold (#C9A84C) for accents, hover states, and interactive elements
- Stone borders (`border-stone/30`) for card/section boundaries
- Animation transitions use the `transitions` presets from `tokens.ts`
- Page transitions: 600ms fade + vertical slide via Framer Motion AnimatePresence

## Commands
- `npm run dev` — Start dev server (requires Node 22+)
- `npm run build` — Production build (verifies TypeScript)
- `npm run lint` — ESLint
