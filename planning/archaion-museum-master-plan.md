# Archaion Virtual Museum — Master Plan
> *A Digital Sanctuary of Human Antiquity*  
> Master Blueprint — Version 1.0

---

## Table of Contents

1. [Design System](#1-design-system)
2. [Pages & Features](#2-pages--features)
3. [3D & Timeline Architecture](#3-3d--timeline-architecture)
4. [Artifact Database](#4-artifact-database)
5. [Technology Stack](#5-technology-stack)
6. [Build Plan](#6-build-plan)

---

## 1. Design System

### Design Philosophy

The visual language draws from stone relief carvings, ancient manuscript illumination, and the warm material palette of the ancient world — sandstone, obsidian, ochre, lapis lazuli, and aged gold. Every interaction should feel like unwrapping an artefact.

### Colour Palette

| Token | Name | Hex |
|-------|------|-----|
| `--color-sandstone` | Sandstone | `#C9A96E` |
| `--color-gold` | Aged Gold | `#D4A017` |
| `--color-obsidian` | Obsidian | `#1A1410` |
| `--color-terracotta` | Terracotta | `#C1440E` |
| `--color-lapis` | Lapis | `#1B3A6B` |
| `--color-parchment` | Parchment | `#F5EDD6` |
| `--color-stone` | Stone | `#6B5E4A` |
| `--color-ochre` | Ochre | `#B8860B` |

### Typography

| Role | Font | Usage |
|------|------|-------|
| Display / Headings | **Cinzel Serif** | Page titles, section headers, navigation, artifact names |
| Body / Prose | **Cormorant Garamond** | Descriptions, scholarly notes, UI body text |
| Monospace | **Fira Code** | Metadata, dates, coordinates, technical data |

#### Type Scale

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Display XL | 72px | 700 | Hero titles |
| Display L | 48px | 700 | Page headers |
| H1 | 36px | 600 | Section titles |
| H2 | 28px | 600 | Sub-sections |
| H3 | 22px | 600 | Card titles |
| Body L | 18px | 300 (italic) | Introductory prose |
| Body | 16px | 400 | General body copy |
| Caption | 12px | 400 | Metadata, labels |
| Eyebrow | 10px | 400 (tracked 4px) | Section labels, badges |

### Visual Language Rules

**Texture as atmosphere**
Subtle noise overlays on backgrounds simulate stone and parchment. SVG displacement filters on hero sections. Never garish — always whispered.

**Gold as accent, never fill**
Gold (`#D4A017`) reserved strictly for interactive elements, borders on featured artifacts, and decorative ornaments. Primary text stays obsidian.

**Reverent pacing**
All transitions 600–900ms. Easing curves that feel like slow stone sliding. No snappy, modern pop — everything breathes and settles.

**Ornamental geometry**
Greek meander, Islamic arabesque, and Egyptian lotus patterns as SVG dividers and border details. Never digital-looking gradients.

### Animation Tokens

```css
--duration-fast:    300ms;
--duration-normal:  600ms;
--duration-slow:    900ms;
--duration-cinematic: 1800ms;
--ease-stone:       cubic-bezier(0.25, 0.1, 0.1, 1.0);
--ease-reveal:      cubic-bezier(0.0, 0.0, 0.2, 1.0);
```

---

## 2. Pages & Features

### Site Architecture — Six Core Experiences

Each page is a distinct spatial experience. Navigation between them should feel like moving between chambers of a real museum.

---

#### Page 01 — The Grand Entrance

**URL:** `/`

Full-screen 3D WebGL portal. Ancient columns frame a glowing threshold. Particles drift like ancient dust. Scroll to enter.

| Feature | Detail |
|---------|--------|
| Hero | Three.js WebGL scene with Doric columns and volumetric light shaft |
| Particles | 2,000 gold dust motes with GLSL shader animation |
| Entry sequence | GSAP ScrollTrigger — camera pushes through portal on scroll |
| Ambient audio | Low-frequency stone room reverb, optional |
| Navigation | Minimal Cinzel header fades in after entry |
| CTA | "Enter the Museum" — glowing gold inscription |

**Key technologies:** Three.js · Theatre.js cinematic camera · GSAP ScrollTrigger · Web Audio API

---

#### Page 02 — The Chronicle

**URL:** `/chronicle`

Horizontal scroll timeline spanning 3.3 million years. Civilizations appear as glowing nodes on a stone-textured band.

| Feature | Detail |
|---------|--------|
| Canvas | Full-width horizontal SVG/Canvas timeline |
| Scroll | Lenis smooth scroll + GSAP horizontal pin |
| Scale | 3.3M BC → 1500 AD, logarithmic time compression |
| Nodes | Civilizations as glowing amber orbs with name labels |
| Click | Node expands to show civilization summary + artifact thumbnails |
| Zoom | Mouse wheel zooms into century-level detail |
| Visual | Stone-texture band background with aged patina |

**Key technologies:** GSAP ScrollTrigger horizontal · Canvas 2D or SVG · Framer Motion for node expand

---

#### Page 03 — The Collection

**URL:** `/collection`

Masonry grid of all artifacts. Filter by civilization, era, material, type. Each card reveals provenance on hover.

| Feature | Detail |
|---------|--------|
| Layout | Masonry grid, 3–4 columns responsive |
| Filters | Civilization · Era range slider · Material · Type · Significance rank |
| Search | Full-text via Meilisearch, instant results |
| Card | Artifact image, name, civilization badge, date range |
| Hover | Card lifts with gold border, provenance text fades in |
| Load | Infinite scroll with skeleton shimmer |
| Sorting | By date (oldest/newest), significance, recently added |

**Key technologies:** Meilisearch instant search · Framer Motion stagger · React Masonry CSS

---

#### Page 04 — Artifact Sanctum

**URL:** `/artifact/[slug]`

Dedicated artifact page with interactive 3D model viewer, provenance timeline, related artifacts, and scholarly notes.

| Feature | Detail |
|---------|--------|
| 3D Viewer | React Three Fiber with GLTF/GLB model loader |
| Controls | OrbitControls — rotate, zoom, pan |
| Annotation pins | Clickable hotspots highlighting artifact details |
| Measurement tool | On-screen ruler tool for scale |
| Presentation mode | Dramatic spotlight, dark background |
| AR export | WebXR `<model-viewer>` for mobile AR view |
| Fallback | 360° photogrammetry spin for artifacts without 3D model |
| Provenance | Artifact-specific mini-timeline on page |
| Related | Horizontal scroll of related artifacts |
| Scholarly notes | Expandable accordion for academic content |

**Key technologies:** React Three Fiber · Drei OrbitControls · @google/model-viewer for AR · ISR

---

#### Page 05 — The Atlas

**URL:** `/atlas`

Ancient-styled world map. Click regions to fly into civilizations and their artifacts.

| Feature | Detail |
|---------|--------|
| Base map | Mapbox GL JS with custom antique watercolour tile style |
| Civilizations | Territory polygon overlays coloured by civilization |
| Time scrubber | Drag to watch empires expand and contract across centuries |
| Fly-to | Smooth animated flyover when clicking a civilization |
| Artifact pins | Georeferenced artifact locations as custom SVG markers |
| Density | deck.gl heatmap showing artifact concentration |
| Tooltip | Hover a territory for civilization summary card |

**Key technologies:** Mapbox GL JS · deck.gl · Custom Stamen-style antique tile set · PostGIS

---

#### Page 06 — Virtual Galleries

**URL:** `/galleries`

First-person walkthrough of reconstructed ancient gallery rooms. Artifacts mounted on walls.

| Feature | Detail |
|---------|--------|
| Rooms | 4 themed galleries: Egypt · Greece · Mesopotamia · Rome |
| Navigation | WASD + pointer-lock first-person camera |
| Artifacts | High-res images and 3D models mounted on gallery walls |
| Interaction | Walk up to artifact → click → opens Artifact Sanctum |
| Lighting | Dynamic torch-light simulation with shadow casting |
| Architecture | Low-poly ancient room geometry with normal-mapped stone textures |
| Intro | Theatre.js cinematic camera sweep on entry |
| Audio | Ambient room tone, footstep sounds |

**Key technologies:** React Three Fiber · Drei PointerLockControls · Theatre.js · Three.js shadow maps

---

## 3. 3D & Timeline Architecture

### The Chronicle Timeline — Technical Design

```
Timeline Scale (logarithmic compression)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3,300,000 BC ────────────────────────── 1,500 AD
     │              │         │    │  │││
  Lomekwi       Egypt     Greece  Rome Islamic
  Stone Age   Dynastic   Classical  Republic  Golden Age
```

**Implementation approach:**
- `gsap.to()` with `ScrollTrigger` horizontal pinning
- Time-to-pixel mapping function with logarithmic scale for prehistoric periods
- Civilization nodes rendered as SVG `<circle>` with CSS glow animation
- Click handler opens a Framer Motion drawer with civilization summary

### 3D Artifact Viewer — Component Spec

```
ArtifactViewer/
├── ArtifactViewer.tsx         ← Main R3F Canvas wrapper
├── ModelLoader.tsx            ← GLTF/GLB with Draco + Suspense
├── Controls.tsx               ← OrbitControls + keyboard shortcuts
├── Lighting.tsx               ← Museum HDRI + fill lights
├── AnnotationSystem.tsx       ← 3D hotspot pins
├── MeasurementTool.tsx        ← On-screen scale ruler
├── PresentationMode.tsx       ← Spotlight + dark env mode
└── FallbackSpinViewer.tsx     ← 360° photo fallback
```

**Lighting configuration:**
- Primary: Museum HDRI environment map (neutral studio)
- Key light: `DirectionalLight` intensity 1.2, casts shadows
- Fill light: `HemisphereLight` sky `#F5EDD6`, ground `#1A1410`
- Presentation mode: Single `SpotLight` from 45° above

**3D model sources:**
| Source | License | Volume |
|--------|---------|--------|
| Smithsonian Open Access | CC0 | 2,800,000 objects |
| Sketchfab Cultural Heritage | CC-BY | Community contributed |
| Europeana 3D | CC0 | European collections |
| Self-hosted photogrammetry | Proprietary | Curated high-priority artifacts |

**Performance strategy:**
- Draco geometry compression on all GLB files
- LOD (Level of Detail) — 3 quality tiers per model
- Progressive loading: placeholder sphere → low LOD → full quality
- Lazy canvas mount: R3F canvas only initialises when artifact viewer scrolls into view

### Virtual Gallery — Room Architecture

```
GalleryRoom (R3F Scene)
├── Architecture
│   ├── Floor (normal-mapped stone tile)
│   ├── Walls (arched stone corridors)
│   ├── Ceiling (barrel vault geometry)
│   └── Lighting (torch sconces with PointLight)
├── ArtifactMounts[]
│   ├── WallPlaque (artifact image as PlaneGeometry)
│   ├── Pedestal (artifact 3D model on plinth)
│   └── InfoPanel (floating HTML label via Drei Html)
└── Navigation
    ├── PointerLockControls
    ├── Collision detection (raycaster vs wall planes)
    └── MovementController (WASD + mouse look)
```

---

## 4. Artifact Database

### Schema

#### `artifacts`

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` PK | Primary key |
| `name` | `text` | Official artifact name |
| `description` | `text` | Scholarly description |
| `civilization_id` | `uuid` FK | → civilizations |
| `era_start_bce` | `int` | Earliest date estimate (negative = BCE) |
| `era_end_bce` | `int` | Latest date estimate |
| `material` | `text[]` | e.g. `['gold', 'lapis lazuli']` |
| `type` | `enum` | sculpture · vessel · scroll · coin · jewellery · weapon · tool · textile |
| `location_found` | `geometry(Point)` | PostGIS point — excavation site |
| `museum_location` | `text` | Current holding museum |
| `accession_number` | `text` | Museum accession reference |
| `model_url` | `text` | Cloudflare R2 GLB/GLTF asset URL |
| `images` | `jsonb` | `[{ url, width, height, caption }]` |
| `dimensions` | `jsonb` | `{ height_cm, width_cm, depth_cm, weight_kg }` |
| `tags` | `text[]` | Full-text search tags |
| `significance` | `int` (1–5) | Editorial importance rank |
| `is_featured` | `bool` | Show on homepage / Collection hero |
| `source` | `text` | Data origin (Smithsonian, Met, etc.) |
| `source_id` | `text` | External system identifier |
| `created_at` | `timestamptz` | |
| `updated_at` | `timestamptz` | |

#### `civilizations`

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` PK | |
| `name` | `text` | e.g. Ancient Egypt |
| `slug` | `text` | URL-safe identifier |
| `region` | `text` | Geographic region |
| `period_start` | `int` | BCE start (negative) |
| `period_end` | `int` | CE end |
| `description` | `text` | Overview |
| `color_hex` | `text` | Map & timeline colour |
| `territory` | `geometry(Polygon)` | PostGIS territory shape |

#### `collections`

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` PK | |
| `name` | `text` | Curated collection name |
| `slug` | `text` | |
| `curator_note` | `text` | Editorial introduction |
| `artifact_ids` | `uuid[]` | Ordered artifact list |
| `theme` | `enum` | death · trade · war · religion · daily-life · astronomy |
| `cover_image_url` | `text` | |

#### `artifact_annotations`

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` PK | |
| `artifact_id` | `uuid` FK | → artifacts |
| `position_x` | `float` | 3D model local X coordinate |
| `position_y` | `float` | 3D model local Y coordinate |
| `position_z` | `float` | 3D model local Z coordinate |
| `title` | `text` | Annotation hotspot label |
| `body` | `text` | Detailed annotation text |

### Indexes

```sql
-- Full-text search
CREATE INDEX artifacts_fts ON artifacts 
  USING GIN(to_tsvector('english', name || ' ' || description || ' ' || array_to_string(tags, ' ')));

-- Trigram search for partial matches
CREATE INDEX artifacts_name_trgm ON artifacts USING GIN(name gin_trgm_ops);

-- Geospatial
CREATE INDEX artifacts_location ON artifacts USING GIST(location_found);
CREATE INDEX civilizations_territory ON civilizations USING GIST(territory);

-- Common filters
CREATE INDEX artifacts_era ON artifacts(era_start_bce, era_end_bce);
CREATE INDEX artifacts_civilization ON artifacts(civilization_id);
CREATE INDEX artifacts_type ON artifacts(type);
```

### Data Sources

| Source | License | Volume | Notes |
|--------|---------|--------|-------|
| Smithsonian Open Access | CC0 | 2.8M objects | Includes 3D models |
| The Metropolitan Museum | CC0 | 470k images | High-res photography |
| Europeana APIs | CC0 / CC-BY | 50M records | European collections |
| Sketchfab Cultural Heritage | CC-BY | Variable | 3D model community |
| Wikidata SPARQL | CC0 | Unlimited | Linked structured data |
| IIIF Manifests | Varies | Universal | Standard image API |

### Artifact Types Reference

```
sculpture    → Statuary, reliefs, figurines, busts
vessel       → Amphorae, kraters, canopic jars, urns
scroll       → Papyri, parchment manuscripts, clay tablets
coin         → Coinage, medals, tokens
jewellery    → Necklaces, rings, crowns, amulets
weapon       → Swords, spears, shields, armour
tool         → Agricultural, domestic, surgical instruments
textile      → Woven cloth, embroidery, tapestry
mosaic       → Floor and wall mosaics
architecture → Architectural fragments, column capitals, friezes
```

---

## 5. Technology Stack

### Frontend

| Technology | Role |
|-----------|------|
| **Next.js 14** | App Router · Server Components · ISR for artifact pages |
| **TypeScript** (strict) | Full type safety across artifact data models |
| **Tailwind CSS** | Utility base + custom ancient theme token extension |

### 3D & Animation

| Technology | Role |
|-----------|------|
| **React Three Fiber** | Declarative Three.js — gallery walkthroughs, hero portal, artifact viewer |
| **Drei** | OrbitControls, GLTF loader, environment maps, PointerLockControls |
| **Theatre.js** | Cinematic entrance sequences, keyframe-driven 3D camera paths |
| **GSAP + ScrollTrigger** | Chronicle horizontal scroll, parallax reveal, entrance animations |
| **Framer Motion** | UI micro-interactions, page transitions, stagger effects |
| **Lenis** | Smooth inertial scrolling — essential for the chronicle timeline |
| **Three.js** | Underlying 3D engine via R3F |

### Data & Backend

| Technology | Role |
|-----------|------|
| **PostgreSQL** | Primary artifact database + PostGIS + pg_trgm extensions |
| **Drizzle ORM** | Type-safe queries, migrations, schema management |
| **tRPC** | End-to-end typed API between Next.js and database |
| **Redis** | Cache artifact queries, timeline data, 3D asset manifests |
| **Cloudflare R2** | GLB/GLTF model storage, CDN-delivered high-res images |
| **Meilisearch** | Full-text artifact search with faceted filtering |

### Maps & Spatial

| Technology | Role |
|-----------|------|
| **Mapbox GL JS** | The Atlas page — custom antique map tile style |
| **deck.gl** | Artifact density heatmaps, civilization territory overlays |
| **Stamen Watercolour** | Painterly map tiles for ancient-look geography |

### Infrastructure

| Technology | Role |
|-----------|------|
| **Vercel** | Hosting, edge functions, ISR, image optimisation |
| **Cloudflare R2** | Asset storage with global CDN |
| **Neon / Supabase** | Managed PostgreSQL with PostGIS |
| **Upstash Redis** | Serverless Redis for caching |
| **Meilisearch Cloud** | Hosted full-text search |

---

## 6. Build Plan

### Phase I — Foundation & Design System
> **Duration:** Week 1–2  
> **Goal:** Establish the visual language before all else

- [ ] Next.js 14 project scaffold with TypeScript strict
- [ ] Tailwind config with all ancient theme tokens (colours, spacing, animation)
- [ ] Font integration: Cinzel + Cormorant Garamond via `next/font`
- [ ] `lib/tokens.ts` — single source of truth for all design values
- [ ] Shared component library: Button, Badge, Card, ArtifactCard
- [ ] Ornamental SVG divider components (Greek meander, lotus border)
- [ ] Navigation shell with Cinzel header and ancient underline reveal
- [ ] Global page transition wrapper (fade + subtle stone-slide)
- [ ] Storybook setup for component documentation

**Deliverable:** Design system is fully built. Any page can be scaffolded consistently.

---

### Phase II — Database & Artifact Data Pipeline
> **Duration:** Week 3–4  
> **Goal:** Data before UI, always

- [ ] PostgreSQL + PostGIS setup (Neon or Supabase)
- [ ] Drizzle ORM schema from blueprint above
- [ ] Smithsonian Open Access API ingestion script
- [ ] The Met Open Access data pipeline
- [ ] Wikidata SPARQL enrichment for provenance data
- [ ] Meilisearch indexing configuration with facets
- [ ] Seed database: 200 curated artifacts across 8 civilizations
- [ ] tRPC router: `artifacts.list`, `artifacts.byId`, `artifacts.search`
- [ ] Redis caching layer for list queries (5 min TTL)
- [ ] Cloudflare R2 bucket + image upload pipeline

**Deliverable:** Full artifact database seeded. API endpoints working.

---

### Phase III — Collection & Artifact Pages
> **Duration:** Week 5–6  
> **Goal:** The core museum browsing experience

- [ ] `/collection` page with masonry grid layout
- [ ] Advanced filter panel: civilization, era range slider, material, type, significance
- [ ] Meilisearch instant search integration
- [ ] Framer Motion stagger reveal on grid load
- [ ] Infinite scroll with React Query + cursor pagination
- [ ] Artifact card: image, name, civilization badge, date, hover state
- [ ] `/artifact/[slug]` detail page skeleton
- [ ] Provenance mini-timeline on artifact page
- [ ] Related artifacts horizontal scroll panel
- [ ] Scholarly notes expandable accordion
- [ ] ISR with 1hr revalidation for all artifact pages
- [ ] schema.org `VisualArtwork` structured data for SEO

**Deliverable:** Full museum browsing flow working end-to-end.

---

### Phase IV — 3D Artifact Viewer & Hero Portal
> **Duration:** Week 7–9  
> **Goal:** The signature immersive layer

- [ ] React Three Fiber `ArtifactViewer` component
- [ ] GLTF/GLB loading with Draco compression via `@react-three/drei`
- [ ] OrbitControls with keyboard shortcuts
- [ ] Museum HDRI lighting environment
- [ ] Annotation pin system (3D hotspots → tooltip)
- [ ] Measurement tool overlay
- [ ] Presentation mode: spotlight + dark environment
- [ ] `FallbackSpinViewer` for artifacts without 3D models
- [ ] WebXR `<model-viewer>` for mobile AR
- [ ] Grand Entrance homepage hero — Three.js Doric column portal
- [ ] Gold particle dust system (GLSL shader, 2,000 particles)
- [ ] Theatre.js cinematic camera intro sequence on homepage
- [ ] Performance: LOD switching, lazy canvas mount

**Deliverable:** 3D artifact viewing and homepage hero fully functional.

---

### Phase V — The Chronicle Timeline & The Atlas
> **Duration:** Week 10–12  
> **Goal:** The two signature navigation experiences

**Chronicle Timeline:**
- [ ] GSAP horizontal `ScrollTrigger` pin on full-width canvas
- [ ] Logarithmic time scale mapping function (3.3M BC → 1500 AD)
- [ ] Civilization nodes as glowing amber SVG circles with name labels
- [ ] Click → Framer Motion drawer with civilization summary + artifact thumbnails
- [ ] Mouse wheel zoom into century-level resolution
- [ ] Stone-texture scrolling band background

**The Atlas:**
- [ ] Mapbox GL JS with custom antique watercolour tile style
- [ ] Civilization territory polygon overlays with era-accurate colours
- [ ] Time scrubber slider → territory shapes animate in/out
- [ ] Fly-to animation on civilization click (Mapbox `flyTo`)
- [ ] deck.gl `HeatmapLayer` for artifact discovery density
- [ ] Artifact marker layer → click opens artifact drawer
- [ ] PostGIS spatial queries for viewport-bounded artifact loading

**Deliverable:** Both explore-by-time and explore-by-place journeys complete.

---

### Phase VI — Virtual Galleries & Full Polish
> **Duration:** Week 13–16  
> **Goal:** The crowning experience + production readiness

**Virtual Galleries:**
- [ ] 4 gallery rooms in React Three Fiber (Egypt, Greece, Mesopotamia, Rome)
- [ ] Low-poly stone architecture with normal-mapped textures
- [ ] Torch sconce `PointLight` with shadow casting
- [ ] Drei `PointerLockControls` for WASD first-person navigation
- [ ] Collision detection with raycaster against wall planes
- [ ] Artifacts mounted as interactive `PlaneGeometry` wall pieces
- [ ] Theatre.js cinematic intro camera sweep per gallery
- [ ] Web Audio API ambient room tone per gallery type
- [ ] Click artifact in gallery → opens Artifact Sanctum overlay

**Polish & Production:**
- [ ] Full Lighthouse audit — target 90+ on all six pages
- [ ] 3D performance audit: texture compression, draw call reduction
- [ ] Accessibility: keyboard navigation for all 3D content, ARIA labels
- [ ] `prefers-reduced-motion` — disable all animations gracefully
- [ ] Responsive design: tablet and mobile layouts
- [ ] Open Graph images for all artifact pages
- [ ] Sitemap generation for all artifact slugs

**Deliverable:** Production-ready museum, fully accessible, fully performant.

---

## Appendix — Folder Structure

```
archaion-museum/
├── app/                        ← Next.js App Router
│   ├── (museum)/
│   │   ├── page.tsx            ← Grand Entrance (/)
│   │   ├── chronicle/
│   │   ├── collection/
│   │   ├── artifact/[slug]/
│   │   ├── atlas/
│   │   └── galleries/
│   └── api/
│       └── trpc/
├── components/
│   ├── ui/                     ← Buttons, cards, badges, dividers
│   ├── 3d/                     ← All React Three Fiber components
│   │   ├── ArtifactViewer/
│   │   ├── GalleryRoom/
│   │   └── HeroPortal/
│   ├── timeline/               ← Chronicle components
│   └── map/                    ← Atlas components
├── server/
│   ├── db/                     ← Drizzle schema + migrations
│   └── routers/                ← tRPC routers
├── lib/
│   ├── tokens.ts               ← Design system tokens
│   └── utils/
├── scripts/
│   └── ingest/                 ← Data pipeline scripts
│       ├── smithsonian.ts
│       ├── met.ts
│       └── wikidata.ts
├── public/
│   └── models/                 ← Sample GLB files
├── CLAUDE.md                   ← Claude Code project context
└── docs/
    ├── design-system.md
    └── data-sources.md
```

---

## Appendix — CLAUDE.md Starter

```markdown
# Archaion Virtual Museum — CLAUDE.md

## Project
Ancient-themed virtual museum. Next.js 14 App Router, TypeScript strict,
Tailwind CSS with custom ancient design tokens.

## Tech Stack
- Framework: Next.js 14 (App Router, Server Components, ISR)
- 3D: React Three Fiber + Drei + Theatre.js
- Animation: GSAP + ScrollTrigger, Framer Motion, Lenis
- DB: PostgreSQL + Drizzle ORM + PostGIS
- Search: Meilisearch
- API: tRPC
- Storage: Cloudflare R2
- Maps: Mapbox GL JS

## Commands
- Dev server:   npm run dev
- Type check:   npm run typecheck
- DB migrate:   npm run db:migrate
- Build:        npm run build
- Lint:         npm run lint

## Code Style
- ES modules only (import/export), never CommonJS require
- Functional components + hooks only, no class components
- All 3D components in /components/3d/
- All data fetching via tRPC in /server/routers/
- Tailwind for all styling — no CSS modules, no inline style unless Three.js
- Always reference lib/tokens.ts before writing custom colour values

## Key Conventions
- Artifact 3D model = .glb file, stored in R2, referenced by artifacts.model_url
- Design token reference: see /lib/tokens.ts before writing any custom styles
- Pattern for new 3D components: follow /components/3d/ArtifactViewer.tsx
- Pattern for new tRPC routes: follow /server/routers/artifacts.ts
```

---

*Document generated from the Archaion Virtual Museum Master Blueprint v1.0*
