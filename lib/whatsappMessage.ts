import {
  describePriceBreakdown,
  finishLabel,
  formatCurrency,
} from "./pricing";
import { formatDisplayDate, isWithinNextDays } from "./dateWarning";
import { SITE_NAME, WHATSAPP_NUMBER } from "./constants";
import type { CakeOption, TierCount } from "./types";

export interface OrderIdea {
  tier: TierCount;
  flavorA: CakeOption;
  flavorB: CakeOption | null;
  weightKg: number;
  buttercream: boolean;
  eggless: boolean;
  price: number;
  date: string;
}

export function buildMessage(order: OrderIdea): string {
  const cakeLine =
    order.tier === 2 && order.flavorB
      ? `${order.flavorA.flavour} / ${order.flavorA.filling} + ${order.flavorB.flavour} / ${order.flavorB.filling}`
      : `${order.flavorA.flavour} / ${order.flavorA.filling}`;

  const isLate = isWithinNextDays(order.date);
  const dateLine = isLate
    ? `${formatDisplayDate(order.date)} — This is late, check with baker`
    : formatDisplayDate(order.date);

  const priceBreakdown = describePriceBreakdown({
    tier: order.tier,
    pricePerKgA: order.flavorA.pricePerKg,
    pricePerKgB: order.tier === 2 ? (order.flavorB?.pricePerKg ?? null) : null,
    weightKg: order.weightKg,
    buttercream: order.buttercream,
    total: order.price,
  });

  return [
    `Hi ${SITE_NAME}! Here's my cake idea`,
    "",
    `Cake: ${cakeLine}`,
    `Tier: ${order.tier === 2 ? "2-Tier" : "1-Tier"}`,
    `Finish: ${finishLabel(order.buttercream)}`,
    `Egg preference: ${order.eggless ? "Eggless" : "Egg"} (no price difference)`,
    `Weight: ${order.weightKg} kg`,
    `Price Breakdown: ${priceBreakdown}`,
    `Estimated Price: ${formatCurrency(order.price)}++ (before customisation)`,
    `Pickup Date: ${dateLine}`,
    "",
    "Thanks so much, looking forward to hearing from you!",
  ].join("\n");
}

export function buildWaLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
