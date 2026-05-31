import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useMemo } from "react";
import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { P as PageTransition } from "./PageTransition-7-UXyMD4.js";
import { u as useCart, f as fmtFCFA, w as waLink } from "./router-DhGJsJ5T.js";
import { W as WaveAnimation } from "./WaveAnimation-hFnD4DPX.js";
import { C as CATEGORIES, M as MENU } from "./menu-Br4KTMK5.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
function CartDrawer() {
  const { state, dispatch, total } = useCart();
  const [name, setName] = useState("");
  const [table, setTable] = useState("");
  const send = () => {
    const lines = state.lines.map((l) => `- ${l.item.name} x${l.qty} — ${fmtFCFA(l.item.price * l.qty)}`).join("\n");
    const msg = `Bonjour Le Sunset, voici ma commande :
${lines}
Total : ${fmtFCFA(total)}
Nom : ${name || "A préciser"}
Table : ${table || "A préciser"}
Merci !`;
    window.open(waLink(msg), "_blank");
    dispatch({ type: "clear" });
    dispatch({ type: "close" });
  };
  return /* @__PURE__ */ jsx(AnimatePresence, { children: state.open && /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 bg-black/40",
        onClick: () => dispatch({ type: "close" })
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.aside,
      {
        initial: { x: "100%" },
        animate: { x: 0 },
        exit: { x: "100%" },
        transition: { type: "tween", duration: 0.3 },
        className: "fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-white border-l border-[#E8DDD0] flex flex-col",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-5 border-b border-[#E8DDD0]", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl text-graphite", children: "Ma Commande" }),
            /* @__PURE__ */ jsx("button", { onClick: () => dispatch({ type: "close" }), className: "text-coral p-1.5 rounded-md hover:bg-sand", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-5 space-y-3", children: state.lines.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-center text-graphite/60 mt-10 font-accent text-xl", children: "Votre commande est vide" }) : state.lines.map((l) => /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center bg-sand rounded-lg p-3", children: [
            /* @__PURE__ */ jsx("img", { src: l.item.image, alt: l.item.name, className: "h-14 w-14 rounded-md object-cover", loading: "lazy" }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("p", { className: "font-display text-graphite text-sm truncate", children: l.item.name }),
              /* @__PURE__ */ jsx("p", { className: "text-coral font-medium text-sm", children: fmtFCFA(l.item.price) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => dispatch({ type: "dec", id: l.item.id }), className: "p-1.5 rounded-md bg-white text-coral border border-[#E8DDD0]", children: /* @__PURE__ */ jsx(Minus, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsx("span", { className: "w-6 text-center text-sm", children: l.qty }),
              /* @__PURE__ */ jsx("button", { onClick: () => dispatch({ type: "inc", id: l.item.id }), className: "p-1.5 rounded-md bg-white text-coral border border-[#E8DDD0]", children: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }) })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => dispatch({ type: "remove", id: l.item.id }), className: "text-coral p-1.5", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }, l.item.id)) }),
          state.lines.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-t border-[#E8DDD0] p-5 space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("span", { className: "font-body text-graphite/70", children: "Total" }),
              /* @__PURE__ */ jsx("span", { className: "font-display text-2xl text-graphite", children: fmtFCFA(total) })
            ] }),
            /* @__PURE__ */ jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Votre nom", className: "w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral" }),
            /* @__PURE__ */ jsx("input", { value: table, onChange: (e) => setTable(e.target.value), placeholder: "N° de table (optionnel)", className: "w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral" }),
            /* @__PURE__ */ jsxs("button", { onClick: send, className: "w-full inline-flex items-center justify-center gap-2 rounded-md bg-coral text-white py-3 font-medium hover:bg-coral/90 transition-colors", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
              " Envoyer via WhatsApp"
            ] })
          ] })
        ]
      }
    )
  ] }) });
}
function ItemCard({
  item
}) {
  const {
    dispatch
  } = useCart();
  return /* @__PURE__ */ jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, className: "bg-white border border-[#E8DDD0] rounded-xl overflow-hidden hover:shadow-xl hover:border-coral transition-all", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative h-44 overflow-hidden bg-sand", children: [
      /* @__PURE__ */ jsx("img", { src: item.image, alt: item.name, loading: "lazy", className: "absolute inset-0 w-full h-full object-cover" }),
      /* @__PURE__ */ jsx("span", { className: "absolute top-3 right-3 bg-coral text-white text-xs font-medium px-2.5 py-1 rounded-full", children: fmtFCFA(item.price) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-display text-graphite text-lg leading-tight", children: item.name }),
      /* @__PURE__ */ jsx("p", { className: "italic text-sm text-graphite/55 mt-1 line-clamp-2", children: item.description }),
      /* @__PURE__ */ jsx("button", { onClick: () => dispatch({
        type: "add",
        item
      }), className: "mt-4 w-full inline-flex items-center justify-center rounded-md border border-coral text-coral py-2 text-sm font-medium hover:bg-coral hover:text-white transition-colors", children: "Commander" })
    ] })
  ] });
}
function MenuPage() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const {
    count,
    dispatch
  } = useCart();
  const items = useMemo(() => MENU.filter((i) => i.category === active), [active]);
  return /* @__PURE__ */ jsxs(PageTransition, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative pt-24 pb-16 bg-graphite overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 noise-overlay opacity-40" }),
      /* @__PURE__ */ jsxs("div", { className: "relative text-center px-5", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px w-16 bg-coral mx-auto mb-5" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-white text-5xl md:text-6xl", children: "Notre Menu" }),
        /* @__PURE__ */ jsx("p", { className: "font-accent text-amber text-xl mt-3", children: "Cocktails · Cuisine · Tapas" })
      ] }),
      /* @__PURE__ */ jsx(WaveAnimation, { className: "absolute bottom-0 left-0" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "sticky top-16 z-30 bg-white border-b border-[#E8DDD0]", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-5 lg:px-8 flex gap-1 overflow-x-auto py-3 scrollbar-hide", children: CATEGORIES.map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setActive(c.id), className: `whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-colors ${active === c.id ? "bg-coral text-white" : "text-graphite hover:text-coral border-b-2 border-transparent hover:border-coral"}`, children: c.label }, c.id)) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16 bg-offwhite", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl text-graphite mb-8", children: CATEGORIES.find((c) => c.id === active)?.label }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: items.map((i) => /* @__PURE__ */ jsx(ItemCard, { item: i }, i.id)) })
    ] }) }),
    count > 0 && /* @__PURE__ */ jsxs("button", { onClick: () => dispatch({
      type: "open"
    }), className: "fixed bottom-24 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-graphite text-white pl-4 pr-5 py-3 shadow-xl hover:bg-graphite/90", children: [
      /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
        count,
        " article",
        count > 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsx(CartDrawer, {})
  ] });
}
export {
  MenuPage as component
};
