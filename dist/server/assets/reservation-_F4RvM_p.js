import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Calendar, Waves, Star, Music } from "lucide-react";
import { P as PageTransition } from "./PageTransition-7-UXyMD4.js";
import { W as WaveAnimation } from "./WaveAnimation-hFnD4DPX.js";
import { w as waLink } from "./router-DhGJsJ5T.js";
import "framer-motion";
import "@tanstack/react-query";
import "@tanstack/react-router";
const HOURS = ["17h00", "18h00", "19h00", "20h00", "21h00", "22h00"];
const SIZES = ["1", "2", "3", "4", "5", "6", "7+"];
const OCCASIONS = ["Aucune", "Anniversaire", "Romantique", "Fête d'entreprise", "Autre"];
const Input = (p) => /* @__PURE__ */ jsx("input", { ...p, className: "w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral" });
const Select = ({
  children,
  ...p
}) => /* @__PURE__ */ jsx("select", { ...p, className: "w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral", children });
const Label = ({
  children
}) => /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-graphite mb-1.5", children });
function ReservationPage() {
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const [f, setF] = useState({
    name: "",
    phone: "",
    date: today,
    time: "20h00",
    size: "2",
    occasion: "Aucune",
    message: ""
  });
  const submit = () => {
    if (!f.name || !f.phone) return alert("Merci d'indiquer votre nom et téléphone.");
    const msg = `Bonjour Le Sunset Beach Lounge,
Je souhaite réserver une table.
Nom : ${f.name}
Téléphone : ${f.phone}
Date : ${f.date}
Heure : ${f.time}
Personnes : ${f.size}
Occasion : ${f.occasion}
Message : ${f.message || "—"}
Merci !`;
    window.open(waLink(msg), "_blank");
  };
  return /* @__PURE__ */ jsxs(PageTransition, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative pt-28 pb-20 overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1800&q=70", alt: "", className: "absolute inset-0 w-full h-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-terracotta/85" }),
      /* @__PURE__ */ jsxs("div", { className: "relative text-center px-5", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px w-16 bg-coral mx-auto mb-5" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-white text-5xl md:text-6xl", children: "Réservez Votre Table" }),
        /* @__PURE__ */ jsx("p", { className: "font-accent text-amber text-xl mt-3", children: "À bientôt sur la terrasse" })
      ] }),
      /* @__PURE__ */ jsx(WaveAnimation, { className: "absolute bottom-0 left-0" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-sand py-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-2xl px-5 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-xl p-7 md:p-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Prénom & Nom" }),
          /* @__PURE__ */ jsx(Input, { value: f.name, onChange: (e) => setF({
            ...f,
            name: e.target.value
          }), placeholder: "Ex: Awa Koffi" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Téléphone" }),
          /* @__PURE__ */ jsx(Input, { type: "tel", value: f.phone, onChange: (e) => setF({
            ...f,
            phone: e.target.value
          }), placeholder: "+228 ..." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Date souhaitée" }),
          /* @__PURE__ */ jsx(Input, { type: "date", min: today, value: f.date, onChange: (e) => setF({
            ...f,
            date: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Heure" }),
          /* @__PURE__ */ jsx(Select, { value: f.time, onChange: (e) => setF({
            ...f,
            time: e.target.value
          }), children: HOURS.map((h) => /* @__PURE__ */ jsx("option", { children: h }, h)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Personnes" }),
          /* @__PURE__ */ jsx(Select, { value: f.size, onChange: (e) => setF({
            ...f,
            size: e.target.value
          }), children: SIZES.map((s) => /* @__PURE__ */ jsx("option", { children: s }, s)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Occasion spéciale" }),
          /* @__PURE__ */ jsx(Select, { value: f.occasion, onChange: (e) => setF({
            ...f,
            occasion: e.target.value
          }), children: OCCASIONS.map((o) => /* @__PURE__ */ jsx("option", { children: o }, o)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Message / demandes spéciales" }),
          /* @__PURE__ */ jsx("textarea", { rows: 4, value: f.message, onChange: (e) => setF({
            ...f,
            message: e.target.value
          }), className: "w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: submit, className: "mt-6 w-full inline-flex items-center justify-center gap-2 rounded-md bg-coral text-white py-3.5 font-medium hover:bg-coral/90 transition-colors", children: [
        /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
        " Envoyer la réservation"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-sand pb-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-5 lg:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl text-graphite text-center mb-8", children: "Pourquoi réserver ?" }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-5", children: [{
        i: /* @__PURE__ */ jsx(Waves, { className: "h-7 w-7 text-teal" }),
        t: "Vue Ocean garantie",
        d: "Une table avec vue sur l'Atlantique."
      }, {
        i: /* @__PURE__ */ jsx(Star, { className: "h-7 w-7 text-amber" }),
        t: "Accueil VIP",
        d: "Un accueil personnalisé dès votre arrivée."
      }, {
        i: /* @__PURE__ */ jsx(Music, { className: "h-7 w-7 text-coral" }),
        t: "Soirée inoubliable",
        d: "Cocktails, cuisine, DJ — tout est prêt."
      }].map((c, i) => /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl p-6 text-center border border-[#E8DDD0]", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex p-3 rounded-full bg-sand", children: c.i }),
        /* @__PURE__ */ jsx("h3", { className: "font-display text-xl text-graphite mt-3", children: c.t }),
        /* @__PURE__ */ jsx("p", { className: "text-graphite/70 text-sm mt-1", children: c.d })
      ] }, i)) })
    ] }) })
  ] });
}
export {
  ReservationPage as component
};
