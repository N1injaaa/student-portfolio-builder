export type FontId =
  | "inter"
  | "manrope"
  | "work-sans"
  | "fraunces"
  | "lora"
  | "playfair"
  | "source-serif"
  | "jetbrains-mono";

export interface FontOption {
  id: FontId;
  label: string;
  family: string;
  category: "sans" | "serif" | "mono";
}

export const FONT_OPTIONS: FontOption[] = [
  { id: "inter", label: "Inter", family: "'Inter', Arial, sans-serif", category: "sans" },
  { id: "manrope", label: "Manrope", family: "'Manrope', Arial, sans-serif", category: "sans" },
  { id: "work-sans", label: "Work Sans", family: "'Work Sans', Arial, sans-serif", category: "sans" },
  { id: "fraunces", label: "Fraunces", family: "'Fraunces', Georgia, serif", category: "serif" },
  { id: "lora", label: "Lora", family: "'Lora', Georgia, serif", category: "serif" },
  { id: "playfair", label: "Playfair Display", family: "'Playfair Display', Georgia, serif", category: "serif" },
  {
    id: "source-serif",
    label: "Source Serif 4",
    family: "'Source Serif 4', Georgia, serif",
    category: "serif",
  },
  {
    id: "jetbrains-mono",
    label: "JetBrains Mono",
    family: "'JetBrains Mono', monospace",
    category: "mono",
  },
];

export function getFontFamily(id: FontId): string {
  return FONT_OPTIONS.find((f) => f.id === id)?.family ?? FONT_OPTIONS[0].family;
}
