export interface Civilization {
  id: string;
  name: string;
  slug: string;
  region: string;
  periodStart: number; // negative = BCE
  periodEnd: number;
  description: string;
  colorHex: string;
  mapCenter: { lat: number; lng: number };
}

export const civilizations: Civilization[] = [
  {
    id: "civ-egypt",
    name: "Ancient Egypt",
    slug: "ancient-egypt",
    region: "North Africa",
    periodStart: -3100,
    periodEnd: -30,
    description:
      "One of the longest-lasting civilizations in history, Ancient Egypt flourished along the Nile River for over three millennia. Known for monumental architecture, hieroglyphic writing, and elaborate burial practices, Egypt produced some of the most iconic artifacts in human history. Its legacy spans the construction of the Great Pyramids to advances in medicine, mathematics, and agriculture.",
    colorHex: "#D4A017",
    mapCenter: { lat: 26.8206, lng: 30.8025 },
  },
  {
    id: "civ-greece",
    name: "Ancient Greece",
    slug: "ancient-greece",
    region: "Southern Europe",
    periodStart: -800,
    periodEnd: -146,
    description:
      "Ancient Greece laid the intellectual foundations of Western civilization through pioneering contributions to philosophy, democracy, theater, and the sciences. City-states such as Athens and Sparta developed distinct political systems that continue to influence governance today. Greek art and sculpture set standards of aesthetic beauty that endured for centuries.",
    colorHex: "#4A90D9",
    mapCenter: { lat: 39.0742, lng: 21.8243 },
  },
  {
    id: "civ-rome",
    name: "Roman Empire",
    slug: "roman-empire",
    region: "Mediterranean",
    periodStart: -753,
    periodEnd: 476,
    description:
      "From a small settlement on the Tiber River, Rome grew into one of the largest empires the ancient world ever saw, stretching from Britain to Mesopotamia at its height. Roman engineering, law, and military organization shaped the development of Europe and the Mediterranean basin. The empire's cultural and architectural achievements, from the Colosseum to aqueducts, remain landmarks of human ingenuity.",
    colorHex: "#8B2500",
    mapCenter: { lat: 41.9028, lng: 12.4964 },
  },
  {
    id: "civ-mesopotamia",
    name: "Mesopotamia",
    slug: "mesopotamia",
    region: "Western Asia",
    periodStart: -3500,
    periodEnd: -539,
    description:
      "Often called the cradle of civilization, Mesopotamia developed between the Tigris and Euphrates rivers in present-day Iraq. The Sumerians, Akkadians, Babylonians, and Assyrians successively built complex urban societies, inventing cuneiform writing, the wheel, and codified law. The region's contributions to mathematics, astronomy, and literature remain foundational to human knowledge.",
    colorHex: "#B8860B",
    mapCenter: { lat: 33.2232, lng: 43.6793 },
  },
  {
    id: "civ-persia",
    name: "Persian Empire",
    slug: "persian-empire",
    region: "Western Asia / Central Asia",
    periodStart: -550,
    periodEnd: -330,
    description:
      "The Achaemenid Persian Empire, founded by Cyrus the Great, became the largest empire the ancient world had yet seen, stretching from Egypt to the Indus River. Renowned for its administrative sophistication, religious tolerance, and monumental architecture at Persepolis, Persia created a model of multicultural governance. The Royal Road and efficient postal system facilitated communication across vast distances.",
    colorHex: "#7B2D8E",
    mapCenter: { lat: 32.4279, lng: 53.6880 },
  },
  {
    id: "civ-china",
    name: "Ancient China",
    slug: "ancient-china",
    region: "East Asia",
    periodStart: -2070,
    periodEnd: 220,
    description:
      "Ancient Chinese civilization, spanning from the Xia dynasty through the Han dynasty, developed along the Yellow and Yangtze rivers. China produced transformative inventions including paper, silk weaving, and early forms of gunpowder, while Confucian and Daoist philosophies shaped East Asian thought for millennia. The unification under the Qin dynasty and the flourishing Han period established cultural and political patterns that endured into the modern era.",
    colorHex: "#CC2936",
    mapCenter: { lat: 34.2658, lng: 108.9541 },
  },
  {
    id: "civ-indus",
    name: "Indus Valley",
    slug: "indus-valley",
    region: "South Asia",
    periodStart: -3300,
    periodEnd: -1300,
    description:
      "The Indus Valley Civilization, also known as the Harappan civilization, was one of the most advanced early urban cultures, with sophisticated city planning, drainage systems, and standardized weights and measures. Major cities like Mohenjo-daro and Harappa supported populations of tens of thousands with remarkably egalitarian layouts. Despite its impressive achievements, its undeciphered script remains one of archaeology's greatest mysteries.",
    colorHex: "#2E8B57",
    mapCenter: { lat: 27.3250, lng: 68.8600 },
  },
  {
    id: "civ-mesoamerica",
    name: "Mesoamerican Civilizations",
    slug: "mesoamerican",
    region: "Central America",
    periodStart: -2000,
    periodEnd: 1521,
    description:
      "The Maya, Aztec, and earlier Olmec civilizations developed independently in Central America, producing remarkable achievements in astronomy, mathematics, and monumental architecture. The Maya devised one of the most sophisticated writing systems in the pre-Columbian Americas and created an extraordinarily accurate calendar. Aztec Tenochtitlan was among the largest cities in the world at the time of European contact.",
    colorHex: "#C1440E",
    mapCenter: { lat: 19.4326, lng: -99.1332 },
  },
];
