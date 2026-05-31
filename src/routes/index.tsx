import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Calendar, ChevronDown, Layers, Music, Star,
  UtensilsCrossed, Waves, Wine, ZoomIn,
} from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { WaveAnimation } from "../components/WaveAnimation";
import { EVENTS } from "../data/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Le Sunset Beach Lounge — Rooftop Bar Vue Mer · Lomé, Togo" },
      { name: "description", content: "Rooftop, cocktails artisanaux, cuisine afro-fusion et DJ sets face à l'océan Atlantique à Lomé." },
      { property: "og:title", content: "Le Sunset Beach Lounge — Lomé, Togo" },
      { property: "og:description", content: "Chill. Sip. Watch the Sunset." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const HERO = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80";
const ABOUT = "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1200&q=70";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const dur = 1200;
    const tick = () => {
      const p = Math.min(1, (Date.now() - start) / dur);
      setN(Math.floor(to * (0.5 - Math.cos(Math.PI * p) / 2)));
      if (p < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const Particles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 18 }).map((_, i) => (
      <span
        key={i}
        className="particle"
        style={{
          left: `${(i * 5.7) % 100}%`,
          animationDuration: `${10 + (i % 7) * 1.5}s`,
          animationDelay: `${(i % 9) * 0.8}s`,
          width: `${6 + (i % 4) * 3}px`,
          height: `${6 + (i % 4) * 3}px`,
        }}
      />
    ))}
  </div>
);

function HomePage() {
  return (
    <PageTransition>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={HERO} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta/80 via-terracotta/60 to-graphite/80" />
        <Particles />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-accent text-amber text-2xl md:text-3xl mb-4"
          >Rooftop · Cocktails · Vue Mer · Lomé, Togo</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="font-display text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05]"
          >Le Sunset<br />Beach Lounge</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-accent text-white/90 text-xl md:text-2xl mt-5"
          >"Chill. Sip. Watch the Sunset."</motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            className="mt-9 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/reservation" className="inline-flex items-center justify-center gap-2 rounded-md bg-coral px-6 py-3.5 text-white font-medium shadow-lg hover:bg-coral/90 transition-colors">
              <Calendar className="h-4 w-4" /> Réserver une Table
            </Link>
            <Link to="/menu" className="inline-flex items-center justify-center rounded-md border border-white/80 bg-white/10 backdrop-blur px-6 py-3.5 text-white font-medium hover:bg-white/20 transition-colors">
              Voir le Menu
            </Link>
          </motion.div>
        </div>
        <ChevronDown className="absolute bottom-24 left-1/2 -translate-x-1/2 h-7 w-7 text-amber bounce-down z-10" />
        <div className="absolute bottom-0 left-0 right-0"><WaveAnimation /></div>
      </section>

      {/* STATS */}
      <section className="bg-sand py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {[
            { i: <Wine className="h-6 w-6" />, n: 30, suffix: "+", label: "Cocktails signature" },
            { i: <Music className="h-6 w-6" />, n: 8, suffix: "+", label: "Soirées par mois" },
            { i: <Waves className="h-6 w-6" />, n: 180, suffix: "°", label: "Vue sur l'océan" },
            { i: <Star className="h-6 w-6" />, n: 2019, label: "Ouvert depuis" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-[#E8DDD0] rounded-xl p-5 border-l-4 border-l-transparent hover:border-l-coral hover:shadow-lg transition-all"
            >
              <div className="text-coral">{s.i}</div>
              <p className="font-display text-amber text-3xl md:text-4xl mt-3"><Counter to={s.n} suffix={s.suffix || ""} /></p>
              <p className="text-graphite/70 text-sm mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.img
            src={ABOUT} alt="Terrasse au coucher du soleil"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-2xl w-full h-[400px] md:h-[520px] object-cover shadow-xl"
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          >
            <p className="font-accent text-coral text-xl">Bienvenue</p>
            <h2 className="font-display text-graphite text-4xl md:text-5xl mt-2 leading-tight">Un havre de paix au-dessus des vagues</h2>
            <p className="text-graphite/75 mt-5 leading-relaxed">
              Niché sur les hauteurs du boulevard de la République à Kodjoviakopé, Le Sunset vous offre une vue
              imprenable sur l'océan Atlantique. Cocktails artisanaux, cuisine afro-fusion, DJ sets et soirées
              thématiques — tout pour faire de votre soirée un moment inoubliable.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                { i: <Layers className="h-3.5 w-3.5" />, label: "Rooftop", c: "coral" },
                { i: <Waves className="h-3.5 w-3.5" />, label: "Vue Mer", c: "teal" },
                { i: <Music className="h-3.5 w-3.5" />, label: "DJ Sets", c: "coral" },
                { i: <UtensilsCrossed className="h-3.5 w-3.5" />, label: "Cuisine Afro-Fusion", c: "teal" },
              ].map((b, i) => (
                <span key={i} className={`inline-flex items-center gap-1.5 bg-white border ${b.c === "coral" ? "border-coral text-coral" : "border-teal text-teal"} rounded-full px-3 py-1.5 text-xs font-medium`}>
                  {b.i}{b.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="relative bg-sand py-20 md:py-28">
        <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-accent text-coral text-xl">L'expérience</p>
            <h2 className="font-display text-graphite text-4xl md:text-5xl mt-2">Tout ce que vous allez aimer</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { i: <Wine className="h-7 w-7 text-coral" />, t: "Bar & Cocktails", d: "Plus de 30 cocktails signature, bières locales et importées, jus frais." },
              { i: <UtensilsCrossed className="h-7 w-7 text-teal" />, t: "Cuisine Afro-Fusion", d: "Tapas, attiéké, fruits de mer, snacks — des saveurs locales revisitées." },
              { i: <Music className="h-7 w-7 text-coral" />, t: "Soirées & DJ Sets", d: "DJ sets chaque week-end, soirées thématiques, salsa les jeudis." },
            ].map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-7 border-t-[3px] border-t-coral shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {e.i}
                <h3 className="font-display text-2xl text-graphite mt-4">{e.t}</h3>
                <p className="text-graphite/70 mt-2 text-sm leading-relaxed">{e.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS TEASER */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="font-accent text-coral text-xl">Agenda</p>
              <h2 className="font-display text-graphite text-4xl md:text-5xl mt-2">Prochaines Soirées</h2>
            </div>
            <Link to="/evenements" className="inline-flex items-center gap-2 text-coral font-medium hover:gap-3 transition-all">
              Voir tous les événements <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {EVENTS.slice(0, 3).map((e) => (
              <Link key={e.id} to="/evenements" className="group relative h-72 rounded-2xl overflow-hidden">
                <img src={e.image} alt={e.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-terracotta via-terracotta/70 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 bg-coral text-white text-xs px-2.5 py-1 rounded-full"><Calendar className="h-3 w-3" />{e.date}</span>
                    <span className="bg-teal/90 text-white text-xs px-2.5 py-1 rounded-full">{e.genre}</span>
                  </div>
                  <h3 className="font-display text-2xl text-white">{e.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="bg-graphite py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-accent text-amber text-xl">Ambiance</p>
            <h2 className="font-display text-white text-4xl md:text-5xl mt-2">Aperçu de l'Ambiance</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "photo-1470337458703-46ad1756a187",
              "photo-1514362545857-3bc16c4c7d1b",
              "photo-1507525428034-b723cf961d3e",
              "photo-1493676304819-0d7a8d026dcf",
              "photo-1571266028243-d220c6a6b0d8",
              "photo-1559737558-2f5a35f4523b",
              "photo-1504609813442-a8924e83f76e",
              "photo-1565299624946-b28f40a0ae38",
            ].map((p, i) => (
              <div key={p} className={`relative overflow-hidden rounded-xl group ${i % 3 === 0 ? "row-span-2 h-[400px]" : "h-48"}`}>
                <img src={`https://images.unsplash.com/${p}?auto=format&fit=crop&w=600&q=70`} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-amber/0 group-hover:bg-amber/70 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/galerie" className="inline-flex items-center gap-2 rounded-md bg-coral px-6 py-3 text-white font-medium hover:bg-coral/90 transition-colors">
              Voir la Galerie Complète <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
