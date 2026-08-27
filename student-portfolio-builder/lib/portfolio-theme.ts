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
    case "slate":
      return {
        background: "#F1F3F6",
        surface: "#FFFFFF",
        text: "#1E2530",
        textMuted: "#667085",
        border: "#DCE1E8",
      };
    case "meadow":
      return {
        background: "#F3F7F1",
        surface: "#FFFFFF",
        text: "#1E2B1F",
        textMuted: "#5E7160",
        border: "#D9E5D3",
      };
    case "sandstone":
      return {
        background: "#FAF3EA",
        surface: "#FFFDF9",
        text: "#3B2B1C",
        textMuted: "#8A7160",
        border: "#EAD9C4",
      };
    case "midnight":
      return {
        background: "#0B1220",
        surface: "#131B2E",
        text: "#E7ECF5",
        textMuted: "#8D97AE",
        border: "#24304A",
      };
    case "blossom":
      return {
        background: "#FDF3F6",
        surface: "#FFFFFF",
        text: "#2E1B22",
        textMuted: "#8C6672",
        border: "#F0D8E0",
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
