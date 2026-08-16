import { isWithinNextDays, todayLocalISODate } from "@/lib/dateWarning";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const showWarning = value !== "" && isWithinNextDays(value);

  return (
    <div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-ink">
          Pickup / delivery date
        </span>
        <input
          type="date"
          min={todayLocalISODate()}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-11 w-full rounded-xl border border-cream-dark bg-white px-3 text-sm text-ink focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
        />
      </label>
      {showWarning && (
        <p className="mt-2 rounded-lg bg-amber-100 px-3 py-2 text-xs font-medium text-amber-800">
          This is late, check with baker
        </p>
      )}
    </div>
  );
}
