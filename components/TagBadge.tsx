import { TAG_LABELS } from "@/lib/constants";
import type { TagId } from "@/lib/types";

const TAG_STYLES: Record<TagId, string> = {
  "best-seller": "bg-gold/15 text-gold",
  heart: "bg-terracotta/15 text-terracotta-dark",
  new: "bg-sage/15 text-sage",
  premium: "bg-premium/15 text-premium-dark ring-1 ring-premium/40",
};

export default function TagBadge({ tag }: { tag: TagId }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${TAG_STYLES[tag]}`}
    >
      {TAG_LABELS[tag]}
    </span>
  );
}
