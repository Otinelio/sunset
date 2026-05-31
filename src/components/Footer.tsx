import { Link } from "@tanstack/react-router";
import { ExternalLink, Share2, Play, MapPin, Clock } from "lucide-react";
import { BRAND } from "../lib/constants";
import logoDefault from "../images/logo_sunset.png";

export function Footer() {
  return (
    <footer className="bg-terracotta text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <img src={logoDefault} alt="Logo Sunset" className="h-16 w-auto object-contain" />
          </div>
          <p className="font-accent text-amber text-xl mt-3">{BRAND.tagline}</p>
        </div>

        <div>
          <h4 className="font-display text-lg text-white mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm text-white/85">
            {[
              { to: "/", label: "Accueil" },
              { to: "/menu", label: "Menu" },
              { to: "/evenements", label: "Événements" },
              { to: "/galerie", label: "Galerie" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-amber transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-white mb-4">Nous trouver</h4>
          <div className="space-y-2 text-sm text-white/85">
            <p className="flex gap-2"><MapPin className="h-4 w-4 text-coral flex-shrink-0 mt-0.5" /><span>{BRAND.address}</span></p>
            <p className="flex gap-2"><Clock className="h-4 w-4 text-coral flex-shrink-0 mt-0.5" /><span>{BRAND.hours}</span></p>
          </div>
          <div className="flex gap-3 mt-4">
            <a href="#" aria-label="Instagram" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"><ExternalLink className="h-4 w-4 text-coral" /></a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"><Share2 className="h-4 w-4 text-coral" /></a>
            <a href="#" aria-label="TikTok" className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"><Play className="h-4 w-4 text-coral" /></a>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-amber/70" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 text-center text-xs text-sand/70">
        © 2025 Le Sunset Beach Lounge — Lomé, Togo
      </div>
    </footer>
  );
}
