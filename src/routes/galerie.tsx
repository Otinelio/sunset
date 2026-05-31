import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { PageTransition } from "../components/PageTransition";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Le Sunset Beach Lounge · Lomé" },
      { name: "description", content: "Photos d'ambiance, couchers de soleil, cocktails et soirées du Sunset Beach Lounge." },
      { property: "og:title", content: "Galerie — Le Sunset Beach Lounge" },
      { property: "og:description", content: "Vues, ambiances, cocktails et couchers de soleil." },
      { property: "og:url", content: "/galerie" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
  component: GaleriePage,
});

type Cat = "all" | "sunsets" | "cocktails" | "soirees" | "cuisine" | "vue";
const PHOTOS: { id: string; cat: Exclude<Cat, "all">; caption: string }[] = [
  { id: "photo-1507525428034-b723cf961d3e", cat: "sunsets", caption: "Coucher de soleil sur l'Atlantique" },
  { id: "photo-1470770841072-f978cf4d019e", cat: "sunsets", caption: "Golden hour" },
  { id: "photo-1551024709-8f23befc6f87", cat: "cocktails", caption: "Sunset Tonic" },
  { id: "photo-1514362545857-3bc16c4c7d1b", cat: "cocktails", caption: "Cocktail signature" },
  { id: "photo-1493676304819-0d7a8d026dcf", cat: "soirees", caption: "DJ Set du vendredi" },
  { id: "photo-1571266028243-d220c6a6b0d8", cat: "soirees", caption: "Ambiance soirée" },
  { id: "photo-1559737558-2f5a35f4523b", cat: "cuisine", caption: "Plateau de fruits de mer" },
  { id: "photo-1565299624946-b28f40a0ae38", cat: "cuisine", caption: "Crevettes au piment doux" },
  { id: "photo-1504609813442-a8924e83f76e", cat: "vue", caption: "Vue rooftop" },
  { id: "photo-1506929562872-bb421503ef21", cat: "vue", caption: "Vue océan 180°" },
  { id: "photo-1470337458703-46ad1756a187", cat: "vue", caption: "Soirée vue mer" },
  { id: "photo-1587223962930-cb7f31384c19", cat: "cocktails", caption: "Atlantic Blue" },
];

const CATS: { id: Cat; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "sunsets", label: "Couchers de Soleil" },
  { id: "cocktails", label: "Cocktails & Bar" },
  { id: "soirees", label: "Soirées" },
  { id: "cuisine", label: "Cuisine" },
  { id: "vue", label: "Vue Mer" },
];

function GaleriePage() {
  const [cat, setCat] = useState<Cat>("all");
  const [idx, setIdx] = useState<number | null>(null);
  const photos = useMemo(() => cat === "all" ? PHOTOS : PHOTOS.filter((p) => p.cat === cat), [cat]);

  const close = () => setIdx(null);
  const next = () => setIdx((i) => (i === null ? null : (i + 1) % photos.length));
  const prev = () => setIdx((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));

  return (
    <PageTransition>
      <section className="pt-28 pb-12 bg-graphite text-center">
        <h1 className="font-display text-white text-5xl md:text-6xl">La Galerie</h1>
        <div className="h-px w-16 bg-coral mx-auto my-4" />
        <p className="font-accent text-amber text-xl">Vues, ambiances, cocktails et couchers de soleil</p>
      </section>

      <div className="bg-sand py-4 sticky top-16 z-30 border-b border-[#E8DDD0]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex gap-2 overflow-x-auto">
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                cat === c.id ? "bg-coral text-white" : "bg-white text-graphite hover:bg-coral hover:text-white"
              }`}
            >{c.label}</button>
          ))}
        </div>
      </div>

      <section className="py-12 bg-offwhite">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>*]:mb-3">
            {photos.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                onClick={() => setIdx(i)}
                className="group relative w-full block overflow-hidden rounded-xl break-inside-avoid"
              >
                <img src={`https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=700&q=70`} alt={p.caption} loading="lazy" className="w-full" />
                <div className="absolute inset-0 bg-amber/0 group-hover:bg-amber/70 transition-colors flex items-end p-4">
                  <ZoomIn className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">{p.caption}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {idx !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-graphite/95 flex items-center justify-center p-5"
            onClick={close}
          >
            <button onClick={close} className="absolute top-5 right-5 text-white p-2"><X className="h-6 w-6" /></button>
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-5 top-1/2 -translate-y-1/2 p-3 text-coral hover:text-amber"><ChevronLeft className="h-8 w-8" /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-5 top-1/2 -translate-y-1/2 p-3 text-coral hover:text-amber"><ChevronRight className="h-8 w-8" /></button>
            <img
              onClick={(e) => e.stopPropagation()}
              src={`https://images.unsplash.com/${photos[idx].id}?auto=format&fit=crop&w=1600&q=85`}
              alt={photos[idx].caption}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            />
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-accent text-amber text-xl">{photos[idx].caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
