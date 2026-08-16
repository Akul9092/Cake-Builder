interface EggToggleProps {
  eggless: boolean;
  onChange: (eggless: boolean) => void;
}

export default function EggToggle({ eggless, onChange }: EggToggleProps) {
  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">
        Egg preference
      </span>
      <div className="inline-flex rounded-xl border border-cream-dark bg-white p-1">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`min-h-11 min-w-32 rounded-lg px-4 text-center text-sm font-medium transition ${
            !eggless
              ? "bg-terracotta text-white"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          Egg
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`min-h-11 min-w-32 rounded-lg px-4 text-center text-sm font-medium transition ${
            eggless
              ? "bg-terracotta text-white"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          Eggless
        </button>
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        No price difference between egg and eggless.
      </p>
    </div>
  );
}
