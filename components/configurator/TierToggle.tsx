import type { TierCount } from "@/lib/types";
import { TWO_TIER_ADDON, MIN_TWO_TIER_WEIGHT_KG } from "@/lib/constants";

interface TierToggleProps {
  tier: TierCount;
  onChange: (tier: TierCount) => void;
}

export default function TierToggle({ tier, onChange }: TierToggleProps) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">Tier</span>
      <div className="inline-flex rounded-xl border border-cream-dark bg-white p-1">
        {([1, 2] as TierCount[]).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-11 min-w-32 rounded-lg px-4 text-center text-sm font-medium transition ${
              tier === option
                ? "bg-terracotta text-white"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {option}-Tier
          </button>
        ))}
      </div>
      {tier === 2 && (
        <p className="mt-2 text-xs text-ink-soft">
          +${TWO_TIER_ADDON} add-on · minimum {MIN_TWO_TIER_WEIGHT_KG}kg ·
          pick 1 or 2 flavours
        </p>
      )}
    </div>
  );
}
