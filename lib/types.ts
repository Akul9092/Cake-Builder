export type TagId = "best-seller" | "heart" | "new" | "premium";

export interface CakeOption {
  id: string;
  flavour: string;
  filling: string;
  pricePerKg: number;
  tags: TagId[];
  /** Per-flavour minimum order weight (kg), from the sheet's Min_Weight column. Undefined = no override, use the tier default. */
  minWeightKg?: number;
}

export interface CatalogResponse {
  options: CakeOption[];
  fetchedAt: string;
  isFallback: boolean;
}

export type TierCount = 1 | 2;

export interface CakeConfig {
  tier: TierCount;
  flavorIdA: string | null;
  flavorIdB: string | null;
  weightKg: number;
  date: string;
}
