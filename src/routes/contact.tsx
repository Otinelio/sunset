import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, ExternalLink, MapPin, Phone, Play, Send, Share2 } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { BRAND, waLink } from "../lib/constants";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Le Sunset Beach Lounge · Lomé" },
      { name: "description", content: "Adresse, horaires et contact du Sunset Beach Lounge à Kodjoviakopé, Lomé, Togo." },
      { property: "og:title", content: "Contact — Le Sunset Beach Lounge" },
      { property: "og:description", content: "Nous trouver et nous contacter à Lomé." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const submit = () => {
    if (!f.name || !f.message) return alert("Merci de compléter votre nom et message.");
    const msg = `Bonjour Le Sunset,\nNom : ${f.name}\nEmail : ${f.email || "—"}\nObjet : ${f.subject || "—"}\nMessage : ${f.message}`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <PageTransition>
      <section className="pt-28 pb-12 bg-graphite text-center">
        <h1 className="font-display text-white text-5xl md:text-6xl">Contactez-Nous</h1>
        <div className="h-px w-12 bg-amber mx-auto mt-4" />
      </section>

      <section className="bg-offwhite py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="bg-sand rounded-2xl p-7 border border-[#E8DDD0]">
            <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-coral" /><h2 className="font-display text-2xl text-graphite">Nous Trouver</h2></div>
            <div className="mt-5 space-y-4 text-sm text-graphite/85">
              <p>{BRAND.address}</p>
              <p className="text-graphite/60">À côté de l'Ambassade d'Allemagne</p>
              <p className="flex gap-2"><Clock className="h-4 w-4 text-teal flex-shrink-0 mt-0.5" />{BRAND.hours}</p>
              <p className="flex gap-2"><Phone className="h-4 w-4 text-coral flex-shrink-0 mt-0.5" />+228 90 00 00 00</p>
            </div>
            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="Instagram" className="p-2.5 rounded-md bg-white border border-[#E8DDD0]"><ExternalLink className="h-4 w-4 text-coral" /></a>
              <a href="#" aria-label="Facebook" className="p-2.5 rounded-md bg-white border border-[#E8DDD0]"><Share2 className="h-4 w-4 text-coral" /></a>
              <a href="#" aria-label="TikTok" className="p-2.5 rounded-md bg-white border border-[#E8DDD0]"><Play className="h-4 w-4 text-coral" /></a>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl border border-[#E8DDD0]">
              <iframe
                title="Carte Le Sunset"
                src="https://www.google.com/maps?q=Kodjoviakop%C3%A9+Lom%C3%A9+Togo&output=embed"
                className="w-full h-64 border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-[#E8DDD0] shadow-sm">
            <h2 className="font-display text-2xl text-graphite">Envoyer un message</h2>
            <div className="mt-5 space-y-4">
              <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Nom" className="w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral" />
              <input value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="Email" type="email" className="w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral" />
              <input value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} placeholder="Objet" className="w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral" />
              <textarea rows={6} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} placeholder="Message" className="w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral" />
              <button onClick={submit} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-coral text-white py-3 font-medium hover:bg-coral/90 transition-colors">
                <Send className="h-4 w-4" /> Envoyer le message
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
