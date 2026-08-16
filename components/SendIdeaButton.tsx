"use client";

import { useState } from "react";
import { buildMessage, buildWaLink } from "@/lib/whatsappMessage";
import type { CakeOption, TierCount } from "@/lib/types";
import WhatsAppIcon from "./icons/WhatsAppIcon";

interface SendIdeaButtonProps {
  tier: TierCount;
  flavorA: CakeOption | null;
  flavorB: CakeOption | null;
  weightKg: number;
  buttercream: boolean;
  eggless: boolean;
  date: string;
  price: number | null;
}

type ButtonState = "idle" | "sent";

function copyToClipboard(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
    return;
  }
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  } catch {
    // Clipboard unavailable — the wa.me link still opens with the message pre-filled.
  }
}

export default function SendIdeaButton({
  tier,
  flavorA,
  flavorB,
  weightKg,
  buttercream,
  eggless,
  date,
  price,
}: SendIdeaButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");

  const isComplete = price !== null && date !== "" && flavorA !== null;

  const handleClick = () => {
    if (!isComplete || !flavorA || price === null) return;

    const message = buildMessage({
      tier,
      flavorA,
      flavorB: tier === 2 ? flavorB : null,
      weightKg,
      buttercream,
      eggless,
      price,
      date,
    });

    copyToClipboard(message);
    window.open(buildWaLink(message), "_blank", "noopener,noreferrer");

    setState("sent");
    setTimeout(() => setState("idle"), 3000);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={!isComplete}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-whatsapp-green px-6 text-base font-semibold text-white transition hover:bg-whatsapp-green-dark disabled:cursor-not-allowed disabled:bg-cream-dark disabled:text-ink-soft"
      >
        <WhatsAppIcon className="h-5 w-5 shrink-0" />
        {state === "sent" ? "Copied — opening WhatsApp…" : "Send Idea to Baker"}
      </button>
      {!isComplete && (
        <p className="mt-2 text-center text-xs text-ink-soft">
          Choose a flavour, weight, and date to continue.
        </p>
      )}
    </div>
  );
}
