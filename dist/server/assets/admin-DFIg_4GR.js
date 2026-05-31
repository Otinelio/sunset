import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Waves, UtensilsCrossed, Calendar, ShoppingBag, QrCode, Settings, Trash2, Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { P as PinGate } from "./PinGate-CVc18c4g.js";
import { C as CATEGORIES, M as MENU } from "./menu-Br4KTMK5.js";
import { E as EVENTS } from "./events-DFdkKy6w.js";
import { f as fmtFCFA, a as useOrders } from "./router-DhGJsJ5T.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "framer-motion";
const TABS = [{
  id: "menu",
  label: "Menu",
  i: /* @__PURE__ */ jsx(UtensilsCrossed, { className: "h-4 w-4" })
}, {
  id: "events",
  label: "Événements",
  i: /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" })
}, {
  id: "orders",
  label: "Historique",
  i: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" })
}, {
  id: "qr",
  label: "QR Code",
  i: /* @__PURE__ */ jsx(QrCode, { className: "h-4 w-4" })
}, {
  id: "settings",
  label: "Paramètres",
  i: /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" })
}];
function useStored(key, initial) {
  const [v, setV] = useState(initial);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const s = localStorage.getItem(key);
      if (s) setV(JSON.parse(s));
    } catch {
    }
  }, [key]);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(v));
  }, [key, v]);
  return [v, setV];
}
function AdminDashboard() {
  const [tab, setTab] = useState("menu");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-offwhite flex", children: [
    /* @__PURE__ */ jsxs("aside", { className: "hidden md:flex flex-col w-60 bg-white border-r border-[#E8DDD0] p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsx(Waves, { className: "h-5 w-5 text-coral" }),
        /* @__PURE__ */ jsx("span", { className: "font-accent text-xl text-graphite", children: "LE SUNSET" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "space-y-1 text-sm", children: TABS.map((t) => /* @__PURE__ */ jsxs("button", { onClick: () => setTab(t.id), className: `w-full flex items-center gap-2 px-3 py-2 rounded-md text-left ${tab === t.id ? "bg-sand text-graphite" : "text-graphite/70 hover:bg-sand/60"}`, children: [
        tab === t.id && /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-coral" }),
        t.i,
        t.label
      ] }, t.id)) })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1 p-5 md:p-8 max-w-full overflow-x-hidden", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl text-graphite mb-6", children: TABS.find((t) => t.id === tab)?.label }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden flex gap-1 overflow-x-auto mb-5", children: TABS.map((t) => /* @__PURE__ */ jsx("button", { onClick: () => setTab(t.id), className: `whitespace-nowrap px-3 py-1.5 rounded-md text-xs ${tab === t.id ? "bg-coral text-white" : "bg-white border border-[#E8DDD0] text-graphite"}`, children: t.label }, t.id)) }),
      tab === "menu" && /* @__PURE__ */ jsx(MenuMgmt, {}),
      tab === "events" && /* @__PURE__ */ jsx(EventsMgmt, {}),
      tab === "orders" && /* @__PURE__ */ jsx(OrdersHistory, {}),
      tab === "qr" && /* @__PURE__ */ jsx(QRGenerator, {}),
      tab === "settings" && /* @__PURE__ */ jsx(SettingsPanel, {})
    ] })
  ] });
}
function MenuMgmt() {
  const [items, setItems] = useStored("sunset_menu", MENU);
  const [draft, setDraft] = useState({
    category: "cocktails"
  });
  const add = () => {
    if (!draft.name || !draft.price) return;
    setItems([...items, {
      id: `n_${Date.now()}`,
      name: draft.name,
      description: draft.description || "",
      price: Number(draft.price),
      category: draft.category || "cocktails",
      image: draft.image || "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=70"
    }]);
    setDraft({
      category: "cocktails"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-5 rounded-xl border border-[#E8DDD0] grid sm:grid-cols-2 lg:grid-cols-5 gap-3", children: [
      /* @__PURE__ */ jsx("input", { placeholder: "Nom", value: draft.name || "", onChange: (e) => setDraft({
        ...draft,
        name: e.target.value
      }), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Description", value: draft.description || "", onChange: (e) => setDraft({
        ...draft,
        description: e.target.value
      }), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Prix FCFA", value: draft.price || "", onChange: (e) => setDraft({
        ...draft,
        price: Number(e.target.value)
      }), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("select", { value: draft.category, onChange: (e) => setDraft({
        ...draft,
        category: e.target.value
      }), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm", children: CATEGORIES.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.label }, c.id)) }),
      /* @__PURE__ */ jsx("button", { onClick: add, className: "rounded-md bg-coral text-white py-2 text-sm font-medium", children: "Ajouter" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3", children: items.map((m) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-[#E8DDD0] p-3 flex gap-3", children: [
      /* @__PURE__ */ jsx("img", { src: m.image, alt: m.name, className: "h-16 w-16 rounded-md object-cover" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "font-display text-graphite truncate", children: m.name }),
        /* @__PURE__ */ jsx("p", { className: "text-coral font-medium text-sm", children: fmtFCFA(m.price) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mt-1", children: /* @__PURE__ */ jsxs("label", { className: "text-xs flex items-center gap-1 text-graphite/70", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: !!m.unavailable, onChange: (e) => setItems(items.map((i) => i.id === m.id ? {
            ...i,
            unavailable: e.target.checked
          } : i)), className: "accent-amber" }),
          "Indisponible"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => setItems(items.filter((i) => i.id !== m.id)), className: "text-coral self-start", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
    ] }, m.id)) })
  ] });
}
function EventsMgmt() {
  const [items, setItems] = useStored("sunset_events", EVENTS);
  const [draft, setDraft] = useState({
    free: true
  });
  const add = () => {
    if (!draft.name || !draft.date) return;
    setItems([...items, {
      id: `e_${Date.now()}`,
      name: draft.name,
      date: draft.date,
      time: draft.time || "21h00",
      genre: draft.genre || "DJ Set",
      description: draft.description || "",
      free: !!draft.free,
      image: draft.image || "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?auto=format&fit=crop&w=1000&q=70"
    }]);
    setDraft({
      free: true
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-5 rounded-xl border border-[#E8DDD0] grid sm:grid-cols-2 lg:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsx("input", { placeholder: "Nom", value: draft.name || "", onChange: (e) => setDraft({
        ...draft,
        name: e.target.value
      }), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Date", value: draft.date || "", onChange: (e) => setDraft({
        ...draft,
        date: e.target.value
      }), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Heure", value: draft.time || "", onChange: (e) => setDraft({
        ...draft,
        time: e.target.value
      }), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Genre", value: draft.genre || "", onChange: (e) => setDraft({
        ...draft,
        genre: e.target.value
      }), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Description", value: draft.description || "", onChange: (e) => setDraft({
        ...draft,
        description: e.target.value
      }), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm sm:col-span-2" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Image URL", value: draft.image || "", onChange: (e) => setDraft({
        ...draft,
        image: e.target.value
      }), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" }),
      /* @__PURE__ */ jsx("button", { onClick: add, className: "rounded-md bg-coral text-white py-2 text-sm font-medium", children: "Créer" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3", children: items.map((e) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-[#E8DDD0] overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: e.image, alt: e.name, className: "h-32 w-full object-cover" }),
      /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
        /* @__PURE__ */ jsx("p", { className: "font-display text-graphite", children: e.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-graphite/60", children: [
          e.date,
          " · ",
          e.time,
          " · ",
          e.genre
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: () => setItems(items.filter((i) => i.id !== e.id)), className: "mt-2 text-xs text-coral flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }),
          "Supprimer"
        ] })
      ] })
    ] }, e.id)) })
  ] });
}
function OrdersHistory() {
  const {
    orders
  } = useOrders();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-2 flex-wrap", children: ["all", "En attente", "Confirmée", "Servie", "Annulée"].map((s) => /* @__PURE__ */ jsx("button", { onClick: () => setFilter(s), className: `px-3 py-1.5 rounded-full text-xs ${filter === s ? "bg-coral text-white" : s === "En attente" ? "bg-amber/30 text-graphite" : s === "Confirmée" ? "bg-teal/20 text-teal" : "bg-white border border-[#E8DDD0]"}`, children: s === "all" ? "Toutes" : s }, s)) }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-[#E8DDD0] divide-y divide-[#E8DDD0]", children: [
      filtered.length === 0 && /* @__PURE__ */ jsx("p", { className: "p-6 text-center text-graphite/50", children: "Aucune commande" }),
      filtered.map((o) => /* @__PURE__ */ jsxs("div", { className: "p-4 flex flex-wrap gap-3 items-center", children: [
        /* @__PURE__ */ jsxs("span", { className: "bg-coral text-white text-xs px-2 py-0.5 rounded-full", children: [
          "Table ",
          o.spotId
        ] }),
        /* @__PURE__ */ jsx("span", { className: "font-display text-graphite", children: o.guestName }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-graphite/60", children: new Date(o.time).toLocaleString("fr-FR") }),
        /* @__PURE__ */ jsx("span", { className: "text-sm text-graphite/70", children: o.items.map((i) => `${i.name} ×${i.qty}`).join(", ") }),
        /* @__PURE__ */ jsx("span", { className: "ml-auto text-coral font-bold", children: fmtFCFA(o.total) }),
        /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-sand", children: o.status })
      ] }, o.id))
    ] })
  ] });
}
function QRGenerator() {
  const [table, setTable] = useState("1");
  const [origin, setOrigin] = useState("");
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const url = `${origin}/spot/${table}`;
  const download = () => {
    const canvas = document.querySelector("#qrcanvas canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `table-${table}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-md bg-white p-6 rounded-xl border border-[#E8DDD0] space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-graphite", children: "Numéro de table" }),
      /* @__PURE__ */ jsx("input", { value: table, onChange: (e) => setTable(e.target.value), className: "mt-1 w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" })
    ] }),
    /* @__PURE__ */ jsx("div", { id: "qrcanvas", className: "flex justify-center p-4 bg-sand rounded-xl", children: /* @__PURE__ */ jsx(QRCodeCanvas, { value: url, size: 220, fgColor: "#1C1C1C", bgColor: "#F8EDE0" }) }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-graphite/60 text-center break-all", children: url }),
    /* @__PURE__ */ jsxs("button", { onClick: download, className: "w-full inline-flex items-center justify-center gap-2 rounded-md bg-coral text-white py-2.5 font-medium", children: [
      /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
      "Télécharger"
    ] })
  ] });
}
function SettingsPanel() {
  const [s, setS] = useStored("sunset_settings", {
    whatsapp: "+22890000000",
    hours: "Ouvert tous les jours sauf mardi, à partir de 17h00",
    pin: "sunset2025"
  });
  return /* @__PURE__ */ jsxs("div", { className: "max-w-xl bg-white p-6 rounded-xl border border-[#E8DDD0] space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-graphite", children: "Numéro WhatsApp" }),
      /* @__PURE__ */ jsx("input", { value: s.whatsapp, onChange: (e) => setS({
        ...s,
        whatsapp: e.target.value
      }), className: "mt-1 w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-graphite", children: "Horaires" }),
      /* @__PURE__ */ jsx("input", { value: s.hours, onChange: (e) => setS({
        ...s,
        hours: e.target.value
      }), className: "mt-1 w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "text-sm font-medium text-graphite", children: "Code admin" }),
      /* @__PURE__ */ jsx("input", { value: s.pin, onChange: (e) => setS({
        ...s,
        pin: e.target.value
      }), className: "mt-1 w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-xs text-graphite/60", children: [
      "Note : ces valeurs sont stockées localement. Pour les appliquer côté code, mettez à jour ",
      /* @__PURE__ */ jsx("code", { children: "src/lib/constants.ts" }),
      "."
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(PinGate, { pin: "sunset2025", label: "Accès Admin", children: /* @__PURE__ */ jsx(AdminDashboard, {}) });
export {
  SplitComponent as component
};
