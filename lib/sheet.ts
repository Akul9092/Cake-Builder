import { parseCsv } from "./parseCsv";
import { TAG_LABEL_TO_ID } from "./constants";
import type { CakeOption, CatalogResponse, TagId } from "./types";
import fallbackMenu from "@/data/fallback-menu.json";

function slugify(...parts: string[]): string {
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

function parseTags(raw: string): TagId[] {
  if (!raw) return [];
  const seen = new Set<TagId>();
  for (const part of raw.split(",")) {
    const key = part.trim().toLowerCase();
    if (!key) continue;
    const id = TAG_LABEL_TO_ID[key];
    if (id) {
      seen.add(id);
    } else {
      console.warn(`[sheet] Unrecognized tag "${part.trim()}" — ignoring.`);
    }
  }
  return Array.from(seen);
}

function parsePrice(raw: string): number | null {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const value = parseFloat(cleaned);
  return Number.isFinite(value) && value > 0 ? value : null;
}

function parseMinWeight(raw: string, context: string): number | undefined {
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  const value = parseFloat(trimmed);
  if (!Number.isFinite(value) || value <= 0) {
    console.warn(
      `[sheet] Ignoring invalid Min_Weight "${trimmed}" for ${context}.`
    );
    return undefined;
  }
  return value;
}

// Normalizes header cells so "Min_Weight", "Min Weight", and "min-weight" all match.
function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Pulls Premium flavours to the front (a gentle nudge), keeping the sheet's
// original relative order within both the premium and non-premium groups.
function sortPremiumFirst(options: CakeOption[]): CakeOption[] {
  const premium = options.filter((o) => o.tags.includes("premium"));
  const rest = options.filter((o) => !o.tags.includes("premium"));
  return [...premium, ...rest];
}

function rowsToOptions(rows: string[][]): CakeOption[] {
  if (rows.length === 0) return [];

  const [headerRow, ...dataRows] = rows;
  const headerIndex = headerRow.map(normalizeHeader);
  const colFlavour = headerIndex.indexOf("flavours");
  const colFilling = headerIndex.indexOf("fillings");
  const colPrice = headerIndex.indexOf("price");
  const colTags = headerIndex.indexOf("tags");
  const colMinWeight = headerIndex.indexOf("minweight");

  if (colFlavour === -1 || colFilling === -1 || colPrice === -1) {
    console.warn(
      "[sheet] Missing required columns (Flavours, Fillings, Price) in the header row."
    );
    return [];
  }

  const options: CakeOption[] = [];
  dataRows.forEach((row, index) => {
    const flavour = row[colFlavour]?.trim();
    const filling = row[colFilling]?.trim();
    const pricePerKg = parsePrice(row[colPrice] ?? "");
    const tags = colTags !== -1 ? parseTags(row[colTags] ?? "") : [];
    const minWeightKg =
      colMinWeight !== -1
        ? parseMinWeight(row[colMinWeight] ?? "", `row ${index + 2}`)
        : undefined;

    if (!flavour || !filling || pricePerKg === null) {
      console.warn(
        `[sheet] Dropping row ${index + 2}: missing flavour/filling or invalid price.`
      );
      return;
    }

    options.push({
      id: slugify(flavour, filling, String(index)),
      flavour,
      filling,
      pricePerKg,
      tags,
      ...(minWeightKg !== undefined ? { minWeightKg } : {}),
    });
  });

  return options;
}

export async function fetchMenu(): Promise<CatalogResponse> {
  const sheetUrl = process.env.SHEET_CSV_URL;
  const revalidateSeconds = Number(process.env.REVALIDATE_SECONDS ?? 300);

  if (sheetUrl) {
    try {
      const res = await fetch(sheetUrl, {
        next: { revalidate: revalidateSeconds },
      });
      if (!res.ok) {
        throw new Error(`Sheet fetch failed with status ${res.status}`);
      }
      const csvText = await res.text();
      const options = rowsToOptions(parseCsv(csvText));

      if (options.length > 0) {
        return {
          options: sortPremiumFirst(options),
          fetchedAt: new Date().toISOString(),
          isFallback: false,
        };
      }
      console.warn(
        "[sheet] Live sheet produced no valid rows — using fallback menu."
      );
    } catch (error) {
      console.warn(
        "[sheet] Failed to fetch/parse live sheet — using fallback menu.",
        error
      );
    }
  } else {
    console.warn("[sheet] SHEET_CSV_URL not set — using fallback menu.");
  }

  return {
    options: sortPremiumFirst(fallbackMenu as CakeOption[]),
    fetchedAt: new Date().toISOString(),
    isFallback: true,
  };
}
