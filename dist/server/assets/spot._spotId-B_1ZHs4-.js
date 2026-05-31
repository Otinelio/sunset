import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Sun, Waves, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { C as CATEGORIES, M as MENU } from "./menu-Br4KTMK5.js";
import { R as Route, a as useOrders, f as fmtFCFA, w as waLink } from "./router-DhGJsJ5T.js";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "framer-motion";
function SpotPage() {
  const {
    spotId
  } = Route.useParams();
  const {
    add
  } = useOrders();
  const [active, setActive] = useState(CATEGORIES[0].id);
  const [lines, setLines] = useState([]);
  const [name, setName] = useState("");
  const [people, setPeople] = useState("2");
  const [sent, setSent] = useState(false);
  const items = useMemo(() => MENU.filter((m) => m.category === active), [active]);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const addItem = (id) => {
    const m = MENU.find((x) => x.id === id);
    setLines((prev) => {
      const ex = prev.find((p) => p.id === id);
      return ex ? prev.map((p) => p.id === id ? {
        ...p,
        qty: p.qty + 1
      } : p) : [...prev, {
        id: m.id,
        name: m.name,
        qty: 1,
        price: m.price,
        image: m.image
      }];
    });
  };
  const inc = (id) => setLines((p) => p.map((l) => l.id === id ? {
    ...l,
    qty: l.qty + 1
  } : l));
  const dec = (id) => setLines((p) => p.flatMap((l) => l.id === id ? l.qty <= 1 ? [] : [{
    ...l,
    qty: l.qty - 1
  }] : [l]));
  const remove = (id) => setLines((p) => p.filter((l) => l.id !== id));
  const send = () => {
    if (!name) return alert("Merci d'indiquer votre prénom.");
    if (lines.length === 0) return;
    add({
      spotId,
      guestName: name,
      items: lines.map((l) => ({
        name: l.name,
        qty: l.qty,
        price: l.price
      })),
      total
    });
    const msg = `Bonjour Le Sunset, voici ma commande :
${lines.map((l) => `- ${l.name} x${l.qty} — ${fmtFCFA(l.price * l.qty)}`).join("\n")}
Total : ${fmtFCFA(total)}
Nom : ${name}
Table : ${spotId}
Merci !`;
    window.open(waLink(msg), "_blank");
    setSent(true);
  };
  if (sent) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-sand flex items-center justify-center p-5", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-10 max-w-md text-center shadow-xl", children: [
      /* @__PURE__ */ jsx(Sun, { className: "h-16 w-16 text-amber mx-auto" }),
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl text-graphite mt-4", children: "Commande envoyée !" }),
      /* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-coral mx-auto my-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-graphite/70", children: "Notre équipe arrive dans quelques minutes à votre table." }),
      /* @__PURE__ */ jsx("button", { onClick: () => {
        setSent(false);
        setLines([]);
        setName("");
      }, className: "mt-6 inline-flex rounded-md bg-coral text-white px-5 py-2.5 font-medium", children: "Nouvelle commande" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-sand pb-40", children: [
    /* @__PURE__ */ jsxs("header", { className: "bg-white border-b border-[#E8DDD0] py-4 px-5 flex items-center justify-between sticky top-0 z-30", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Waves, { className: "h-4 w-4 text-coral" }),
        /* @__PURE__ */ jsx("span", { className: "font-accent text-xl text-graphite", children: "LE SUNSET" })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "bg-coral text-white px-3 py-1.5 rounded-full text-sm font-medium", children: [
        "Table ",
        spotId
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white border-b border-[#E8DDD0] px-5 py-3 flex gap-1 overflow-x-auto sticky top-[57px] z-20", children: CATEGORIES.map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setActive(c.id), className: `whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-medium ${active === c.id ? "bg-coral text-white" : "text-graphite hover:text-coral"}`, children: c.label }, c.id)) }),
    /* @__PURE__ */ jsx("div", { className: "p-5 space-y-3 max-w-2xl mx-auto", children: items.map((m) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-[#E8DDD0] p-3 flex gap-3 items-center", children: [
      /* @__PURE__ */ jsx("img", { src: m.image, alt: m.name, loading: "lazy", className: "h-16 w-16 rounded-md object-cover" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "font-display text-graphite", children: m.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-graphite/60 italic line-clamp-1", children: m.description }),
        /* @__PURE__ */ jsx("span", { className: "inline-block mt-1 bg-coral text-white text-xs px-2 py-0.5 rounded-full", children: fmtFCFA(m.price) })
      ] }),
      /* @__PURE__ */ jsx("button", { onClick: () => addItem(m.id), className: "rounded-md bg-coral text-white px-3 py-2 text-sm font-medium", children: "Ajouter" })
    ] }, m.id)) }),
    lines.length > 0 && /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8DDD0] z-30 shadow-2xl", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto p-4 space-y-3", children: [
      /* @__PURE__ */ jsx("div", { className: "max-h-40 overflow-y-auto space-y-2", children: lines.map((l) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "flex-1 truncate", children: l.name }),
        /* @__PURE__ */ jsx("button", { onClick: () => dec(l.id), className: "p-1 bg-sand rounded text-coral", children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsx("span", { className: "w-5 text-center", children: l.qty }),
        /* @__PURE__ */ jsx("button", { onClick: () => inc(l.id), className: "p-1 bg-sand rounded text-coral", children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsx("span", { className: "w-20 text-right text-coral font-medium", children: fmtFCFA(l.price * l.qty) }),
        /* @__PURE__ */ jsx("button", { onClick: () => remove(l.id), className: "text-coral", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] }, l.id)) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsx("input", { value: name, onChange: (e) => setName(e.target.value), placeholder: "Prénom", className: "flex-1 bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coral" }),
        /* @__PURE__ */ jsx("select", { value: people, onChange: (e) => setPeople(e.target.value), className: "bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm", children: ["1", "2", "3", "4", "5", "6", "7+"].map((s) => /* @__PURE__ */ jsx("option", { children: s }, s)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-graphite", children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" }),
          "Total"
        ] }),
        /* @__PURE__ */ jsx("span", { className: "font-display text-2xl text-coral", children: fmtFCFA(total) })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: send, className: "w-full inline-flex items-center justify-center gap-2 rounded-md bg-coral text-white py-3 font-medium", children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
        " Envoyer ma commande"
      ] })
    ] }) })
  ] });
}
export {
  SpotPage as component
};
