import FacebookPagePlugin from "./FacebookPagePlugin";
import InstagramCard from "./InstagramCard";
import WhatsAppLink from "./WhatsAppLink";
import { SITE_NAME } from "@/lib/constants";

export default function Header() {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 py-6 sm:py-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {SITE_NAME}
        </h1>
        <p className="text-sm text-ink-soft">Gourmet Egg and Eggless Cakes</p>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3">
        <InstagramCard />
        <WhatsAppLink />
        <FacebookPagePlugin />
      </div>
    </header>
  );
}
