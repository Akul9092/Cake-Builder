"use client";

import { useState } from "react";
import { WEIGHT_STEP_KG } from "@/lib/constants";

interface WeightInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  note?: string;
}

export default function WeightInput({
  value,
  onChange,
  min,
  note,
}: WeightInputProps) {
  const step = WEIGHT_STEP_KG;
  const [text, setText] = useState(String(value));
  // Tracks the last `value` we synced from, so external resets (e.g. the
  // tier-switch min-weight snap) update the text without an effect —
  // adjusting state during render is the React-recommended way to derive
  // state from a prop change without an extra commit-phase render.
  const [syncedValue, setSyncedValue] = useState(value);

  if (value !== syncedValue) {
    setSyncedValue(value);
    setText(String(value));
  }

  const clamp = (raw: number) => (Number.isFinite(raw) ? Math.max(min, raw) : min);

  const commit = (raw: string) => {
    const clamped = clamp(parseFloat(raw));
    onChange(clamped);
    setText(String(clamped));
    setSyncedValue(clamped);
  };

  const adjust = (delta: number) => {
    const next = clamp(Math.round((value + delta) / step) * step);
    onChange(next);
    setText(String(next));
    setSyncedValue(next);
  };

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-ink">
        Weight (kg)
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => adjust(-step)}
          aria-label="Decrease weight"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cream-dark bg-white text-lg text-ink-soft hover:border-terracotta/50"
        >
          −
        </button>
        <input
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={(e) => commit(e.target.value)}
          className="h-11 w-20 rounded-xl border border-cream-dark bg-white text-center text-sm text-ink focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
        />
        <button
          type="button"
          onClick={() => adjust(step)}
          aria-label="Increase weight"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cream-dark bg-white text-lg text-ink-soft hover:border-terracotta/50"
        >
          +
        </button>
      </div>
      {note && <p className="mt-2 text-xs text-ink-soft">{note}</p>}
    </div>
  );
}
