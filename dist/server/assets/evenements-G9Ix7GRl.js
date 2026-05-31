import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useState } from "react";
import { LayoutGrid, List, Calendar, Clock, PersonStanding, Music, Star } from "lucide-react";
import { P as PageTransition } from "./PageTransition-7-UXyMD4.js";
import { E as EVENTS } from "./events-DFdkKy6w.js";
import { w as waLink } from "./router-DhGJsJ5T.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
const genreIcon = (g) => {
  if (g.toLowerCase().includes("salsa")) return /* @__PURE__ */ jsx(PersonStanding, { className: "h-3 w-3" });
  if (g.toLowerCase().includes("dj")) return /* @__PURE__ */ jsx(Music, { className: "h-3 w-3" });
  return /* @__PURE__ */ jsx(Star, { className: "h-3 w-3" });
};
function EventsPage() {
  const [view, setView] = useState("grid");
  return /* @__PURE__ */ jsxs(PageTransition, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative pt-28 pb-16 bg-graphite overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise-overlay opacity-30" }),
      /* @__PURE__ */ jsxs("div", { className: "relative text-center px-5", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-white text-5xl md:text-6xl", children: "Nos Soirées" }),
        /* @__PURE__ */ jsx("p", { className: "font-accent text-amber text-xl mt-3", children: "DJ Sets · Salsa · Soirées Thématiques · Live Music" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-14 bg-offwhite", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1 mb-7", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setView("grid"), className: `p-2 rounded-md ${view === "grid" ? "bg-coral text-white" : "text-graphite hover:bg-sand"}`, children: /* @__PURE__ */ jsx(LayoutGrid, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("button", { onClick: () => setView("list"), className: `p-2 rounded-md ${view === "list" ? "bg-coral text-white" : "text-graphite hover:bg-sand"}`, children: /* @__PURE__ */ jsx(List, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: view === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-4", children: EVENTS.map((e, i) => /* @__PURE__ */ jsxs(motion.article, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.08
      }, className: `relative overflow-hidden rounded-2xl ${view === "grid" ? "h-80" : "h-48"}`, children: [
        /* @__PURE__ */ jsx("img", { src: e.image, alt: e.name, loading: "lazy", className: "absolute inset-0 w-full h-full object-cover" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-terracotta via-terracotta/80 to-terracotta/30" }),
        /* @__PURE__ */ jsxs("div", { className: "relative h-full p-6 flex flex-col justify-end", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 bg-coral text-white text-xs px-3 py-1.5 rounded-full", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
              e.date
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 bg-graphite/60 text-white text-xs px-3 py-1.5 rounded-full", children: [
              /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3" }),
              e.time
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 bg-teal text-white text-xs px-3 py-1.5 rounded-full", children: [
              genreIcon(e.genre),
              e.genre
            ] }),
            /* @__PURE__ */ jsx("span", { className: `text-xs px-3 py-1.5 rounded-full ${e.free ? "bg-amber text-graphite" : "bg-teal text-white"}`, children: e.free ? "Gratuit" : "Sur invitation" })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-display text-white text-2xl md:text-3xl", children: e.name }),
          /* @__PURE__ */ jsx("p", { className: "text-sand/80 text-sm mt-2 max-w-md", children: e.description }),
          /* @__PURE__ */ jsx("a", { href: waLink(`Bonjour, je souhaite réserver pour la soirée ${e.name} le ${e.date}.`), target: "_blank", rel: "noreferrer", className: "mt-4 w-fit inline-flex items-center rounded-md border border-coral text-white bg-coral/20 hover:bg-coral px-4 py-2 text-sm font-medium transition-colors", children: "RSVP" })
        ] })
      ] }, e.id)) })
    ] }) })
  ] });
}
export {
  EventsPage as component
};
