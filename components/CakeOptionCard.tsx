import { formatCurrency } from "@/lib/pricing";
import { getFlavorColor } from "@/lib/flavorColors";
import type { CakeOption } from "@/lib/types";
import TagBadge from "./TagBadge";

interface CakeOptionCardProps {
  option: CakeOption;
  onSelect?: (id: string) => void;
}

export default function CakeOptionCard({
  option,
  onSelect,
}: CakeOptionCardProps) {
  const isPremium = option.tags.includes("premium");

  return (
    <button
      type="button"
      onClick={() => onSelect?.(option.id)}
      className={`relative w-full rounded-2xl p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-terracotta/40 sm:p-5 ${
        isPremium
          ? "border-2 border-premium/50 bg-premium/5 hover:border-premium"
          : "border border-cream-dark bg-white/60 hover:border-terracotta/50"
      }`}
    >
      {option.tags.length > 0 && (
        <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1">
          {option.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
      <h3 className="flex items-center gap-2 pr-24 text-lg font-semibold text-ink">
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: getFlavorColor(option.flavour) }}
        />
        {option.flavour}
      </h3>
      <p className="mt-1 text-sm text-ink-soft">{option.filling} filling</p>
      <p className="mt-3 text-base font-medium text-terracotta-dark">
        {formatCurrency(option.pricePerKg)}++{" "}
        <span className="text-sm font-normal text-ink-soft">/ kg</span>
      </p>
      {option.minWeightKg && (
        <p className="mt-1 text-xs text-ink-soft">
          Min. order {option.minWeightKg}kg
        </p>
      )}
    </button>
  );
}
