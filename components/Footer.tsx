import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-cream-dark py-6 text-center text-xs text-ink-soft">
      © {new Date().getFullYear()} {SITE_NAME}. Prices are per kg and may
      vary based on design complexity.
    </footer>
  );
}
