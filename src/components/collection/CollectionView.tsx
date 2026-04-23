"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterPanel, { EMPTY_FILTERS, type FilterValues } from "./FilterPanel";
import CollectionGrid from "./CollectionGrid";
import { useTransparency, getTransparencyLabel } from "@/lib/TransparencyContext";

export interface Artifact {
  id: string;
  name: string;
  slug: string;
  civilization: string;
  dateRange: string;
  numericYear: number; // negative = BCE
  type: string;
  material: string[];
  significance: number;
  isFeatured: boolean;
  provenance: string;
  imageUrl: string;
}

const ARTIFACTS: Artifact[] = [
  // ── Ancient Egypt ──────────────────────────────────────────────────
  {
    id: "1",
    name: "Recumbent Lion",
    slug: "recumbent-lion",
    civilization: "Egyptian",
    dateRange: "ca. 2575–2450 B.C.",
    numericYear: -2575,
    type: "sculpture",
    material: ["granite"],
    significance: 5,
    isFeatured: true,
    provenance:
      "A masterfully carved recumbent lion from the Old Kingdom, one of the earliest known large-scale Egyptian stone sculptures.",
    imageUrl: "https://images.metmuseum.org/CRDImages/eg/web-large/DT2860.jpg",
  },
  {
    id: "2",
    name: "Senwosret III as a Sphinx",
    slug: "senwosret-iii-sphinx",
    civilization: "Egyptian",
    dateRange: "ca. 1878–1840 B.C.",
    numericYear: -1878,
    type: "sculpture",
    material: ["gneiss"],
    significance: 5,
    isFeatured: true,
    provenance:
      "A powerful sphinx bearing the face of Pharaoh Senwosret III, conveying unprecedented realism in royal portraiture.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/eg/web-large/DP247658.jpg",
  },
  {
    id: "3",
    name: "Haremhab as a Scribe of the King",
    slug: "haremhab-scribe",
    civilization: "Egyptian",
    dateRange: "ca. 1336–1323 B.C.",
    numericYear: -1336,
    type: "sculpture",
    material: ["granodiorite"],
    significance: 4,
    isFeatured: true,
    provenance:
      "A granodiorite statue depicting Haremhab seated as a royal scribe, before he became the last pharaoh of the 18th Dynasty.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/eg/web-large/DP238391.jpg",
  },
  {
    id: "4",
    name: "Statuette of Isis with the Infant Horus",
    slug: "isis-infant-horus",
    civilization: "Egyptian",
    dateRange: "332–30 BCE",
    numericYear: -332,
    type: "sculpture",
    material: ["faience"],
    significance: 3,
    isFeatured: false,
    provenance:
      "A delicate faience statuette of the goddess Isis nursing the infant Horus, from the Ptolemaic Period.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/eg/web-large/DP241036.jpg",
  },
  {
    id: "5",
    name: "Attendants in a Procession (Amarna Relief)",
    slug: "amarna-procession-relief",
    civilization: "Egyptian",
    dateRange: "ca. 1353–1336 B.C.",
    numericYear: -1353,
    type: "architecture",
    material: ["limestone", "pigment"],
    significance: 4,
    isFeatured: false,
    provenance:
      "A painted limestone talatat block depicting attendants in a ceremonial procession from the Amarna Period.",
    imageUrl: "https://images.metmuseum.org/CRDImages/eg/web-large/DT8198.jpg",
  },

  // ── Ancient Greece ─────────────────────────────────────────────────
  {
    id: "6",
    name: "Marble Grave Stele of a Little Girl",
    slug: "grave-stele-little-girl",
    civilization: "Greek",
    dateRange: "ca. 450–440 BCE",
    numericYear: -450,
    type: "sculpture",
    material: ["Parian marble"],
    significance: 5,
    isFeatured: true,
    provenance:
      "An exquisite Parian marble funerary stele depicting a young girl holding two doves, one of the finest Classical Greek funerary works.",
    imageUrl: "https://images.metmuseum.org/CRDImages/gr/web-large/DT279.jpg",
  },
  {
    id: "7",
    name: "Marble Head of a Goddess",
    slug: "marble-head-goddess",
    civilization: "Greek",
    dateRange: "4th century BCE",
    numericYear: -350,
    type: "sculpture",
    material: ["marble"],
    significance: 4,
    isFeatured: false,
    provenance:
      "A beautifully preserved marble head from the Late Classical period with serene expression characteristic of 4th-century sculpture.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/gr10.124.1.R.jpg",
  },
  {
    id: "8",
    name: "Marble Head of a Ptolemaic Queen",
    slug: "ptolemaic-queen-head",
    civilization: "Greek",
    dateRange: "ca. 270–250 BCE",
    numericYear: -270,
    type: "sculpture",
    material: ["marble"],
    significance: 4,
    isFeatured: true,
    provenance:
      "A striking marble portrait head of a Ptolemaic queen, blending Greek sculptural technique with Egyptian royal iconography.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DP333700.jpg",
  },
  {
    id: "9",
    name: "Marble Statue of Eirene (Personification of Peace)",
    slug: "eirene-statue",
    civilization: "Greek",
    dateRange: "ca. 14–68 CE",
    numericYear: 14,
    type: "sculpture",
    material: ["Pentelic marble"],
    significance: 5,
    isFeatured: true,
    provenance:
      "A near-complete Roman marble copy of a Greek original depicting Eirene, the personification of Peace.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DT11659.jpg",
  },
  {
    id: "10",
    name: "Marble Akroterion with Palmette",
    slug: "marble-akroterion",
    civilization: "Greek",
    dateRange: "ca. 350–325 BCE",
    numericYear: -350,
    type: "architecture",
    material: ["marble"],
    significance: 3,
    isFeatured: false,
    provenance:
      "A graceful marble akroterion from a Classical Attic building, featuring an intricate palmette design.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DT259543.jpg",
  },

  // ── Roman Empire ───────────────────────────────────────────────────
  {
    id: "11",
    name: "Diadoumenos (Youth Tying a Fillet)",
    slug: "diadoumenos",
    civilization: "Roman",
    dateRange: "ca. 69–96 CE",
    numericYear: 69,
    type: "sculpture",
    material: ["marble"],
    significance: 5,
    isFeatured: true,
    provenance:
      "A Roman marble copy of the celebrated bronze Diadoumenos by Polykleitos, depicting a victorious athlete.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DT11982.jpg",
  },
  {
    id: "12",
    name: "Marble Sarcophagus with Triumph of Dionysos and the Seasons",
    slug: "dionysos-sarcophagus",
    civilization: "Roman",
    dateRange: "ca. 260–270 CE",
    numericYear: 260,
    type: "sculpture",
    material: ["marble"],
    significance: 5,
    isFeatured: true,
    provenance:
      "A magnificent Roman sarcophagus carved in deep relief depicting the triumphal procession of Dionysos with the four Seasons.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DP-14287-144.jpg",
  },
  {
    id: "13",
    name: "Marble Sarcophagus with Garlands",
    slug: "garland-sarcophagus",
    civilization: "Roman",
    dateRange: "ca. 200–225 CE",
    numericYear: 200,
    type: "sculpture",
    material: ["Proconnesian marble"],
    significance: 4,
    isFeatured: false,
    provenance:
      "A Severan-period sarcophagus decorated with heavy fruit and flower garlands supported by putti and rams' heads.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DP140135.jpg",
  },
  {
    id: "14",
    name: "Marble Head of an Athlete",
    slug: "athlete-head",
    civilization: "Roman",
    dateRange: "ca. 138–192 CE",
    numericYear: 138,
    type: "sculpture",
    material: ["marble"],
    significance: 3,
    isFeatured: false,
    provenance:
      "A sensitively carved marble head of a young athlete from the Antonine period with tousled curly hair.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DP-14287-137retry.jpg",
  },
  {
    id: "15",
    name: "Marble Head of a Hellenistic Ruler",
    slug: "hellenistic-ruler-head",
    civilization: "Roman",
    dateRange: "1st–2nd century CE",
    numericYear: 100,
    type: "sculpture",
    material: ["marble"],
    significance: 3,
    isFeatured: false,
    provenance:
      "A Roman imperial marble head depicting a Hellenistic ruler with distinctive upswept hair and intense gaze.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DP119205.jpg",
  },

  // ── Mesopotamia ────────────────────────────────────────────────────
  {
    id: "16",
    name: "Human-Headed Winged Lion (Lamassu)",
    slug: "met-lamassu",
    civilization: "Mesopotamian",
    dateRange: "ca. 883–859 BCE",
    numericYear: -883,
    type: "sculpture",
    material: ["gypsum alabaster"],
    significance: 5,
    isFeatured: true,
    provenance:
      "A colossal human-headed winged lion that once guarded the throne room of King Ashurnasirpal II at Nimrud.",
    imageUrl: "https://images.metmuseum.org/CRDImages/an/web-large/DT880.jpg",
  },
  {
    id: "17",
    name: "Assyrian Sickle Sword",
    slug: "assyrian-sickle-sword",
    civilization: "Mesopotamian",
    dateRange: "ca. 1307–1275 BCE",
    numericYear: -1307,
    type: "weapon",
    material: ["bronze"],
    significance: 4,
    isFeatured: false,
    provenance:
      "A Middle Assyrian bronze sickle sword (khopesh), a distinctive curved weapon of the ancient Near East.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/an/web-large/DP239582.jpg",
  },
  {
    id: "18",
    name: "Cylinder Seal with Cultic Scene",
    slug: "assyrian-cylinder-seal",
    civilization: "Mesopotamian",
    dateRange: "late 9th–early 8th century BCE",
    numericYear: -800,
    type: "tool",
    material: ["chalcedony"],
    significance: 3,
    isFeatured: false,
    provenance:
      "A finely carved Neo-Assyrian cylinder seal in translucent chalcedony depicting a cultic scene with worshippers.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/an/web-large/DP-23641-001.jpg",
  },
  {
    id: "19",
    name: "Ivory Lion Head (Furniture Element)",
    slug: "ivory-lion-head",
    civilization: "Mesopotamian",
    dateRange: "ca. 9th–8th century BCE",
    numericYear: -800,
    type: "sculpture",
    material: ["ivory"],
    significance: 4,
    isFeatured: true,
    provenance:
      "An exquisitely carved ivory lion head that once decorated royal furniture in the Assyrian palaces at Nimrud.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/an/web-large/DP110686.jpg",
  },
  {
    id: "20",
    name: "Cuneiform Tablet Case",
    slug: "cuneiform-tablet-case",
    civilization: "Mesopotamian",
    dateRange: "ca. 20th–19th century BCE",
    numericYear: -1900,
    type: "scroll",
    material: ["clay"],
    significance: 3,
    isFeatured: false,
    provenance:
      "A clay tablet case containing a cuneiform record of a lawsuit from the Old Assyrian Trading Colony period.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/an/web-large/DP162269.jpg",
  },

  // ── Ancient China ──────────────────────────────────────────────────
  {
    id: "21",
    name: "Wine Pouring Vessel (Gong) — Shang Dynasty",
    slug: "shang-wine-vessel-gong",
    civilization: "Chinese",
    dateRange: "13th–11th century BCE",
    numericYear: -1200,
    type: "vessel",
    material: ["bronze"],
    significance: 5,
    isFeatured: true,
    provenance:
      "A magnificent Shang dynasty bronze gong with zoomorphic decoration including taotie masks.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/as/web-large/DP140733.jpg",
  },
  {
    id: "22",
    name: "Wine Pouring Vessel (Gong) with Turquoise Inlay",
    slug: "turquoise-gong-vessel",
    civilization: "Chinese",
    dateRange: "12th century BCE",
    numericYear: -1150,
    type: "vessel",
    material: ["bronze", "turquoise"],
    significance: 4,
    isFeatured: true,
    provenance:
      "A rare Shang dynasty bronze wine vessel enhanced with turquoise inlay, combining metalwork and lapidary arts.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/as/web-large/DP140781.jpg",
  },
  {
    id: "23",
    name: "Food Serving Vessel (Gui)",
    slug: "shang-gui-vessel",
    civilization: "Chinese",
    dateRange: "12th century BCE",
    numericYear: -1150,
    type: "vessel",
    material: ["bronze"],
    significance: 3,
    isFeatured: false,
    provenance:
      "A Shang dynasty bronze gui with twin handles and ring foot, used to present grain offerings in ancestral rituals.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/as/web-large/DP218261.jpg",
  },
  {
    id: "24",
    name: "Ritual Wine Vessel (Jiao)",
    slug: "western-zhou-jiao",
    civilization: "Chinese",
    dateRange: "late 11th century BCE",
    numericYear: -1050,
    type: "vessel",
    material: ["bronze"],
    significance: 4,
    isFeatured: false,
    provenance:
      "A Western Zhou dynasty bronze jiao wine vessel with distinctive pointed spouts for ritual ceremonies.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/as/web-large/DP219874.jpg",
  },
  {
    id: "25",
    name: "Spouted Tripod Vessel with Dragon's Head (Jiaodou)",
    slug: "jin-dragon-tripod",
    civilization: "Chinese",
    dateRange: "3rd century CE",
    numericYear: 250,
    type: "vessel",
    material: ["gilt bronze"],
    significance: 4,
    isFeatured: false,
    provenance:
      "A gilt bronze tripod vessel from the Western Jin dynasty featuring a dramatic dragon's head spout.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/as/web-large/L_1996_79_9.JPG",
  },

  // ── Mesoamerican Civilizations ─────────────────────────────────────
  {
    id: "26",
    name: "Toltec Eagle Relief",
    slug: "toltec-eagle-relief",
    civilization: "Mesoamerican",
    dateRange: "900–1200 CE",
    numericYear: 1050,
    type: "architecture",
    material: ["andesite", "stucco", "pigment"],
    significance: 4,
    isFeatured: true,
    provenance:
      "A powerful stone relief depicting an eagle with traces of Maya blue pigment, symbol of the Toltec warrior elite.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DP-20487-001.jpg",
  },
  {
    id: "27",
    name: "Maya Whistling Vessel",
    slug: "maya-whistling-vessel",
    civilization: "Mesoamerican",
    dateRange: "400–500 CE",
    numericYear: 450,
    type: "vessel",
    material: ["ceramic"],
    significance: 3,
    isFeatured: false,
    provenance:
      "A Maya ceramic vessel that produces a whistling sound when liquid is poured, combining pottery with acoustic engineering.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DP-23468-001.jpg",
  },
  {
    id: "28",
    name: "Maya Mirror-Bearer Figure",
    slug: "maya-mirror-bearer",
    civilization: "Mesoamerican",
    dateRange: "410–650 CE",
    numericYear: 530,
    type: "sculpture",
    material: ["cordia wood", "hematite"],
    significance: 5,
    isFeatured: true,
    provenance:
      "An extraordinarily rare Maya wood sculpture of a kneeling figure once holding a mirror, carved from tropical hardwood.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DP-24340-001.jpg",
  },
  {
    id: "29",
    name: "Maya Vessel with Mythological Scene",
    slug: "maya-mythological-vessel",
    civilization: "Mesoamerican",
    dateRange: "600–800 CE",
    numericYear: 700,
    type: "vessel",
    material: ["ceramic", "slip"],
    significance: 4,
    isFeatured: false,
    provenance:
      "A finely painted Maya ceramic vessel depicting a mythological scene with supernatural beings.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DP-576-001.jpg",
  },
  {
    id: "30",
    name: "Maya Jadeite Zoomorphic Ornament",
    slug: "maya-jade-ornament",
    civilization: "Mesoamerican",
    dateRange: "400–100 BCE",
    numericYear: -250,
    type: "jewellery",
    material: ["jadeite", "pigment"],
    significance: 3,
    isFeatured: false,
    provenance:
      "A delicately carved jadeite ornament from the Preclassic Maya period. Jade was the most precious material in Mesoamerica.",
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DP-12761-009.jpg",
  },
];

// --- Filtering logic ---

function matchesFilters(artifact: Artifact, filters: FilterValues): boolean {
  if (
    filters.search &&
    !artifact.name.toLowerCase().includes(filters.search.toLowerCase()) &&
    !artifact.provenance.toLowerCase().includes(filters.search.toLowerCase())
  ) {
    return false;
  }

  if (filters.civilization && artifact.civilization !== filters.civilization) {
    return false;
  }

  if (filters.type && artifact.type !== filters.type) {
    return false;
  }

  if (
    filters.material &&
    !artifact.material.some((m) =>
      m.toLowerCase().includes(filters.material.toLowerCase()),
    )
  ) {
    return false;
  }

  if (filters.eraStart !== null && artifact.numericYear < filters.eraStart) {
    return false;
  }

  if (filters.eraEnd !== null && artifact.numericYear > filters.eraEnd) {
    return false;
  }

  if (
    filters.significance !== null &&
    artifact.significance < filters.significance
  ) {
    return false;
  }

  return true;
}

export default function CollectionView() {
  const searchParams = useSearchParams();
  const initialCiv = searchParams.get("civilization") || "";
  const condition = useTransparency();
  const transparencyLabel = getTransparencyLabel(condition);
  const [filters, setFilters] = useState<FilterValues>({
    ...EMPTY_FILTERS,
    civilization: initialCiv,
  });

  const civilizations = useMemo(
    () => [...new Set(ARTIFACTS.map((a) => a.civilization))].sort(),
    [],
  );

  const filtered = useMemo(
    () => ARTIFACTS.filter((a) => matchesFilters(a, filters)),
    [filters],
  );

  return (
    <div className="space-y-8">
      <FilterPanel
        civilizations={civilizations}
        filters={filters}
        onChange={setFilters}
      />

      <p className="font-body text-sm text-stone">
        Showing{" "}
        <span className="text-parchment">{filtered.length}</span> of{" "}
        <span className="text-parchment">{ARTIFACTS.length}</span> artifacts
      </p>

      <CollectionGrid artifacts={filtered} transparencyLabel={transparencyLabel} />
    </div>
  );
}
