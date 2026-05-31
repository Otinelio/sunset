import { jsxs, jsx } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { P as PageTransition } from "./PageTransition-7-UXyMD4.js";
const PHOTOS = [{
  id: "photo-1507525428034-b723cf961d3e",
  cat: "sunsets",
  caption: "Coucher de soleil sur l'Atlantique"
}, {
  id: "photo-1470770841072-f978cf4d019e",
  cat: "sunsets",
  caption: "Golden hour"
}, {
  id: "photo-1551024709-8f23befc6f87",
  cat: "cocktails",
  caption: "Sunset Tonic"
}, {
  id: "photo-1514362545857-3bc16c4c7d1b",
  cat: "cocktails",
  caption: "Cocktail signature"
}, {
  id: "photo-1493676304819-0d7a8d026dcf",
  cat: "soirees",
  caption: "DJ Set du vendredi"
}, {
  id: "photo-1571266028243-d220c6a6b0d8",
  cat: "soirees",
  caption: "Ambiance soirée"
}, {
  id: "photo-1559737558-2f5a35f4523b",
  cat: "cuisine",
  caption: "Plateau de fruits de mer"
}, {
  id: "photo-1565299624946-b28f40a0ae38",
  cat: "cuisine",
  caption: "Crevettes au piment doux"
}, {
  id: "photo-1504609813442-a8924e83f76e",
  cat: "vue",
  caption: "Vue rooftop"
}, {
  id: "photo-1506929562872-bb421503ef21",
  cat: "vue",
  caption: "Vue océan 180°"
}, {
  id: "photo-1470337458703-46ad1756a187",
  cat: "vue",
  caption: "Soirée vue mer"
}, {
  id: "photo-1587223962930-cb7f31384c19",
  cat: "cocktails",
  caption: "Atlantic Blue"
}];
const CATS = [{
  id: "all",
  label: "Tous"
}, {
  id: "sunsets",
  label: "Couchers de Soleil"
}, {
  id: "cocktails",
  label: "Cocktails & Bar"
}, {
  id: "soirees",
  label: "Soirées"
}, {
  id: "cuisine",
  label: "Cuisine"
}, {
  id: "vue",
  label: "Vue Mer"
}];
function GaleriePage() {
  const [cat, setCat] = useState("all");
  const [idx, setIdx] = useState(null);
  const photos = useMemo(() => cat === "all" ? PHOTOS : PHOTOS.filter((p) => p.cat === cat), [cat]);
  const close = () => setIdx(null);
  const next = () => setIdx((i) => i === null ? null : (i + 1) % photos.length);
  const prev = () => setIdx((i) => i === null ? null : (i - 1 + photos.length) % photos.length);
  return /* @__PURE__ */ jsxs(PageTransition, { children: [
    /* @__PURE__ */ jsxs("section", { className: "pt-28 pb-12 bg-graphite text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-white text-5xl md:text-6xl", children: "La Galerie" }),
      /* @__PURE__ */ jsx("div", { className: "h-px w-16 bg-coral mx-auto my-4" }),
      /* @__PURE__ */ jsx("p", { className: "font-accent text-amber text-xl", children: "Vues, ambiances, cocktails et couchers de soleil" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-sand py-4 sticky top-16 z-30 border-b border-[#E8DDD0]", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-5 lg:px-8 flex gap-2 overflow-x-auto", children: CATS.map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setCat(c.id), className: `whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-colors ${cat === c.id ? "bg-coral text-white" : "bg-white text-graphite hover:bg-coral hover:text-white"}`, children: c.label }, c.id)) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 bg-offwhite", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "columns-2 md:columns-3 lg:columns-4 gap-3 [&>*]:mb-3", children: photos.map((p, i) => /* @__PURE__ */ jsxs(motion.button, { initial: {
      opacity: 0
    }, whileInView: {
      opacity: 1
    }, viewport: {
      once: true
    }, onClick: () => setIdx(i), className: "group relative w-full block overflow-hidden rounded-xl break-inside-avoid", children: [
      /* @__PURE__ */ jsx("img", { src: `https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=700&q=70`, alt: p.caption, loading: "lazy", className: "w-full" }),
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-amber/0 group-hover:bg-amber/70 transition-colors flex items-end p-4", children: [
        /* @__PURE__ */ jsx(ZoomIn, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" }),
        /* @__PURE__ */ jsx("p", { className: "text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity", children: p.caption })
      ] })
    ] }, p.id)) }) }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: idx !== null && /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, className: "fixed inset-0 z-[60] bg-graphite/95 flex items-center justify-center p-5", onClick: close, children: [
      /* @__PURE__ */ jsx("button", { onClick: close, className: "absolute top-5 right-5 text-white p-2", children: /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("button", { onClick: (e) => {
        e.stopPropagation();
        prev();
      }, className: "absolute left-5 top-1/2 -translate-y-1/2 p-3 text-coral hover:text-amber", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsx("button", { onClick: (e) => {
        e.stopPropagation();
        next();
      }, className: "absolute right-5 top-1/2 -translate-y-1/2 p-3 text-coral hover:text-amber", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsx("img", { onClick: (e) => e.stopPropagation(), src: `https://images.unsplash.com/${photos[idx].id}?auto=format&fit=crop&w=1600&q=85`, alt: photos[idx].caption, className: "max-h-[85vh] max-w-[90vw] rounded-xl object-contain" }),
      /* @__PURE__ */ jsx("p", { className: "absolute bottom-5 left-1/2 -translate-x-1/2 font-accent text-amber text-xl", children: photos[idx].caption })
    ] }) })
  ] });
}
export {
  GaleriePage as component
};
