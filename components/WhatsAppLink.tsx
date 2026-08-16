import WhatsAppIcon from "./icons/WhatsAppIcon";
import { WHATSAPP_CHAT_LINK } from "@/lib/constants";

export default function WhatsAppLink() {
  return (
    <a
      href={WHATSAPP_CHAT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Nurture Cakes on WhatsApp"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-dark bg-white text-whatsapp-green transition hover:border-whatsapp-green/50"
    >
      <WhatsAppIcon className="h-5 w-5" />
    </a>
  );
}
