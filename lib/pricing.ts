import {
  BUTTERCREAM_SURCHARGE_PER_KG,
  CURRENCY,
  CURRENCY_LOCALE,
  TWO_TIER_ADDON,
} from "./constants";

export function finishLabel(buttercream: boolean): string {
  return buttercream
    ? `Buttercream (+$${BUTTERCREAM_SURCHARGE_PER_KG}/kg)`
    : "Whipped cream (included)";
}

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

// A short "how we got this number" line, e.g. "$60.00/kg × 1kg = $60.00" or
// "(avg($60.00, $70.00) + $15.00)/kg × 3kg + $30.00 = $240.00". Takes the
// already-computed total rather than recalculating it, so the breakdown can
// never disagree with the price shown elsewhere.
export function describePriceBreakdown(params: {
  tier: 1 | 2;
  pricePerKgA: number;
  pricePerKgB: number | null;
  weightKg: number;
  buttercream: boolean;
  total: number;
}): string {
  const { tier, pricePerKgA, pricePerKgB, weightKg, buttercream, total } =
    params;

  const rateLabel =
    pricePerKgB !== null
      ? `avg(${formatCurrency(pricePerKgA)}, ${formatCurrency(pricePerKgB)})`
      : formatCurrency(pricePerKgA);

  const rateExpr = buttercream
    ? `(${rateLabel} + ${formatCurrency(BUTTERCREAM_SURCHARGE_PER_KG)})/kg`
    : `${rateLabel}/kg`;

  let expr = `${rateExpr} × ${weightKg}kg`;
  if (tier === 2) {
    expr += ` + ${formatCurrency(TWO_TIER_ADDON)}`;
  }

  return `${expr} = ${formatCurrency(total)}`;
}
