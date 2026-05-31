import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, useMemo } from "react";
import { Waves, Clock, Check, CheckCheck, X } from "lucide-react";
import { P as PinGate } from "./PinGate-CVc18c4g.js";
import { a as useOrders, f as fmtFCFA } from "./router-DhGJsJ5T.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "framer-motion";
const STATUS_DOT = {
  "En attente": "bg-amber",
  "Confirmée": "bg-teal",
  "Servie": "bg-[#22C55E]",
  "Annulée": "bg-[#EF4444]"
};
function useChime() {
  const ctxRef = useRef(null);
  return () => {
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = ctxRef.current;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = 880;
      o.type = "sine";
      g.gain.value = 1e-4;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + 0.4);
      o.stop(ctx.currentTime + 0.45);
    } catch {
    }
  };
}
function ReceptionDashboard() {
  const {
    orders,
    setStatus,
    refresh
  } = useOrders();
  const [now, setNow] = useState(/* @__PURE__ */ new Date());
  const lastCount = useRef(orders.length);
  const chime = useChime();
  useEffect(() => {
    const t = setInterval(() => {
      setNow(/* @__PURE__ */ new Date());
      refresh();
    }, 5e3);
    const t2 = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
    return () => {
      clearInterval(t);
      clearInterval(t2);
    };
  }, [refresh]);
  useEffect(() => {
    if (orders.length > lastCount.current) chime();
    lastCount.current = orders.length;
  }, [orders.length, chime]);
  const today = (/* @__PURE__ */ new Date()).toDateString();
  const todayOrders = orders.filter((o) => new Date(o.time).toDateString() === today);
  const pending = todayOrders.filter((o) => o.status === "En attente").length;
  const served = todayOrders.filter((o) => o.status === "Servie").length;
  const topItem = useMemo(() => {
    const counts = {};
    todayOrders.forEach((o) => o.items.forEach((it) => {
      counts[it.name] = (counts[it.name] || 0) + it.qty;
    }));
    return Object.entries(counts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "—";
  }, [todayOrders]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-offwhite flex", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden md:flex flex-col w-60 bg-white border-r border-[#E8DDD0] p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsx(Waves, { className: "h-5 w-5 text-coral" }),
        /* @__PURE__ */ jsx("span", { className: "font-accent text-xl text-graphite", children: "LE SUNSET" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "space-y-1 text-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-md bg-sand text-graphite", children: [
        /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-coral" }),
        " Commandes"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 p-5 md:p-8", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex items-end justify-between flex-wrap gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl text-graphite", children: "Tableau de Réception" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-graphite/60 font-mono", children: now.toLocaleString("fr-FR") })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6", children: [
        /* @__PURE__ */ jsx(Stat, { label: "Total commandes", value: todayOrders.length, color: "text-coral" }),
        /* @__PURE__ */ jsx(Stat, { label: "En attente", value: pending, color: "text-amber" }),
        /* @__PURE__ */ jsx(Stat, { label: "Servies", value: served, color: "text-teal" }),
        /* @__PURE__ */ jsx(Stat, { label: "Article phare", value: topItem, color: "text-graphite", small: true })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
        orders.length === 0 && /* @__PURE__ */ jsx("p", { className: "col-span-full text-center text-graphite/50 py-12 font-accent text-xl", children: "Aucune commande pour le moment" }),
        orders.map((o) => /* @__PURE__ */ jsx(OrderCard, { order: o, onSet: (s) => setStatus(o.id, s) }, o.id))
      ] })
    ] })
  ] });
}
function Stat({
  label,
  value,
  color,
  small
}) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-sand rounded-xl p-4 border border-[#E8DDD0]", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs text-graphite/60", children: label }),
    /* @__PURE__ */ jsx("p", { className: `font-display ${small ? "text-lg" : "text-3xl"} ${color} mt-1 truncate`, children: value })
  ] });
}
function OrderCard({
  order,
  onSet
}) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-[#E8DDD0] p-4 space-y-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("span", { className: "bg-coral text-white text-xs px-2.5 py-1 rounded-full", children: [
        "Table ",
        order.spotId
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-teal flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3" }),
        new Date(order.time).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit"
        })
      ] })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-display text-graphite text-lg", children: order.guestName }),
    /* @__PURE__ */ jsx("ul", { className: "text-sm text-graphite/70 space-y-0.5", children: order.items.map((it, i) => /* @__PURE__ */ jsxs("li", { children: [
      it.name,
      " × ",
      it.qty
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("span", { className: "text-coral font-bold", children: fmtFCFA(order.total) }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: `h-2 w-2 rounded-full ${STATUS_DOT[order.status]}` }),
        order.status
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => onSet("Confirmée"), className: "flex-1 inline-flex items-center justify-center gap-1 text-xs border border-teal text-teal rounded-md py-1.5 hover:bg-teal hover:text-white transition-colors", children: [
        /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }),
        "Confirmer"
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => onSet("Servie"), className: "flex-1 inline-flex items-center justify-center gap-1 text-xs bg-coral text-white rounded-md py-1.5 hover:bg-coral/90", children: [
        /* @__PURE__ */ jsx(CheckCheck, { className: "h-3 w-3" }),
        "Servie"
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => onSet("Annulée"), className: "inline-flex items-center justify-center text-xs border border-graphite/30 text-graphite/60 rounded-md px-2 py-1.5 hover:bg-graphite/10", children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" }) })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(PinGate, { pin: "2025", label: "Accès Réception", children: /* @__PURE__ */ jsx(ReceptionDashboard, {}) });
export {
  SplitComponent as component
};
