import type { CakeOption } from "@/lib/types";

interface FlavorSelectProps {
  label: string;
  options: CakeOption[];
  value: string | null;
  onChange: (id: string) => void;
  excludeId?: string | null;
}

export default function FlavorSelect({
  label,
  options,
  value,
  onChange,
  excludeId,
}: FlavorSelectProps) {
  const available = excludeId
    ? options.filter((o) => o.id !== excludeId)
    : options;

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full rounded-xl border border-cream-dark bg-white px-3 text-sm text-ink focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
      >
        <option value="">Choose a flavour…</option>
        {available.map((option) => (
          <option key={option.id} value={option.id}>
            {option.flavour} ({option.filling})
          </option>
        ))}
      </select>
    </label>
  );
}
