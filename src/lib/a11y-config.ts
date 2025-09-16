// lib/a11y-config.ts
export type FeatureKey =
 | "highContrast"
 | "dyslexia"
 | "reduceMotion"
 | "highlightLinks"; // add new keys here

export interface FontSizeOptions {
 min: number;
 max: number;
 step: number;
 default: number;
}

export interface A11yDefaultConfig {
 features: Record<FeatureKey, boolean>;
 fontSize: FontSizeOptions;
}

export const defaultA11yConfig: A11yDefaultConfig = {
 features: {
  highContrast: false,
  dyslexia: false,
  reduceMotion: false,
  highlightLinks: false,
 },
 fontSize: { min: 70, max: 200, step: 10, default: 100 },
};
