import { BUTTERCREAM_SURCHARGE_PER_KG } from "@/lib/constants";

interface FinishToggleProps {
  buttercream: boolean;
  onChange: (buttercream: boolean) => void;
}

const OPTIONS = [
  { value: false, label: "Whipped cream", price: "Included" },
  {
    value: true,
    label: "Buttercream",
    price: `+$${BUTTERCREAM_SURCHARGE_PER_KG}/kg`,
  },
] as const;

export default function FinishToggle({
  buttercream,
  onChange,
}: FinishToggleProps) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">Finish</span>
      <div className="inline-flex rounded-xl border border-cream-dark bg-white p-1">
        {OPTIONS.map((option) => {
          const selected = buttercream === option.value;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
              className={`flex min-h-11 min-w-32 flex-col items-center justify-center rounded-lg px-4 py-1.5 text-center text-sm font-medium transition ${
                selected
                  ? "bg-terracotta text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              <span>{option.label}</span>
              <span
                className={`text-xs font-normal ${
                  selected ? "text-white/80" : "text-ink-soft"
                }`}
              >
                {option.price}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
