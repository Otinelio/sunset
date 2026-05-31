import { MessageCircle } from "lucide-react";
import { waLink } from "../lib/constants";

export function FloatingWhatsApp() {
  const href = waLink("Bonjour, je souhaite avoir des informations sur Le Sunset Beach Lounge.");
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-xl hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-graphite px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Nous contacter sur WhatsApp
      </span>
    </a>
  );
}
