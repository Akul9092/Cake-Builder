import { BUTTERCREAM_SURCHARGE_PER_KG } from "@/lib/constants";

interface FinishToggleProps {
  buttercream: boolean;
  onChange: (buttercream: boolean) => void;
}

export default function FinishToggle({
  buttercream,
  onChange,
}: FinishToggleProps) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">Finish</span>
      <div className="inline-flex rounded-xl border border-cream-dark bg-white p-1">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`min-h-11 min-w-32 rounded-lg px-4 text-center text-sm font-medium transition ${
            !buttercream
              ? "bg-terracotta text-white"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          Cream
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`min-h-11 min-w-32 rounded-lg px-4 text-center text-sm font-medium transition ${
            buttercream
              ? "bg-terracotta text-white"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          Buttercream
        </button>
      </div>
      {buttercream && (
        <p className="mt-2 text-xs text-ink-soft">
          +${BUTTERCREAM_SURCHARGE_PER_KG}/kg for buttercream finish.
        </p>
      )}
    </div>
  );
}
