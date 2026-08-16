import {
  BUTTERCREAM_SURCHARGE_PER_KG,
  CURRENCY,
  CURRENCY_LOCALE,
  TWO_TIER_ADDON,
} from "./constants";

export function calcOneTierPrice(
  pricePerKg: number,
  weightKg: number,
  buttercream: boolean
): number {
  const effectivePricePerKg =
    pricePerKg + (buttercream ? BUTTERCREAM_SURCHARGE_PER_KG : 0);
  return effectivePricePerKg * weightKg;
}

export function calcTwoTierPrice(
  pricePerKgA: number,
  pricePerKgB: number | null,
  totalWeightKg: number,
  buttercream: boolean
): number {
  // A second flavour is optional — both tiers can share flavour A's price.
  const basePricePerKg =
    pricePerKgB !== null ? (pricePerKgA + pricePerKgB) / 2 : pricePerKgA;
  const effectivePricePerKg =
    basePricePerKg + (buttercream ? BUTTERCREAM_SURCHARGE_PER_KG : 0);
  return effectivePricePerKg * totalWeightKg + TWO_TIER_ADDON;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency: CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
