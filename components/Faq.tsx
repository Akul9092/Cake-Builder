import type { ReactNode } from "react";
import { WHATSAPP_CHAT_LINK } from "@/lib/constants";

const TANJONG_RHU_MRT_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Tanjong+Rhu+MRT+Station";

const LINK_CLASS =
  "underline decoration-terracotta/50 underline-offset-2 hover:text-terracotta-dark";

interface FaqItem {
  question: string;
  answer: ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is there a price difference between eggless and egg cakes?",
    answer: (
      <>
        No difference. Eggless and egg versions of every flavour are priced
        exactly the same. Just mention your preference (egg or eggless) when
        you send your cake idea to us, and we&apos;ll bake accordingly.
      </>
    ),
  },
  {
    question: "Does the listed price include customisation?",
    answer: (
      <>
        No, it does not. The price shown is for the base cream cake only. It
        includes writing a name or short message on the cake, plus a cake
        knife and candles. Anything beyond that (fondant work, edible
        toppers, floral arrangements, intricate piping, and other custom
        designs) is not included and will add to the price. Let us know
        what you have in mind and we&apos;ll quote it separately.
      </>
    ),
  },
  {
    question: "What is the pricing for fondant cakes?",
    answer: (
      <>
        Fondant cake pricing depends on the design, so it isn&apos;t listed
        on this site. Please{" "}
        <a
          href={WHATSAPP_CHAT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          message us on WhatsApp
        </a>{" "}
        with your design idea and we&apos;ll get back to you with a quote.
      </>
    ),
  },
  {
    question: "Do you do edible image cakes?",
    answer: (
      <>
        Edible image pricing depends on the design and printing involved, so
        it isn&apos;t listed on this site. Please{" "}
        <a
          href={WHATSAPP_CHAT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          message us on WhatsApp
        </a>{" "}
        with what you have in mind and we&apos;ll get back to you with a
        quote.
      </>
    ),
  },
  {
    question: "Is this delivery or self-pickup?",
    answer: (
      <>
        Both are available. You&apos;re welcome to self-collect, or we can
        arrange delivery via Lalamove (a third-party car delivery service).
        Please note we don&apos;t run our own delivery fleet, so delivery is
        subject to Lalamove&apos;s availability and rates. Self-pickup is
        at our unit near{" "}
        <a
          href={TANJONG_RHU_MRT_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          Tanjong Rhu MRT
        </a>{" "}
        (the MRT station itself is just a nearby landmark, not the pickup
        point).
      </>
    ),
  },
  {
    question: "How much lead time do you need for a customised cake?",
    answer: (
      <>
        We recommend at least 1 week&apos;s notice for a customised cake, so
        we have time to plan the design, source ingredients, and give it the
        attention it deserves. If your date is sooner than that, reach out
        anyway and we&apos;ll try our best to accommodate. Note that
        picking a date within the next 3 days on this site will also show a
        &quot;This is late, check with baker&quot; warning.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section>
      <h2 className="text-xl font-semibold text-ink">
        Frequently asked questions
      </h2>
      <div className="mt-5 flex flex-col gap-3">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-cream-dark bg-white/60 p-4 sm:p-5"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="shrink-0 text-lg leading-none text-terracotta transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
