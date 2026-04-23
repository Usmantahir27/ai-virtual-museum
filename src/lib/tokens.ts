// Archaion Design Tokens — Single source of truth

export const colors = {
  sandstone: "#C9A96E",
  gold: "#D4A017",
  obsidian: "#1A1410",
  terracotta: "#C1440E",
  lapis: "#1B3A6B",
  parchment: "#F5EDD6",
  stone: "#6B5E4A",
  ochre: "#B8860B",
  // Semantic aliases
  background: "#1A1410",
  foreground: "#F5EDD6",
  accent: "#D4A017",
  muted: "#6B5E4A",
} as const;

export const fonts = {
  display: "var(--font-display)", // Inter
  body: "var(--font-body)", // Inter
  mono: "var(--font-mono)", // Fira Code
} as const;

export const typeScale = {
  "display-xl": { size: "5rem", lineHeight: 1.1, letterSpacing: "0.04em" },
  "display-lg": { size: "3.75rem", lineHeight: 1.15, letterSpacing: "0.03em" },
  "display-md": { size: "2.5rem", lineHeight: 1.2, letterSpacing: "0.02em" },
  "heading-lg": { size: "2rem", lineHeight: 1.3, letterSpacing: "0.02em" },
  "heading-md": { size: "1.5rem", lineHeight: 1.4, letterSpacing: "0.01em" },
  "heading-sm": { size: "1.25rem", lineHeight: 1.4, letterSpacing: "0.01em" },
  "body-lg": { size: "1.25rem", lineHeight: 1.7, letterSpacing: "0" },
  "body-md": { size: "1rem", lineHeight: 1.7, letterSpacing: "0" },
  "body-sm": { size: "0.875rem", lineHeight: 1.6, letterSpacing: "0" },
  caption: { size: "0.75rem", lineHeight: 1.5, letterSpacing: "0.02em" },
  eyebrow: { size: "0.75rem", lineHeight: 1.5, letterSpacing: "0.15em" },
} as const;

export const animation = {
  duration: {
    fast: 300,
    normal: 600,
    slow: 900,
    glacial: 1800,
  },
  easing: {
    stone: [0.25, 0.1, 0.1, 1.0] as const,
    stoneSlide: [0.25, 0.46, 0.45, 0.94] as const,
    goldReveal: [0.0, 0.0, 0.2, 1.0] as const,
  },
} as const;

// Framer Motion transition presets
export const transitions = {
  stone: {
    duration: animation.duration.normal / 1000,
    ease: animation.easing.stone,
  },
  stoneSlide: {
    duration: animation.duration.slow / 1000,
    ease: animation.easing.stoneSlide,
  },
  goldReveal: {
    duration: animation.duration.glacial / 1000,
    ease: animation.easing.goldReveal,
  },
  fast: {
    duration: animation.duration.fast / 1000,
    ease: animation.easing.stone,
  },
} as const;
