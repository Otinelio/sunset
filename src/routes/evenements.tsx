import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, LayoutGrid, List, Music, PersonStanding, Star } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { EVENTS } from "../data/events";
import { waLink } from "../lib/constants";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: "Événements — Le Sunset Beach Lounge · Lomé" },
      { name: "description", content: "DJ sets, salsa, soirées thématiques et live music au Sunset Beach Lounge." },
      { property: "og:title", content: "Événements — Le Sunset Beach Lounge" },
      { property: "og:description", content: "Toutes nos soirées et événements à Lomé." },
      { property: "og:url", content: "/evenements" },
    ],
    links: [{ rel: "canonical", href: "/evenements" }],
  }),
  component: EventsPage,
});

const genreIcon = (g: string) => {
  if (g.toLowerCase().includes("salsa")) return <PersonStanding className="h-3 w-3" />;
  if (g.toLowerCase().includes("dj")) return <Music className="h-3 w-3" />;
  return <Star className="h-3 w-3" />;
};

function EventsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <PageTransition>
      <section className="relative pt-28 pb-16 bg-graphite overflow-hidden">
        <div className="absolute inset-0 noise-overlay opacity-30" />
        <div className="relative text-center px-5">
          <h1 className="font-display text-white text-5xl md:text-6xl">Nos Soirées</h1>
          <p className="font-accent text-amber text-xl mt-3">DJ Sets · Salsa · Soirées Thématiques · Live Music</p>
        </div>
      </section>

      <section className="py-14 bg-offwhite">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex justify-end gap-1 mb-7">
            <button onClick={() => setView("grid")} className={`p-2 rounded-md ${view === "grid" ? "bg-coral text-white" : "text-graphite hover:bg-sand"}`}><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setView("list")} className={`p-2 rounded-md ${view === "list" ? "bg-coral text-white" : "text-graphite hover:bg-sand"}`}><List className="h-4 w-4" /></button>
          </div>

          <div className={view === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-4"}>
            {EVENTS.map((e, i) => (
              <motion.article
                key={e.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative overflow-hidden rounded-2xl ${view === "grid" ? "h-80" : "h-48"}`}
              >
                <img src={e.image} alt={e.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-terracotta via-terracotta/80 to-terracotta/30" />
                <div className="relative h-full p-6 flex flex-col justify-end">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 bg-coral text-white text-xs px-3 py-1.5 rounded-full"><Calendar className="h-3 w-3" />{e.date}</span>
                    <span className="inline-flex items-center gap-1.5 bg-graphite/60 text-white text-xs px-3 py-1.5 rounded-full"><Clock className="h-3 w-3" />{e.time}</span>
                    <span className="inline-flex items-center gap-1.5 bg-teal text-white text-xs px-3 py-1.5 rounded-full">{genreIcon(e.genre)}{e.genre}</span>
                    <span className={`text-xs px-3 py-1.5 rounded-full ${e.free ? "bg-amber text-graphite" : "bg-teal text-white"}`}>{e.free ? "Gratuit" : "Sur invitation"}</span>
                  </div>
                  <h3 className="font-display text-white text-2xl md:text-3xl">{e.name}</h3>
                  <p className="text-sand/80 text-sm mt-2 max-w-md">{e.description}</p>
                  <a
                    href={waLink(`Bonjour, je souhaite réserver pour la soirée ${e.name} le ${e.date}.`)}
                    target="_blank" rel="noreferrer"
                    className="mt-4 w-fit inline-flex items-center rounded-md border border-coral text-white bg-coral/20 hover:bg-coral px-4 py-2 text-sm font-medium transition-colors"
                  >RSVP</a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
