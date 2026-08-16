import { TAG_LABELS } from "@/lib/constants";
import type { TagId } from "@/lib/types";

const ALL_TAGS: TagId[] = ["premium", "best-seller", "heart", "new"];

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  activeTag: TagId | null;
  onSelectTag: (tag: TagId) => void;
}

export default function FilterBar({
  search,
  onSearchChange,
  activeTag,
  onSelectTag,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search flavours or fillings…"
        className="w-full rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30 sm:max-w-xs"
      />
      <div className="flex flex-wrap gap-2">
        {ALL_TAGS.map((tag) => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={active}
              onClick={() => onSelectTag(tag)}
              className={`min-h-11 rounded-full border px-3 text-xs font-medium transition ${
                active
                  ? "border-terracotta bg-terracotta text-white"
                  : "border-cream-dark bg-white text-ink-soft hover:border-terracotta/50"
              }`}
            >
              {TAG_LABELS[tag]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
