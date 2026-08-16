"use client";

import { forwardRef, useMemo, useState } from "react";
import type { CakeOption, TierCount } from "@/lib/types";
import {
  DEFAULT_WEIGHT_KG,
  MIN_ONE_TIER_WEIGHT_KG,
  MIN_TWO_TIER_WEIGHT_KG,
} from "@/lib/constants";
import { calcOneTierPrice, calcTwoTierPrice } from "@/lib/pricing";
import TierToggle from "./TierToggle";
import FinishToggle from "./FinishToggle";
import EggToggle from "./EggToggle";
import FlavorSelect from "./FlavorSelect";
import WeightInput from "./WeightInput";
import DatePicker from "./DatePicker";
import PriceSummary from "./PriceSummary";
import OrderSummary from "../OrderSummary";
import SendIdeaButton from "../SendIdeaButton";

export interface CatalogSelection {
  id: string;
  token: number;
}

interface ConfiguratorSectionProps {
  options: CakeOption[];
  /** A catalog-card click, identified by an incrementing token so the same
   * flavour can be re-selected and still reset the form. */
  externalSelection?: CatalogSelection | null;
}

const ConfiguratorSection = forwardRef<HTMLElement, ConfiguratorSectionProps>(
  function ConfiguratorSection({ options, externalSelection }, ref) {
  const [tier, setTier] = useState<TierCount>(1);
  const [flavorIdA, setFlavorIdA] = useState<string | null>(null);
  const [flavorIdB, setFlavorIdB] = useState<string | null>(null);
  const [weightKg, setWeightKg] = useState(DEFAULT_WEIGHT_KG);
  const [buttercream, setButtercream] = useState(false);
  const [eggless, setEggless] = useState(false);
  const [date, setDate] = useState("");
  const [appliedSelectionToken, setAppliedSelectionToken] = useState(0);

  const flavorA = useMemo(
    () => options.find((o) => o.id === flavorIdA) ?? null,
    [options, flavorIdA]
  );
  const flavorB = useMemo(
    () => options.find((o) => o.id === flavorIdB) ?? null,
    [options, flavorIdB]
  );

  // Effective minimum is the tier default, raised by either flavour's own
  // Min_Weight (from the sheet) if it's stricter — e.g. Tiramisu needs 1.5kg
  // even as a 1-tier order.
  const computeMinWeight = (
    tierVal: TierCount,
    a: CakeOption | null,
    b: CakeOption | null
  ) =>
    Math.max(
      tierVal === 2 ? MIN_TWO_TIER_WEIGHT_KG : MIN_ONE_TIER_WEIGHT_KG,
      a?.minWeightKg ?? 0,
      b?.minWeightKg ?? 0
    );

  // Apply a catalog-card click: reset to a 1-tier cake of that flavour.
  // Adjusting state during render (rather than in an effect) is the
  // React-recommended way to derive state from a prop change — this runs
  // synchronously before paint and re-applies even if the same flavour is
  // clicked again, because the token always changes.
  if (
    externalSelection &&
    externalSelection.token !== appliedSelectionToken
  ) {
    setAppliedSelectionToken(externalSelection.token);
    setTier(1);
    setFlavorIdB(null);
    setFlavorIdA(externalSelection.id);
    setButtercream(false);
    setEggless(false);
    const nextFlavorA =
      options.find((o) => o.id === externalSelection.id) ?? null;
    const nextMin = computeMinWeight(1, nextFlavorA, null);
    if (weightKg < nextMin) setWeightKg(nextMin);
  }

  const minWeight = computeMinWeight(tier, flavorA, flavorB);

  const handleTierChange = (nextTier: TierCount) => {
    setTier(nextTier);
    const nextFlavorB = nextTier === 1 ? null : flavorB;
    if (nextTier === 1) setFlavorIdB(null);
    const nextMin = computeMinWeight(nextTier, flavorA, nextFlavorB);
    setWeightKg((w) => (w < nextMin ? nextMin : w));
  };

  const handleFlavorAChange = (id: string) => {
    setFlavorIdA(id);
    const nextFlavorA = options.find((o) => o.id === id) ?? null;
    const nextMin = computeMinWeight(tier, nextFlavorA, flavorB);
    setWeightKg((w) => (w < nextMin ? nextMin : w));
  };

  const handleFlavorBChange = (id: string) => {
    setFlavorIdB(id);
    const nextFlavorB = options.find((o) => o.id === id) ?? null;
    const nextMin = computeMinWeight(tier, flavorA, nextFlavorB);
    setWeightKg((w) => (w < nextMin ? nextMin : w));
  };

  const price = useMemo(() => {
    if (tier === 1) {
      return flavorA
        ? calcOneTierPrice(flavorA.pricePerKg, weightKg, buttercream)
        : null;
    }
    return flavorA
      ? calcTwoTierPrice(
          flavorA.pricePerKg,
          flavorB?.pricePerKg ?? null,
          weightKg,
          buttercream
        )
      : null;
  }, [tier, flavorA, flavorB, weightKg, buttercream]);

  return (
    <section
      ref={ref}
      className="flex flex-col gap-6 rounded-3xl border border-cream-dark bg-white/40 p-5 sm:p-8"
    >
      <div>
        <h2 className="text-xl font-semibold text-ink">Build your cake</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Pick a flavour, set the weight, and choose your date.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
        <TierToggle tier={tier} onChange={handleTierChange} />
        <FinishToggle buttercream={buttercream} onChange={setButtercream} />
        <EggToggle eggless={eggless} onChange={setEggless} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FlavorSelect
          label={tier === 2 ? "Flavour 1" : "Flavour"}
          options={options}
          value={flavorIdA}
          onChange={handleFlavorAChange}
          excludeId={flavorIdB}
        />
        {tier === 2 && (
          <FlavorSelect
            label="Flavour 2 (optional)"
            options={options}
            value={flavorIdB}
            onChange={handleFlavorBChange}
            excludeId={flavorIdA}
          />
        )}
        <WeightInput
          value={weightKg}
          onChange={setWeightKg}
          min={minWeight}
          note={
            minWeight > MIN_ONE_TIER_WEIGHT_KG
              ? `Minimum order for this cake: ${minWeight}kg.`
              : undefined
          }
        />
        <DatePicker value={date} onChange={setDate} />
      </div>

      <PriceSummary price={price} />

      <OrderSummary
        tier={tier}
        flavorA={flavorA}
        flavorB={tier === 2 ? flavorB : null}
        weightKg={weightKg}
        buttercream={buttercream}
        eggless={eggless}
        date={date}
        price={price}
      />

      <SendIdeaButton
        tier={tier}
        flavorA={flavorA}
        flavorB={tier === 2 ? flavorB : null}
        weightKg={weightKg}
        buttercream={buttercream}
        eggless={eggless}
        date={date}
        price={price}
      />
    </section>
  );
  }
);

export default ConfiguratorSection;
