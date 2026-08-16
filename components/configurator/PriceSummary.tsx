import { formatCurrency } from "@/lib/pricing";

interface PriceSummaryProps {
  price: number | null;
}

export default function PriceSummary({ price }: PriceSummaryProps) {
  return (
    <div className="rounded-2xl border border-terracotta/30 bg-terracotta/5 p-4 sm:p-5">
      <span className="block text-sm font-medium text-ink-soft">
        Estimated price
      </span>
      <span className="mt-1 block text-3xl font-semibold text-terracotta-dark">
        {price !== null ? `${formatCurrency(price)}++` : "—"}
      </span>
      <p className="mt-2 text-xs text-ink-soft">
        Price is before customisation. Customisation (designs, toppers,
        special requests) will increase the price.
      </p>
    </div>
  );
}
