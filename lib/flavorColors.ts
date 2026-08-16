// Mild, mostly food-representative colors for the catalog card's flavour
// dot, keyed by the sheet's exact Flavours text (lowercased, trimmed).
// Add new entries here as new flavours are introduced — anything not listed
// falls back to a neutral gray dot rather than breaking.
const FLAVOR_COLORS: Record<string, string> = {
  vanilla: "#E8D9A8",
  chocolate: "#9C7154",
  tiramisu: "#BFA189",
  "black forest": "#9C5560",
  strawberry: "#E8A0AC",
  "rose lychee": "#D9A8C4",
  butterscotch: "#D98C4A",
  pineapple: "#E8C468",
  mango: "#E8975E",
  "red velvet": "#B5525B",
  rasmalai: "#E6C88A",
  "paan bulkand": "#7FA88C",
  "gulab jamun": "#A66B5C",
  "rabdi mawa": "#EDCBA6",
};

const FALLBACK_FLAVOR_COLOR = "#B8B2A6";

export function getFlavorColor(flavour: string): string {
  return FLAVOR_COLORS[flavour.trim().toLowerCase()] ?? FALLBACK_FLAVOR_COLOR;
}
