import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { MapPin, Clock, Phone, ExternalLink, Share2, Play, Send } from "lucide-react";
import { P as PageTransition } from "./PageTransition-7-UXyMD4.js";
import { B as BRAND, w as waLink } from "./router-DhGJsJ5T.js";
import "framer-motion";
import "@tanstack/react-query";
import "@tanstack/react-router";
function ContactPage() {
  const [f, setF] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const submit = () => {
    if (!f.name || !f.message) return alert("Merci de compléter votre nom et message.");
    const msg = `Bonjour Le Sunset,
Nom : ${f.name}
Email : ${f.email || "—"}
Objet : ${f.subject || "—"}
Message : ${f.message}`;
    window.open(waLink(msg), "_blank");
  };
  return /* @__PURE__ */ jsxs(PageTransition, { children: [
    /* @__PURE__ */ jsxs("section", { className: "pt-28 pb-12 bg-graphite text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-white text-5xl md:text-6xl", children: "Contactez-Nous" }),
      /* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-amber mx-auto mt-4" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "bg-offwhite py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-5 lg:px-8 grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-sand rounded-2xl p-7 border border-[#E8DDD0]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5 text-coral" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-graphite", children: "Nous Trouver" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-4 text-sm text-graphite/85", children: [
          /* @__PURE__ */ jsx("p", { children: BRAND.address }),
          /* @__PURE__ */ jsx("p", { className: "text-graphite/60", children: "À côté de l'Ambassade d'Allemagne" }),
          /* @__PURE__ */ jsxs("p", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-teal flex-shrink-0 mt-0.5" }),
            BRAND.hours
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 text-coral flex-shrink-0 mt-0.5" }),
            "+228 90 00 00 00"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-5", children: [
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Instagram", className: "p-2.5 rounded-md bg-white border border-[#E8DDD0]", children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 text-coral" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Facebook", className: "p-2.5 rounded-md bg-white border border-[#E8DDD0]", children: /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4 text-coral" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "TikTok", className: "p-2.5 rounded-md bg-white border border-[#E8DDD0]", children: /* @__PURE__ */ jsx(Play, { className: "h-4 w-4 text-coral" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 overflow-hidden rounded-xl border border-[#E8DDD0]", children: /* @__PURE__ */ jsx("iframe", { title: "Carte Le Sunset", src: "https://www.google.com/maps?q=Kodjoviakop%C3%A9+Lom%C3%A9+Togo&output=embed", className: "w-full h-64 border-0", loading: "lazy" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl p-7 border border-[#E8DDD0] shadow-sm", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl text-graphite", children: "Envoyer un message" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-4", children: [
          /* @__PURE__ */ jsx("input", { value: f.name, onChange: (e) => setF({
            ...f,
            name: e.target.value
          }), placeholder: "Nom", className: "w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral" }),
          /* @__PURE__ */ jsx("input", { value: f.email, onChange: (e) => setF({
            ...f,
            email: e.target.value
          }), placeholder: "Email", type: "email", className: "w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral" }),
          /* @__PURE__ */ jsx("input", { value: f.subject, onChange: (e) => setF({
            ...f,
            subject: e.target.value
          }), placeholder: "Objet", className: "w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral" }),
          /* @__PURE__ */ jsx("textarea", { rows: 6, value: f.message, onChange: (e) => setF({
            ...f,
            message: e.target.value
          }), placeholder: "Message", className: "w-full bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral" }),
          /* @__PURE__ */ jsxs("button", { onClick: submit, className: "w-full inline-flex items-center justify-center gap-2 rounded-md bg-coral text-white py-3 font-medium hover:bg-coral/90 transition-colors", children: [
            /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
            " Envoyer le message"
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ContactPage as component
};
