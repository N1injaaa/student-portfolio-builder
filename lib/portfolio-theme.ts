import type { PortfolioTheme } from "@/types/profile";

export interface PortfolioColors {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

export function getPortfolioColors(theme: PortfolioTheme): PortfolioColors {
  switch (theme) {
    case "ink":
      return {
        background: "#12172B",
        surface: "#1B2138",
        text: "#EDECE6",
        textMuted: "#9EA5B8",
        border: "#333A4E",
      };
    case "orchard":
      return {
        background: "#F6F2E7",
        surface: "#FFFFFF",
        text: "#2B2417",
        textMuted: "#75705F",
        border: "#E3DBC6",
      };
    case "paper":
    default:
      return {
        background: "#FBFAF7",
        surface: "#FFFFFF",
        text: "#1B2130",
        textMuted: "#5B6478",
        border: "#E1DCCF",
      };
  }
}
