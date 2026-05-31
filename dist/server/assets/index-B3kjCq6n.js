import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calendar, ChevronDown, Wine, Music, Waves, Star, Layers, UtensilsCrossed, ArrowRight, ZoomIn } from "lucide-react";
import { P as PageTransition } from "./PageTransition-7-UXyMD4.js";
import { W as WaveAnimation } from "./WaveAnimation-hFnD4DPX.js";
import { E as EVENTS } from "./events-DFdkKy6w.js";
const HERO = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80";
const ABOUT = "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1200&q=70";
function Counter({
  to,
  suffix = ""
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true
  });
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
  return /* @__PURE__ */ jsxs("span", { ref, children: [
    n,
    suffix
  ] });
}
const Particles = () => /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: Array.from({
  length: 18
}).map((_, i) => /* @__PURE__ */ jsx("span", { className: "particle", style: {
  left: `${i * 5.7 % 100}%`,
  animationDuration: `${10 + i % 7 * 1.5}s`,
  animationDelay: `${i % 9 * 0.8}s`,
  width: `${6 + i % 4 * 3}px`,
  height: `${6 + i % 4 * 3}px`
} }, i)) });
function HomePage() {
  return /* @__PURE__ */ jsxs(PageTransition, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: HERO, alt: "", className: "absolute inset-0 w-full h-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-terracotta/80 via-terracotta/60 to-graphite/80" }),
      /* @__PURE__ */ jsx(Particles, {}),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center px-6 max-w-4xl", children: [
        /* @__PURE__ */ jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.2
        }, className: "font-accent text-amber text-2xl md:text-3xl mb-4", children: "Rooftop · Cocktails · Vue Mer · Lomé, Togo" }),
        /* @__PURE__ */ jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.35
        }, className: "font-display text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05]", children: [
          "Le Sunset",
          /* @__PURE__ */ jsx("br", {}),
          "Beach Lounge"
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.5
        }, className: "font-accent text-white/90 text-xl md:text-2xl mt-5", children: '"Chill. Sip. Watch the Sunset."' }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.65
        }, className: "mt-9 flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/reservation", className: "inline-flex items-center justify-center gap-2 rounded-md bg-coral px-6 py-3.5 text-white font-medium shadow-lg hover:bg-coral/90 transition-colors", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
            " Réserver une Table"
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/menu", className: "inline-flex items-center justify-center rounded-md border border-white/80 bg-white/10 backdrop-blur px-6 py-3.5 text-white font-medium hover:bg-white/20 transition-colors", children: "Voir le Menu" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ChevronDown, { className: "absolute bottom-24 left-1/2 -translate-x-1/2 h-7 w-7 text-amber bounce-down z-10" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0", children: /* @__PURE__ */ jsx(WaveAnimation, {}) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-sand py-16 md:py-20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-5 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5", children: [{
      i: /* @__PURE__ */ jsx(Wine, { className: "h-6 w-6" }),
      n: 30,
      suffix: "+",
      label: "Cocktails signature"
    }, {
      i: /* @__PURE__ */ jsx(Music, { className: "h-6 w-6" }),
      n: 8,
      suffix: "+",
      label: "Soirées par mois"
    }, {
      i: /* @__PURE__ */ jsx(Waves, { className: "h-6 w-6" }),
      n: 180,
      suffix: "°",
      label: "Vue sur l'océan"
    }, {
      i: /* @__PURE__ */ jsx(Star, { className: "h-6 w-6" }),
      n: 2019,
      label: "Ouvert depuis"
    }].map((s, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.08
    }, className: "bg-white border border-[#E8DDD0] rounded-xl p-5 border-l-4 border-l-transparent hover:border-l-coral hover:shadow-lg transition-all", children: [
      /* @__PURE__ */ jsx("div", { className: "text-coral", children: s.i }),
      /* @__PURE__ */ jsx("p", { className: "font-display text-amber text-3xl md:text-4xl mt-3", children: /* @__PURE__ */ jsx(Counter, { to: s.n, suffix: s.suffix || "" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-graphite/70 text-sm mt-1", children: s.label })
    ] }, i)) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-20 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8 grid md:grid-cols-2 gap-10 md:gap-16 items-center", children: [
      /* @__PURE__ */ jsx(motion.img, { src: ABOUT, alt: "Terrasse au coucher du soleil", initial: {
        opacity: 0,
        x: -30
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, className: "rounded-2xl w-full h-[400px] md:h-[520px] object-cover shadow-xl" }),
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        x: 30
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, children: [
        /* @__PURE__ */ jsx("p", { className: "font-accent text-coral text-xl", children: "Bienvenue" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display text-graphite text-4xl md:text-5xl mt-2 leading-tight", children: "Un havre de paix au-dessus des vagues" }),
        /* @__PURE__ */ jsx("p", { className: "text-graphite/75 mt-5 leading-relaxed", children: "Niché sur les hauteurs du boulevard de la République à Kodjoviakopé, Le Sunset vous offre une vue imprenable sur l'océan Atlantique. Cocktails artisanaux, cuisine afro-fusion, DJ sets et soirées thématiques — tout pour faire de votre soirée un moment inoubliable." }),
        /* @__PURE__ */ jsx("div", { className: "mt-7 flex flex-wrap gap-2.5", children: [{
          i: /* @__PURE__ */ jsx(Layers, { className: "h-3.5 w-3.5" }),
          label: "Rooftop",
          c: "coral"
        }, {
          i: /* @__PURE__ */ jsx(Waves, { className: "h-3.5 w-3.5" }),
          label: "Vue Mer",
          c: "teal"
        }, {
          i: /* @__PURE__ */ jsx(Music, { className: "h-3.5 w-3.5" }),
          label: "DJ Sets",
          c: "coral"
        }, {
          i: /* @__PURE__ */ jsx(UtensilsCrossed, { className: "h-3.5 w-3.5" }),
          label: "Cuisine Afro-Fusion",
          c: "teal"
        }].map((b, i) => /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1.5 bg-white border ${b.c === "coral" ? "border-coral text-coral" : "border-teal text-teal"} rounded-full px-3 py-1.5 text-xs font-medium`, children: [
          b.i,
          b.label
        ] }, i)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "relative bg-sand py-20 md:py-28", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise-overlay opacity-30 pointer-events-none" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-5 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
          /* @__PURE__ */ jsx("p", { className: "font-accent text-coral text-xl", children: "L'expérience" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-graphite text-4xl md:text-5xl mt-2", children: "Tout ce que vous allez aimer" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
          i: /* @__PURE__ */ jsx(Wine, { className: "h-7 w-7 text-coral" }),
          t: "Bar & Cocktails",
          d: "Plus de 30 cocktails signature, bières locales et importées, jus frais."
        }, {
          i: /* @__PURE__ */ jsx(UtensilsCrossed, { className: "h-7 w-7 text-teal" }),
          t: "Cuisine Afro-Fusion",
          d: "Tapas, attiéké, fruits de mer, snacks — des saveurs locales revisitées."
        }, {
          i: /* @__PURE__ */ jsx(Music, { className: "h-7 w-7 text-coral" }),
          t: "Soirées & DJ Sets",
          d: "DJ sets chaque week-end, soirées thématiques, salsa les jeudis."
        }].map((e, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 30
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.1
        }, className: "bg-white rounded-xl p-7 border-t-[3px] border-t-coral shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all", children: [
          e.i,
          /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl text-graphite mt-4", children: e.t }),
          /* @__PURE__ */ jsx("p", { className: "text-graphite/70 mt-2 text-sm leading-relaxed", children: e.d })
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-white py-20 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "font-accent text-coral text-xl", children: "Agenda" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-graphite text-4xl md:text-5xl mt-2", children: "Prochaines Soirées" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/evenements", className: "inline-flex items-center gap-2 text-coral font-medium hover:gap-3 transition-all", children: [
          "Voir tous les événements ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-5", children: EVENTS.slice(0, 3).map((e) => /* @__PURE__ */ jsxs(Link, { to: "/evenements", className: "group relative h-72 rounded-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsx("img", { src: e.image, alt: e.name, className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-terracotta via-terracotta/70 to-transparent" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 p-5 flex flex-col justify-end", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 bg-coral text-white text-xs px-2.5 py-1 rounded-full", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
              e.date
            ] }),
            /* @__PURE__ */ jsx("span", { className: "bg-teal/90 text-white text-xs px-2.5 py-1 rounded-full", children: e.genre })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl text-white", children: e.name })
        ] })
      ] }, e.id)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-graphite py-20 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsx("p", { className: "font-accent text-amber text-xl", children: "Ambiance" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display text-white text-4xl md:text-5xl mt-2", children: "Aperçu de l'Ambiance" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: ["photo-1470337458703-46ad1756a187", "photo-1514362545857-3bc16c4c7d1b", "photo-1507525428034-b723cf961d3e", "photo-1493676304819-0d7a8d026dcf", "photo-1571266028243-d220c6a6b0d8", "photo-1559737558-2f5a35f4523b", "photo-1504609813442-a8924e83f76e", "photo-1565299624946-b28f40a0ae38"].map((p, i) => /* @__PURE__ */ jsxs("div", { className: `relative overflow-hidden rounded-xl group ${i % 3 === 0 ? "row-span-2 h-[400px]" : "h-48"}`, children: [
        /* @__PURE__ */ jsx("img", { src: `https://images.unsplash.com/${p}?auto=format&fit=crop&w=600&q=70`, alt: "", className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-amber/0 group-hover:bg-amber/70 transition-colors flex items-center justify-center", children: /* @__PURE__ */ jsx(ZoomIn, { className: "h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" }) })
      ] }, p)) }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-10", children: /* @__PURE__ */ jsxs(Link, { to: "/galerie", className: "inline-flex items-center gap-2 rounded-md bg-coral px-6 py-3 text-white font-medium hover:bg-coral/90 transition-colors", children: [
        "Voir la Galerie Complète ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) })
    ] }) })
  ] });
}
export {
  HomePage as component
};
