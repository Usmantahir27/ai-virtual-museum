export interface Artifact {
  id: string;
  name: string;
  slug: string;
  description: string;
  civilizationId: string;
  eraStart: number;
  eraEnd: number;
  material: string[];
  type:
    | "sculpture"
    | "vessel"
    | "scroll"
    | "coin"
    | "jewellery"
    | "weapon"
    | "tool"
    | "textile"
    | "mosaic"
    | "architecture";
  locationFound: { lat: number; lng: number };
  museumLocation: string;
  dimensions: {
    heightCm: number;
    widthCm: number;
    depthCm?: number;
    weightKg?: number;
  };
  significance: 1 | 2 | 3 | 4 | 5;
  isFeatured: boolean;
  imageUrl: string;
  tags: string[];
  provenance: string;
  scholarlyNotes: string;
}

export const artifacts: Artifact[] = [
  // ── Ancient Egypt ──────────────────────────────────────────────────
  {
    id: "art-recumbent-lion",
    name: "Recumbent Lion",
    slug: "recumbent-lion",
    description:
      "A masterfully carved recumbent lion from the Old Kingdom, one of the earliest known large-scale Egyptian stone sculptures. The powerful beast rests with its head erect and forelegs extended, embodying the protective force associated with royal power.",
    civilizationId: "civ-egypt",
    eraStart: -2575,
    eraEnd: -2450,
    material: ["granite"],
    type: "sculpture",
    locationFound: { lat: 29.9792, lng: 31.1342 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 87, widthCm: 73, depthCm: 201 },
    significance: 5,
    isFeatured: true,
    imageUrl: "https://images.metmuseum.org/CRDImages/eg/web-large/DT2860.jpg",
    tags: ["Old Kingdom", "lion", "granite", "guardian"],
    provenance:
      "Acquired by the Metropolitan Museum in 2000. One of the finest examples of Old Kingdom monumental sculpture.",
    scholarlyNotes:
      "This lion dates to the 4th or 5th Dynasty and is among the earliest surviving large-scale Egyptian sculptures. Its precise origin is unknown, but stylistic analysis places it within the Memphite workshops near the great pyramids.",
  },
  {
    id: "art-senwosret-iii-sphinx",
    name: "Senwosret III as a Sphinx",
    slug: "senwosret-iii-sphinx",
    description:
      "A powerful sphinx bearing the face of Pharaoh Senwosret III, one of the most recognizable rulers of the Middle Kingdom. The deeply lined face conveys an unprecedented realism in royal portraiture.",
    civilizationId: "civ-egypt",
    eraStart: -1878,
    eraEnd: -1840,
    material: ["gneiss"],
    type: "sculpture",
    locationFound: { lat: 26.8206, lng: 30.8025 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 42, widthCm: 29, depthCm: 73, weightKg: 114 },
    significance: 5,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/eg/web-large/DP247658.jpg",
    tags: ["Middle Kingdom", "sphinx", "pharaoh", "Senwosret"],
    provenance:
      "Gift of Edward S. Harkness to the Metropolitan Museum in 1917. Originally from Egypt.",
    scholarlyNotes:
      "Senwosret III's distinctive portraiture broke with idealized pharaonic tradition, showing careworn features that some scholars interpret as symbols of the burdens of kingship rather than realistic aging.",
  },
  {
    id: "art-haremhab-scribe",
    name: "Haremhab as a Scribe of the King",
    slug: "haremhab-scribe",
    description:
      "A granodiorite statue depicting Haremhab seated as a royal scribe, before he became the last pharaoh of the 18th Dynasty. The cross-legged figure holds a papyrus scroll on his lap, representing his role as a literate military commander.",
    civilizationId: "civ-egypt",
    eraStart: -1336,
    eraEnd: -1323,
    material: ["granodiorite"],
    type: "sculpture",
    locationFound: { lat: 25.7402, lng: 32.6014 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 113, widthCm: 71, depthCm: 55 },
    significance: 4,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/eg/web-large/DP238391.jpg",
    tags: ["New Kingdom", "scribe", "pharaoh", "Haremhab"],
    provenance:
      "Gift of Mr. and Mrs. V. Everit Macy to the Metropolitan Museum in 1923.",
    scholarlyNotes:
      "This statue predates Haremhab's ascension to the throne. The inscription on the papyrus is a hymn to the god Thoth, patron of scribes. The work exemplifies the artistic transition from the Amarna period back to traditional Egyptian style.",
  },
  {
    id: "art-isis-infant-horus",
    name: "Statuette of Isis with the Infant Horus",
    slug: "isis-infant-horus",
    description:
      "A delicate faience statuette of the goddess Isis nursing the infant Horus, produced during the Ptolemaic Period. This intimate composition became one of the most popular votive offerings in ancient Egypt.",
    civilizationId: "civ-egypt",
    eraStart: -332,
    eraEnd: -30,
    material: ["faience"],
    type: "sculpture",
    locationFound: { lat: 30.0444, lng: 31.2357 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 17, widthCm: 5, depthCm: 7 },
    significance: 3,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/eg/web-large/DP241036.jpg",
    tags: ["Ptolemaic", "Isis", "Horus", "faience", "goddess"],
    provenance:
      "Purchased by the Metropolitan Museum in 1955 from the Joseph Pulitzer Bequest Fund.",
    scholarlyNotes:
      "The image of Isis nursing Horus became enormously popular across the Mediterranean world and is considered by some scholars as an artistic precursor to early Christian Madonna and Child imagery.",
  },
  {
    id: "art-amarna-procession-relief",
    name: "Attendants in a Procession (Amarna Relief)",
    slug: "amarna-procession-relief",
    description:
      "A painted limestone talatat block depicting attendants and foreigners in a ceremonial procession, from the revolutionary Amarna Period under Akhenaten. The naturalistic style and lively composition are hallmarks of Amarna art.",
    civilizationId: "civ-egypt",
    eraStart: -1353,
    eraEnd: -1336,
    material: ["limestone", "pigment"],
    type: "architecture",
    locationFound: { lat: 27.6467, lng: 30.8976 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 24, widthCm: 53 },
    significance: 4,
    isFeatured: false,
    imageUrl: "https://images.metmuseum.org/CRDImages/eg/web-large/DT8198.jpg",
    tags: ["Amarna", "relief", "Akhenaten", "New Kingdom", "procession"],
    provenance:
      "Gift of Norbert Schimmel to the Metropolitan Museum in 1985. Originally from Amarna, Egypt.",
    scholarlyNotes:
      "Talatat blocks were standardized building stones used in Akhenaten's rapid construction projects at Amarna and Karnak. After his death, these blocks were dismantled and reused as fill in later constructions.",
  },

  // ── Ancient Greece ─────────────────────────────────────────────────
  {
    id: "art-grave-stele-little-girl",
    name: "Marble Grave Stele of a Little Girl",
    slug: "grave-stele-little-girl",
    description:
      "An exquisite Parian marble funerary stele depicting a young girl holding two doves close to her chest. The tender scene and masterful relief carving make it one of the finest examples of Classical Greek funerary art.",
    civilizationId: "civ-greece",
    eraStart: -450,
    eraEnd: -440,
    material: ["Parian marble"],
    type: "sculpture",
    locationFound: { lat: 37.9838, lng: 23.7275 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 80, widthCm: 37, depthCm: 10, weightKg: 59 },
    significance: 5,
    isFeatured: true,
    imageUrl: "https://images.metmuseum.org/CRDImages/gr/web-large/DT279.jpg",
    tags: ["Classical", "funerary", "stele", "child", "Parian marble"],
    provenance:
      "Acquired by the Metropolitan Museum through the Fletcher Fund in 1927. Believed to originate from Attica.",
    scholarlyNotes:
      "Dating to the height of the Classical period, this stele captures the Greek idealization of childhood. The two doves likely symbolize the girl's gentle nature and the soul's departure.",
  },
  {
    id: "art-marble-head-goddess",
    name: "Marble Head of a Goddess",
    slug: "marble-head-goddess",
    description:
      "A beautifully preserved marble head of a goddess from the Late Classical period, with idealized features, softly modeled flesh, and serene expression characteristic of 4th-century Greek sculpture.",
    civilizationId: "civ-greece",
    eraStart: -399,
    eraEnd: -300,
    material: ["marble"],
    type: "sculpture",
    locationFound: { lat: 37.9715, lng: 23.7267 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 55, widthCm: 25 },
    significance: 4,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/gr10.124.1.R.jpg",
    tags: ["Late Classical", "goddess", "marble", "head"],
    provenance:
      "Acquired by the Metropolitan Museum through the Rogers Fund in 1910.",
    scholarlyNotes:
      "The gentle turn of the head and dreamy expression recall the work of Praxiteles and his circle. The slightly parted lips and distant gaze are hallmarks of Late Classical aesthetics.",
  },
  {
    id: "art-ptolemaic-queen-head",
    name: "Marble Head of a Ptolemaic Queen",
    slug: "ptolemaic-queen-head",
    description:
      "A striking marble portrait head of a Ptolemaic queen, likely Arsinoe II or Berenike II. The blend of Greek sculptural technique with Egyptian royal iconography exemplifies the cultural fusion of Hellenistic Egypt.",
    civilizationId: "civ-greece",
    eraStart: -270,
    eraEnd: -250,
    material: ["marble"],
    type: "sculpture",
    locationFound: { lat: 31.2001, lng: 29.9187 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 38, widthCm: 20 },
    significance: 4,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DP333700.jpg",
    tags: ["Hellenistic", "Ptolemaic", "queen", "marble", "royal"],
    provenance:
      "Purchased by the Metropolitan Museum in 2002.",
    scholarlyNotes:
      "This head masterfully blends the idealized beauty of Hellenistic sculpture with the regal bearing of Egyptian royal portraiture, reflecting the Ptolemaic dynasty's dual cultural identity.",
  },
  {
    id: "art-eirene-statue",
    name: "Marble Statue of Eirene (Personification of Peace)",
    slug: "eirene-statue",
    description:
      "A near-complete Roman marble copy of a Greek original depicting Eirene, the personification of Peace. Standing nearly six feet tall, the figure wears a peplos and holds attributes now lost, embodying the Classical Greek ideal of civic harmony.",
    civilizationId: "civ-greece",
    eraStart: 14,
    eraEnd: 68,
    material: ["Pentelic marble"],
    type: "sculpture",
    locationFound: { lat: 37.9715, lng: 23.7267 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 177, widthCm: 60 },
    significance: 5,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DT11659.jpg",
    tags: ["Roman copy", "Greek original", "peace", "Eirene", "marble"],
    provenance:
      "Acquired by the Metropolitan Museum through the Rogers Fund in 1906.",
    scholarlyNotes:
      "This Roman copy preserves a Greek original likely created in the 4th century BCE. The cult of Eirene was established in Athens after the Battle of Leuctra in 371 BCE.",
  },
  {
    id: "art-marble-akroterion",
    name: "Marble Akroterion with Palmette",
    slug: "marble-akroterion",
    description:
      "A graceful marble akroterion from a Classical Attic building, featuring an intricate palmette design that once crowned the roofline of a temple or public building.",
    civilizationId: "civ-greece",
    eraStart: -350,
    eraEnd: -325,
    material: ["marble"],
    type: "architecture",
    locationFound: { lat: 37.9715, lng: 23.7267 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 10, widthCm: 73 },
    significance: 3,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DT259543.jpg",
    tags: ["Classical", "Attic", "architecture", "temple", "palmette"],
    provenance:
      "Acquired by the Metropolitan Museum through the Rogers Fund in 1920.",
    scholarlyNotes:
      "Akroteria served both decorative and symbolic purposes, marking the apex and corners of temple pediments. This example's fine carving places it among the best of Late Classical architectural ornament.",
  },

  // ── Roman Empire ───────────────────────────────────────────────────
  {
    id: "art-diadoumenos",
    name: "Diadoumenos (Youth Tying a Fillet)",
    slug: "diadoumenos",
    description:
      "A Roman marble copy of the celebrated bronze Diadoumenos by the Greek sculptor Polykleitos, depicting a victorious athlete tying a ribbon around his head. This is one of the most important Roman copies of a Greek masterwork.",
    civilizationId: "civ-rome",
    eraStart: 69,
    eraEnd: 96,
    material: ["marble"],
    type: "sculpture",
    locationFound: { lat: 41.9028, lng: 12.4964 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 185, widthCm: 65 },
    significance: 5,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DT11982.jpg",
    tags: ["Roman copy", "Polykleitos", "athlete", "Flavian", "marble"],
    provenance:
      "Acquired by the Metropolitan Museum through the Fletcher Fund in 1925.",
    scholarlyNotes:
      "The original bronze by Polykleitos, created around 430 BCE, was one of the most admired sculptures of antiquity. This Flavian-period copy preserves the Canon of proportions that Polykleitos codified in his theoretical writings.",
  },
  {
    id: "art-dionysos-sarcophagus",
    name: "Marble Sarcophagus with Triumph of Dionysos and the Seasons",
    slug: "dionysos-sarcophagus",
    description:
      "A magnificent Roman sarcophagus carved in deep relief depicting the triumphal procession of Dionysos accompanied by personifications of the four Seasons. One of the finest examples of late Roman relief sculpture.",
    civilizationId: "civ-rome",
    eraStart: 260,
    eraEnd: 270,
    material: ["marble"],
    type: "sculpture",
    locationFound: { lat: 41.9028, lng: 12.4964 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 86, widthCm: 215, depthCm: 92 },
    significance: 5,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DP-14287-144.jpg",
    tags: ["Late Imperial", "sarcophagus", "Dionysos", "Seasons", "relief"],
    provenance:
      "Purchased by the Metropolitan Museum in 1955 from the Joseph Pulitzer Bequest.",
    scholarlyNotes:
      "The lid portrays the deceased couple reclining at a banquet. The Dionysiac imagery promises rebirth and paradise in the afterlife, while the four Seasons symbolize the eternal cycle of nature.",
  },
  {
    id: "art-garland-sarcophagus",
    name: "Marble Sarcophagus with Garlands",
    slug: "garland-sarcophagus",
    description:
      "A Severan-period marble sarcophagus decorated with heavy fruit and flower garlands supported by putti and rams' heads, demonstrating the Roman mastery of decorative relief carving.",
    civilizationId: "civ-rome",
    eraStart: 200,
    eraEnd: 225,
    material: ["Proconnesian marble"],
    type: "sculpture",
    locationFound: { lat: 41.9028, lng: 12.4964 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 134, widthCm: 223 },
    significance: 4,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DP140135.jpg",
    tags: ["Severan", "sarcophagus", "garlands", "marble", "funerary"],
    provenance:
      "Gift of Abdo Debbas to the Metropolitan Museum in 1870. One of the museum's earliest acquisitions.",
    scholarlyNotes:
      "Garland sarcophagi were among the most popular funerary forms in the Roman Empire. The Proconnesian marble was quarried on Marmara Island and shipped throughout the Mediterranean.",
  },
  {
    id: "art-athlete-head",
    name: "Marble Head of an Athlete",
    slug: "athlete-head",
    description:
      "A sensitively carved marble head of a young athlete from the Antonine period, with tousled curly hair and an introspective expression that captures the Antonine taste for combining Greek athletic ideals with Roman portraiture.",
    civilizationId: "civ-rome",
    eraStart: 138,
    eraEnd: 192,
    material: ["marble"],
    type: "sculpture",
    locationFound: { lat: 41.9028, lng: 12.4964 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 34, widthCm: 20 },
    significance: 3,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DP-14287-137retry.jpg",
    tags: ["Antonine", "athlete", "marble", "portrait", "Mid-Imperial"],
    provenance:
      "Acquired by the Metropolitan Museum through the Rogers Fund in 1911.",
    scholarlyNotes:
      "The deeply drilled curls and use of the drill for the pupils are characteristic of Antonine-period sculpture, marking a technical shift in Roman marble working.",
  },
  {
    id: "art-hellenistic-ruler-head",
    name: "Marble Head of a Hellenistic Ruler",
    slug: "hellenistic-ruler-head",
    description:
      "A Roman imperial marble head depicting a Hellenistic ruler with distinctive upswept hair and intense gaze, reflecting the Roman fascination with Greek royal portraiture.",
    civilizationId: "civ-rome",
    eraStart: 1,
    eraEnd: 199,
    material: ["marble"],
    type: "sculpture",
    locationFound: { lat: 41.9028, lng: 12.4964 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 37, widthCm: 22 },
    significance: 3,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/gr/web-large/DP119205.jpg",
    tags: ["Imperial", "ruler", "portrait", "Hellenistic", "marble"],
    provenance:
      "Gift of Mrs. Frederick F. Thompson to the Metropolitan Museum in 1903.",
    scholarlyNotes:
      "The identification of the subject remains debated. The windswept hair recalls portraits of Alexander the Great, suggesting this may represent a Successor king or a Roman emulating Hellenistic royal imagery.",
  },

  // ── Mesopotamia ────────────────────────────────────────────────────
  {
    id: "art-met-lamassu",
    name: "Human-Headed Winged Lion (Lamassu)",
    slug: "met-lamassu",
    description:
      "A colossal human-headed winged lion that once guarded the throne room of King Ashurnasirpal II at the Assyrian capital of Nimrud. Weighing over 7 tons and standing over 10 feet tall, it is one of the most imposing works of ancient Near Eastern art.",
    civilizationId: "civ-mesopotamia",
    eraStart: -883,
    eraEnd: -859,
    material: ["gypsum alabaster"],
    type: "sculpture",
    locationFound: { lat: 36.0950, lng: 43.3300 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 311, widthCm: 62, depthCm: 276, weightKg: 7257 },
    significance: 5,
    isFeatured: true,
    imageUrl: "https://images.metmuseum.org/CRDImages/an/web-large/DT880.jpg",
    tags: ["Neo-Assyrian", "lamassu", "guardian", "Nimrud", "monumental"],
    provenance:
      "Gift of John D. Rockefeller Jr. to the Metropolitan Museum in 1932. Excavated from the Northwest Palace at Nimrud (ancient Kalhu), Iraq.",
    scholarlyNotes:
      "These colossal guardian figures combine the strength of a lion, the swiftness of an eagle's wings, and the intelligence of a human head. The five legs—visible from both front and side—create the illusion of both standing and striding.",
  },
  {
    id: "art-assyrian-sickle-sword",
    name: "Assyrian Sickle Sword",
    slug: "assyrian-sickle-sword",
    description:
      "A Middle Assyrian bronze sickle sword (khopesh), a distinctive curved weapon used throughout the ancient Near East. This formidable blade represents the military technology of the Assyrian empire.",
    civilizationId: "civ-mesopotamia",
    eraStart: -1307,
    eraEnd: -1275,
    material: ["bronze"],
    type: "weapon",
    locationFound: { lat: 35.4680, lng: 43.2686 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 7, widthCm: 53 },
    significance: 4,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/an/web-large/DP239582.jpg",
    tags: ["Middle Assyrian", "weapon", "bronze", "sword", "military"],
    provenance:
      "Gift of J. Pierpont Morgan to the Metropolitan Museum in 1911.",
    scholarlyNotes:
      "The sickle sword was adapted from Egyptian prototypes and became a standard weapon of Near Eastern warfare. Its curved blade could hook around an opponent's shield.",
  },
  {
    id: "art-assyrian-cylinder-seal",
    name: "Cylinder Seal with Cultic Scene",
    slug: "assyrian-cylinder-seal",
    description:
      "A finely carved Neo-Assyrian cylinder seal in translucent chalcedony depicting a cultic scene with worshippers before divine symbols. When rolled across wet clay, the seal produced a continuous frieze.",
    civilizationId: "civ-mesopotamia",
    eraStart: -850,
    eraEnd: -750,
    material: ["chalcedony"],
    type: "tool",
    locationFound: { lat: 36.3350, lng: 43.1190 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 3, widthCm: 2 },
    significance: 3,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/an/web-large/DP-23641-001.jpg",
    tags: ["Neo-Assyrian", "cylinder seal", "ritual", "chalcedony"],
    provenance:
      "Gift of Martin and Sarah Cherkasky to the Metropolitan Museum in 1989.",
    scholarlyNotes:
      "Cylinder seals served as personal identification and authentication devices in Mesopotamia for over three millennia. This example's cultic imagery suggests its owner held a religious or administrative role.",
  },
  {
    id: "art-ivory-lion-head",
    name: "Ivory Lion Head (Furniture Element)",
    slug: "ivory-lion-head",
    description:
      "An exquisitely carved ivory lion head that once decorated a piece of royal furniture, roaring with fierce vitality. Assyrian ivory carving reached extraordinary heights of artistry in palace workshops.",
    civilizationId: "civ-mesopotamia",
    eraStart: -899,
    eraEnd: -700,
    material: ["ivory"],
    type: "sculpture",
    locationFound: { lat: 36.0950, lng: 43.3300 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 9, widthCm: 7, depthCm: 6 },
    significance: 4,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/an/web-large/DP110686.jpg",
    tags: ["Neo-Assyrian", "ivory", "lion", "furniture", "luxury"],
    provenance:
      "Acquired by the Metropolitan Museum through the Rogers Fund in 1962. From Nimrud, Iraq.",
    scholarlyNotes:
      "Thousands of ivory carvings were found in the palaces of Nimrud, many showing Phoenician and Syrian stylistic influences. They decorated thrones, beds, and other royal furniture.",
  },
  {
    id: "art-cuneiform-tablet-case",
    name: "Cuneiform Tablet Case",
    slug: "cuneiform-tablet-case",
    description:
      "A clay tablet case impressed with two cylinder seals, containing a cuneiform record of a lawsuit from the Old Assyrian Trading Colony period. The outer case protected the inner tablet and bore the seals of witnesses.",
    civilizationId: "civ-mesopotamia",
    eraStart: -2000,
    eraEnd: -1800,
    material: ["clay"],
    type: "scroll",
    locationFound: { lat: 39.0000, lng: 35.0000 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 18, widthCm: 9, depthCm: 4 },
    significance: 3,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/an/web-large/DP162269.jpg",
    tags: ["Old Assyrian", "cuneiform", "tablet", "clay", "legal", "trade"],
    provenance:
      "Gift of Mr. and Mrs. J. J. Klejman to the Metropolitan Museum in 1966.",
    scholarlyNotes:
      "This tablet comes from the Assyrian trading colonies in Anatolia (modern Turkey), where merchants conducted long-distance trade in textiles and tin. The double-envelope system prevented tampering with legal documents.",
  },

  // ── Ancient China ──────────────────────────────────────────────────
  {
    id: "art-shang-wine-vessel-gong",
    name: "Wine Pouring Vessel (Gong) — Shang Dynasty",
    slug: "shang-wine-vessel-gong",
    description:
      "A magnificent Shang dynasty bronze gong (wine pouring vessel) with zoomorphic decoration including taotie masks. The lid takes the form of an animal head, demonstrating the extraordinary bronze casting skills of the Shang workshops.",
    civilizationId: "civ-china",
    eraStart: -1300,
    eraEnd: -1046,
    material: ["bronze"],
    type: "vessel",
    locationFound: { lat: 36.1200, lng: 114.3500 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 21, widthCm: 15 },
    significance: 5,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/as/web-large/DP140733.jpg",
    tags: ["Shang dynasty", "bronze", "ritual vessel", "wine", "taotie"],
    provenance:
      "Acquired by the Metropolitan Museum through the Rogers Fund in 1943. Possibly from Anyang, Henan Province, China.",
    scholarlyNotes:
      "Shang bronzes were produced using the piece-mold casting technique unique to China. This gong would have been used in ancestral rituals, where offerings of wine to deceased ancestors were central to religious practice.",
  },
  {
    id: "art-turquoise-gong-vessel",
    name: "Wine Pouring Vessel (Gong) with Turquoise Inlay",
    slug: "turquoise-gong-vessel",
    description:
      "A rare Shang dynasty bronze wine vessel enhanced with turquoise inlay, combining metalwork and lapidary arts. The vivid blue-green turquoise stones set into the bronze surface create a striking contrast.",
    civilizationId: "civ-china",
    eraStart: -1199,
    eraEnd: -1100,
    material: ["bronze", "turquoise"],
    type: "vessel",
    locationFound: { lat: 36.1200, lng: 114.3500 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 16, widthCm: 8, depthCm: 18 },
    significance: 4,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/as/web-large/DP140781.jpg",
    tags: ["Shang dynasty", "bronze", "turquoise", "inlay", "ritual"],
    provenance:
      "Gift of the Ernest Erickson Foundation to the Metropolitan Museum in 1985.",
    scholarlyNotes:
      "Turquoise-inlaid bronzes are among the rarest and most prized of Shang ritual vessels. The turquoise was likely sourced from mines in northwestern China, indicating long-distance trade networks.",
  },
  {
    id: "art-shang-gui-vessel",
    name: "Food Serving Vessel (Gui)",
    slug: "shang-gui-vessel",
    description:
      "A Shang dynasty bronze gui (food serving vessel) with twin handles and a ring foot, used to present grain offerings during ancestral rituals. The surface bears intricate taotie decoration.",
    civilizationId: "civ-china",
    eraStart: -1199,
    eraEnd: -1100,
    material: ["bronze"],
    type: "vessel",
    locationFound: { lat: 36.1200, lng: 114.3500 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 11, widthCm: 23, depthCm: 15 },
    significance: 3,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/as/web-large/DP218261.jpg",
    tags: ["Shang dynasty", "bronze", "gui", "ritual", "food vessel"],
    provenance:
      "Gift of Count and Countess Bernard d'Escayrac to the Metropolitan Museum in 1962.",
    scholarlyNotes:
      "The gui was paired with the ding (cauldron) in ritual sets. The number of vessels in a set indicated the owner's social rank within the strict hierarchical system of Zhou-era ritual.",
  },
  {
    id: "art-western-zhou-jiao",
    name: "Ritual Wine Vessel (Jiao)",
    slug: "western-zhou-jiao",
    description:
      "A Western Zhou dynasty bronze jiao wine vessel with distinctive pointed spouts, used in ritual wine warming and pouring ceremonies. The form dates back to the early Bronze Age of China.",
    civilizationId: "civ-china",
    eraStart: -1099,
    eraEnd: -1000,
    material: ["bronze"],
    type: "vessel",
    locationFound: { lat: 34.2658, lng: 108.9541 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 20, widthCm: 14, depthCm: 6 },
    significance: 4,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/as/web-large/DP219874.jpg",
    tags: ["Western Zhou", "bronze", "jiao", "ritual", "wine"],
    provenance:
      "Acquired by the Metropolitan Museum through the Munsey Fund in 1931.",
    scholarlyNotes:
      "The jiao is among the oldest Chinese bronze vessel forms, with antecedents in Neolithic pottery. By the Western Zhou period, the form was becoming less common, replaced by newer vessel types.",
  },
  {
    id: "art-jin-dragon-tripod",
    name: "Spouted Tripod Vessel with Dragon's Head (Jiaodou)",
    slug: "jin-dragon-tripod",
    description:
      "A gilt bronze tripod vessel from the Western Jin dynasty featuring a dramatic dragon's head spout. The gilding preserves a warm golden surface that demonstrates the luxury of aristocratic Chinese metalwork.",
    civilizationId: "civ-china",
    eraStart: 200,
    eraEnd: 299,
    material: ["gilt bronze"],
    type: "vessel",
    locationFound: { lat: 34.2658, lng: 108.9541 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 21, widthCm: 28 },
    significance: 4,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/as/web-large/L_1996_79_9.JPG",
    tags: ["Western Jin", "gilt bronze", "dragon", "tripod", "vessel"],
    provenance:
      "Gift of Charlotte C. Weber to the Metropolitan Museum in 2025.",
    scholarlyNotes:
      "Jiaodou were used to warm wine or other beverages. The dragon-head spout reflects the increasing importance of dragon imagery in Chinese art as a symbol of imperial and cosmic power.",
  },

  // ── Mesoamerican Civilizations ─────────────────────────────────────
  {
    id: "art-toltec-eagle-relief",
    name: "Toltec Eagle Relief",
    slug: "toltec-eagle-relief",
    description:
      "A powerful stone relief depicting an eagle with outstretched wings, retaining traces of Maya blue pigment and red stucco. The eagle was a symbol of the warrior elite in Toltec and later Aztec culture.",
    civilizationId: "civ-mesoamerica",
    eraStart: 900,
    eraEnd: 1200,
    material: ["andesite", "stucco", "pigment"],
    type: "architecture",
    locationFound: { lat: 19.4326, lng: -99.1332 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 62, widthCm: 77, depthCm: 6, weightKg: 40 },
    significance: 4,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DP-20487-001.jpg",
    tags: ["Toltec", "eagle", "relief", "warrior", "Maya blue"],
    provenance:
      "Gift of Frederic E. Church to the Metropolitan Museum in 1893. From Mexico.",
    scholarlyNotes:
      "The eagle warrior was one of the two elite military orders of Mesoamerican civilization. This relief likely adorned a ceremonial platform at a major Toltec center.",
  },
  {
    id: "art-maya-whistling-vessel",
    name: "Maya Whistling Vessel",
    slug: "maya-whistling-vessel",
    description:
      "A Maya ceramic vessel that produces a whistling sound when liquid is poured, combining functional pottery with acoustic engineering. The sculptural form demonstrates the Maya mastery of ceramic arts.",
    civilizationId: "civ-mesoamerica",
    eraStart: 400,
    eraEnd: 500,
    material: ["ceramic"],
    type: "vessel",
    locationFound: { lat: 15.7835, lng: -90.2308 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 30, widthCm: 19, depthCm: 13 },
    significance: 3,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DP-23468-001.jpg",
    tags: ["Maya", "ceramic", "vessel", "whistle", "Early Classic"],
    provenance:
      "Gift of Nelson A. Rockefeller to the Metropolitan Museum in 1963. From Guatemala or Mexico.",
    scholarlyNotes:
      "Whistling vessels are found across Mesoamerica and South America. The sound was produced by air displacement through a concealed chamber, and likely held ritual significance.",
  },
  {
    id: "art-maya-mirror-bearer",
    name: "Maya Mirror-Bearer Figure",
    slug: "maya-mirror-bearer",
    description:
      "An extraordinarily rare Maya wood sculpture of a kneeling figure once holding a mirror, carved from tropical hardwood. The survival of ancient wood sculpture from the humid tropics is exceptional.",
    civilizationId: "civ-mesoamerica",
    eraStart: 410,
    eraEnd: 650,
    material: ["cordia wood", "hematite"],
    type: "sculpture",
    locationFound: { lat: 15.7835, lng: -90.2308 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 35, widthCm: 22, depthCm: 22 },
    significance: 5,
    isFeatured: true,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DP-24340-001.jpg",
    tags: ["Maya", "wood", "mirror", "Classic period", "sculpture"],
    provenance:
      "Bequest of Nelson A. Rockefeller to the Metropolitan Museum in 1979. From Guatemala or Mexico.",
    scholarlyNotes:
      "Mirrors in Maya culture were instruments of divination and royal authority. This figure likely held a pyrite or obsidian mirror on its back. Wooden sculptures rarely survive in tropical climates, making this piece invaluable.",
  },
  {
    id: "art-maya-mythological-vessel",
    name: "Maya Vessel with Mythological Scene",
    slug: "maya-mythological-vessel",
    description:
      "A finely painted Maya ceramic vessel depicting a mythological scene with supernatural beings, demonstrating the narrative sophistication of Classic Maya painted pottery.",
    civilizationId: "civ-mesoamerica",
    eraStart: 600,
    eraEnd: 800,
    material: ["ceramic", "slip"],
    type: "vessel",
    locationFound: { lat: 15.7835, lng: -90.2308 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 14, widthCm: 10, depthCm: 10 },
    significance: 4,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DP-576-001.jpg",
    tags: ["Maya", "ceramic", "mythology", "Late Classic", "painted"],
    provenance:
      "Gift of Nelson A. Rockefeller to the Metropolitan Museum in 1968.",
    scholarlyNotes:
      "Maya painted ceramics are among the few surviving records of Maya narrative art. The scenes often depict episodes from Maya mythology, including the adventures of the Hero Twins.",
  },
  {
    id: "art-maya-jade-ornament",
    name: "Maya Jadeite Zoomorphic Ornament",
    slug: "maya-jade-ornament",
    description:
      "A delicately carved jadeite ornament depicting a zoomorphic figure, dating to the Preclassic Maya period. Jade was the most precious material in Mesoamerica, valued above gold.",
    civilizationId: "civ-mesoamerica",
    eraStart: -400,
    eraEnd: -100,
    material: ["jadeite", "pigment"],
    type: "jewellery",
    locationFound: { lat: 15.7835, lng: -90.2308 },
    museumLocation: "Metropolitan Museum of Art, New York",
    dimensions: { heightCm: 4, widthCm: 4 },
    significance: 3,
    isFeatured: false,
    imageUrl:
      "https://images.metmuseum.org/CRDImages/ao/web-large/DP-12761-009.jpg",
    tags: ["Lowland Maya", "jade", "ornament", "Preclassic"],
    provenance:
      "Gift and Bequest of Alice K. Bache to the Metropolitan Museum in 1974 and 1977. From Mexico or Guatemala.",
    scholarlyNotes:
      "Jade held supreme ritual and symbolic value in Maya culture, associated with water, life, and royal power. The green stone was sourced from the Motagua River Valley in Guatemala.",
  },
];
