"use client";

import { useRef, useState } from "react";
import type { CakeOption } from "@/lib/types";
import CatalogGrid from "./CatalogGrid";
import ConfiguratorSection, {
  type CatalogSelection,
} from "./configurator/ConfiguratorSection";

export default function CakeExplorer({ options }: { options: CakeOption[] }) {
  const [selection, setSelection] = useState<CatalogSelection | null>(null);
  const configuratorRef = useRef<HTMLElement>(null);

  const handleSelect = (id: string) => {
    setSelection((prev) => ({ id, token: (prev?.token ?? 0) + 1 }));
    configuratorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <section>
        <h2 className="text-xl font-semibold text-ink">
          Explore our flavours
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Browse our cream cake flavours, fillings, and prices per kg. Tap a
          cake to start building it below.
        </p>
        <p className="mt-1 text-xs text-ink-soft">
          Prices shown are for cream cakes and marked ++, meaning they&apos;re
          before customisation — fondant, designs, toppers, and special
          requests will increase the price.
        </p>
        <div className="mt-5">
          <CatalogGrid options={options} onSelect={handleSelect} />
        </div>
      </section>

      <ConfiguratorSection
        ref={configuratorRef}
        options={options}
        externalSelection={selection}
      />
    </>
  );
}
