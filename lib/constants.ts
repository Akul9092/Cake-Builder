import type { TagId } from "./types";

export const SITE_NAME = "Nurture Cakes";

export const TAG_LABELS: Record<TagId, string> = {
  "best-seller": "Best Seller",
  heart: "Baker's Pick",
  new: "New",
  premium: "Premium",
};

// Maps the exact spreadsheet Tags cell text (lowercased, trimmed) to a canonical TagId.
export const TAG_LABEL_TO_ID: Record<string, TagId> = {
  "best seller": "best-seller",
  heart: "heart",
  new: "new",
  premium: "premium",
};

export const CURRENCY = "SGD";
export const CURRENCY_LOCALE = "en-SG";

export const TWO_TIER_ADDON = 30;
export const BUTTERCREAM_SURCHARGE_PER_KG = 15;
export const MIN_ONE_TIER_WEIGHT_KG = 0.5;
export const MIN_TWO_TIER_WEIGHT_KG = 3;
export const WEIGHT_STEP_KG = 0.5;
export const DEFAULT_WEIGHT_KG = 1;

export const WHATSAPP_NUMBER = "6581614940";
export const WHATSAPP_CHAT_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const DATE_WARNING_DAYS = 3;

export const FACEBOOK_PAGE_URL =
  "https://www.facebook.com/p/Nurture-Cakes-Gourmet-egg-and-eggless-cakes-100043146379162/";

export const INSTAGRAM_HANDLE = "nurturecakessg";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
