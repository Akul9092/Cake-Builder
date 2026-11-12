import { finishLabel, formatCurrency } from "@/lib/pricing";
import { formatDisplayDate, isWithinNextDays } from "@/lib/dateWarning";
import type { CakeOption, TierCount } from "@/lib/types";

interface OrderSummaryProps {
  tier: TierCount;
  flavorA: CakeOption | null;
  flavorB: CakeOption | null;
  weightKg: number;
  buttercream: boolean;
  eggless: boolean;
  date: string;
  price: number | null;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
      <span className="text-ink-soft">{label}</span>
      <span className="text-right font-medium text-ink">{value}</span>
    </div>
  );
}

export default function OrderSummary({
  tier,
  flavorA,
  flavorB,
  weightKg,
  buttercream,
  eggless,
  date,
  price,
}: OrderSummaryProps) {
  const cakeText =
    tier === 2 && flavorA && flavorB
      ? `${flavorA.flavour} + ${flavorB.flavour}`
      : flavorA
        ? `${flavorA.flavour} / ${flavorA.filling}`
        : "—";

  const isLate = date !== "" && isWithinNextDays(date);

  return (
    <div className="rounded-2xl border border-cream-dark bg-white/60 p-4 sm:p-5">
      <h3 className="mb-2 text-sm font-semibold text-ink">Your cake idea</h3>
      <div className="divide-y divide-cream-dark">
        <Row label="Cake" value={cakeText} />
        <Row label="Tier" value={tier === 2 ? "2-Tier" : "1-Tier"} />
        <Row label="Finish" value={finishLabel(buttercream)} />
        <Row label="Egg preference" value={eggless ? "Eggless" : "Egg"} />
        <Row label="Weight" value={`${weightKg} kg`} />
        <Row label="Date" value={date ? formatDisplayDate(date) : "—"} />
        <Row
          label="Price"
          value={price !== null ? `${formatCurrency(price)}++` : "—"}
        />
      </div>
      {isLate && (
        <p className="mt-3 rounded-lg bg-amber-100 px-3 py-2 text-xs font-medium text-amber-800">
          This is late, check with baker
        </p>
      )}
    </div>
  );
}
