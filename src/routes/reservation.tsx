import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Music, Star, Waves } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { WaveAnimation } from "../components/WaveAnimation";
import { waLink } from "../lib/constants";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Réservation — Le Sunset Beach Lounge · Lomé" },
      { name: "description", content: "Réservez votre table au Sunset Beach Lounge à Lomé via WhatsApp." },
      { property: "og:title", content: "Réservation — Le Sunset Beach Lounge" },
      { property: "og:description", content: "Réservez votre table en quelques secondes." },
      { property: "og:url", content: "/reservation" },
    ],
    links: [{ rel: "canonical", href: "/reservation" }],
  }),
  component: ReservationPage,
});

const HOURS = ["17h00", "18h00", "19h00", "20h00", "21h00", "22h00"];
const SIZES = ["1", "2", "3", "4", "5", "6", "7+"];
const OCCASIONS = ["Aucune", "Anniversaire", "Romantique", "Fête d'entreprise", "Autre"];

const Input = (p: any) => <input {...p} className="w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral" />;
const Select = ({ children, ...p }: any) => <select {...p} className="w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral">{children}</select>;
const Label = ({ children }: any) => <label className="block text-sm font-medium text-graphite mb-1.5">{children}</label>;

function ReservationPage() {
  const today = new Date().toISOString().slice(0, 10);
  const [f, setF] = useState({ name: "", phone: "", date: today, time: "20h00", size: "2", occasion: "Aucune", message: "" });

  const submit = () => {
    if (!f.name || !f.phone) return alert("Merci d'indiquer votre nom et téléphone.");
    const msg = `Bonjour Le Sunset Beach Lounge,\nJe souhaite réserver une table.\nNom : ${f.name}\nTéléphone : ${f.phone}\nDate : ${f.date}\nHeure : ${f.time}\nPersonnes : ${f.size}\nOccasion : ${f.occasion}\nMessage : ${f.message || "—"}\nMerci !`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <PageTransition>
      <section className="relative pt-28 pb-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1800&q=70" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-terracotta/85" />
        <div className="relative text-center px-5">
          <div className="h-px w-16 bg-coral mx-auto mb-5" />
          <h1 className="font-display text-white text-5xl md:text-6xl">Réservez Votre Table</h1>
          <p className="font-accent text-amber text-xl mt-3">À bientôt sur la terrasse</p>
        </div>
        <WaveAnimation className="absolute bottom-0 left-0" />
      </section>

      <section className="bg-sand py-16">
        <div className="mx-auto max-w-2xl px-5 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-7 md:p-10">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Label>Prénom & Nom</Label><Input value={f.name} onChange={(e: any) => setF({ ...f, name: e.target.value })} placeholder="Ex: Awa Koffi" /></div>
              <div className="sm:col-span-2"><Label>Téléphone</Label><Input type="tel" value={f.phone} onChange={(e: any) => setF({ ...f, phone: e.target.value })} placeholder="+228 ..." /></div>
              <div><Label>Date souhaitée</Label><Input type="date" min={today} value={f.date} onChange={(e: any) => setF({ ...f, date: e.target.value })} /></div>
              <div><Label>Heure</Label><Select value={f.time} onChange={(e: any) => setF({ ...f, time: e.target.value })}>{HOURS.map((h) => <option key={h}>{h}</option>)}</Select></div>
              <div><Label>Personnes</Label><Select value={f.size} onChange={(e: any) => setF({ ...f, size: e.target.value })}>{SIZES.map((s) => <option key={s}>{s}</option>)}</Select></div>
              <div><Label>Occasion spéciale</Label><Select value={f.occasion} onChange={(e: any) => setF({ ...f, occasion: e.target.value })}>{OCCASIONS.map((o) => <option key={o}>{o}</option>)}</Select></div>
              <div className="sm:col-span-2"><Label>Message / demandes spéciales</Label><textarea rows={4} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} className="w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral" /></div>
            </div>
            <button onClick={submit} className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-md bg-coral text-white py-3.5 font-medium hover:bg-coral/90 transition-colors">
              <Calendar className="h-4 w-4" /> Envoyer la réservation
            </button>
          </div>
        </div>
      </section>

      <section className="bg-sand pb-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <h2 className="font-display text-3xl text-graphite text-center mb-8">Pourquoi réserver ?</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { i: <Waves className="h-7 w-7 text-teal" />, t: "Vue Ocean garantie", d: "Une table avec vue sur l'Atlantique." },
              { i: <Star className="h-7 w-7 text-amber" />, t: "Accueil VIP", d: "Un accueil personnalisé dès votre arrivée." },
              { i: <Music className="h-7 w-7 text-coral" />, t: "Soirée inoubliable", d: "Cocktails, cuisine, DJ — tout est prêt." },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-[#E8DDD0]">
                <div className="inline-flex p-3 rounded-full bg-sand">{c.i}</div>
                <h3 className="font-display text-xl text-graphite mt-3">{c.t}</h3>
                <p className="text-graphite/70 text-sm mt-1">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
