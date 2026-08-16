"use client";

import { useMemo, useState } from "react";
import type { CakeOption, TagId } from "@/lib/types";
import FilterBar from "./FilterBar";
import CakeOptionCard from "./CakeOptionCard";

interface CatalogGridProps {
  options: CakeOption[];
  onSelect?: (id: string) => void;
}

export default function CatalogGrid({ options, onSelect }: CatalogGridProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<TagId | null>(null);

  const selectTag = (tag: TagId) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return options.filter((option) => {
      const matchesQuery =
        !query ||
        option.flavour.toLowerCase().includes(query) ||
        option.filling.toLowerCase().includes(query);
      const matchesTag = activeTag === null || option.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [options, search, activeTag]);

  return (
    <div className="flex flex-col gap-5">
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        activeTag={activeTag}
        onSelectTag={selectTag}
      />
      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-cream-dark px-4 py-10 text-center text-sm text-ink-soft">
          No cakes match your search — try a different flavour or filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((option) => (
            <CakeOptionCard
              key={option.id}
              option={option}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
