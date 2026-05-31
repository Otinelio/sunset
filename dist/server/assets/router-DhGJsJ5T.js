import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useLocation, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState, useEffect, useReducer, createContext, useContext } from "react";
import { Waves, X, Menu, MapPin, Clock, ExternalLink, Share2, Play, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
const appCss = "/assets/styles-CRgpEvGy.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/menu", label: "Menu" },
  { to: "/evenements", label: "Événements" },
  { to: "/galerie", label: "Galerie" },
  { to: "/reservation", label: "Réservation" },
  { to: "/contact", label: "Contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "header",
      {
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent ? "bg-transparent" : "bg-white/92 backdrop-blur-lg border-b border-[#E8DDD0]"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8 flex h-16 lg:h-18 items-center justify-between", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
            /* @__PURE__ */ jsx(Waves, { className: `h-5 w-5 ${transparent ? "text-white" : "text-coral"} transition-colors` }),
            /* @__PURE__ */ jsx("span", { className: `font-accent text-2xl tracking-wide ${transparent ? "text-white" : "text-graphite"}`, children: "LE SUNSET" })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center gap-8", children: NAV.map((l) => {
            const active = pathname === l.to;
            return /* @__PURE__ */ jsxs(
              Link,
              {
                to: l.to,
                className: `relative font-body text-sm font-medium transition-colors ${active ? "text-coral" : transparent ? "text-white hover:text-amber" : "text-graphite hover:text-coral"}`,
                children: [
                  l.label,
                  active && /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx("span", { className: "absolute -bottom-1.5 left-0 right-0 h-[2px] bg-amber" }),
                    /* @__PURE__ */ jsx("span", { className: "absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-amber" })
                  ] })
                ]
              },
              l.to
            );
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/reservation",
                className: "hidden md:inline-flex items-center rounded-md bg-coral px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-coral/90 transition-colors",
                children: "Réserver une Table"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                "aria-label": "Menu",
                className: `lg:hidden p-2 rounded-md ${transparent ? "text-white" : "text-graphite"}`,
                onClick: () => setOpen((o) => !o),
                children: open ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.2 },
        className: "fixed top-16 left-0 right-0 z-40 bg-sand border-b border-[#E8DDD0] lg:hidden shadow-lg",
        children: /* @__PURE__ */ jsxs("div", { className: "px-5 py-6 flex flex-col gap-1", children: [
          NAV.map((l) => /* @__PURE__ */ jsx(
            Link,
            {
              to: l.to,
              className: `px-3 py-3 rounded-md text-base font-medium ${pathname === l.to ? "bg-coral text-white" : "text-graphite hover:bg-white"}`,
              children: l.label
            },
            l.to
          )),
          /* @__PURE__ */ jsx(Link, { to: "/reservation", className: "mt-3 text-center rounded-md bg-coral px-4 py-3 text-white font-medium", children: "Réserver une Table" })
        ] })
      }
    ) })
  ] });
}
const WHATSAPP_NUMBER = "22890000000";
const WA_BASE = `https://wa.me/+${WHATSAPP_NUMBER}`;
const waLink = (msg) => `${WA_BASE}?text=${encodeURIComponent(msg)}`;
const BRAND = {
  tagline: "L'art de vivre en bord de mer.",
  address: "667 Boulevard de la République, Kodjoviakopé, Lomé, Togo",
  hours: "Ouvert tous les jours sauf mardi, à partir de 17h00"
};
const fmtFCFA = (n) => `${n.toLocaleString("fr-FR")} FCFA`;
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-terracotta text-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-5 lg:px-8 py-14 grid gap-10 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Waves, { className: "h-5 w-5 text-amber" }),
          /* @__PURE__ */ jsx("span", { className: "font-accent text-3xl text-white", children: "LE SUNSET" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "font-accent text-amber text-xl mt-3", children: BRAND.tagline })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-display text-lg text-white mb-4", children: "Navigation" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm text-white/85", children: [
          { to: "/", label: "Accueil" },
          { to: "/menu", label: "Menu" },
          { to: "/evenements", label: "Événements" },
          { to: "/galerie", label: "Galerie" },
          { to: "/contact", label: "Contact" }
        ].map((l) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: l.to, className: "hover:text-amber transition-colors", children: l.label }) }, l.to)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-display text-lg text-white mb-4", children: "Nous trouver" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-white/85", children: [
          /* @__PURE__ */ jsxs("p", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 text-coral flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: BRAND.address })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-coral flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsx("span", { children: BRAND.hours })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-4", children: [
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Instagram", className: "p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors", children: /* @__PURE__ */ jsx(ExternalLink, { className: "h-4 w-4 text-coral" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Facebook", className: "p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors", children: /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4 text-coral" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "TikTok", className: "p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors", children: /* @__PURE__ */ jsx(Play, { className: "h-4 w-4 text-coral" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-px w-full bg-amber/70" }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-5 lg:px-8 py-5 text-center text-xs text-sand/70", children: "© 2025 Le Sunset Beach Lounge — Lomé, Togo" })
  ] });
}
function FloatingWhatsApp() {
  const href = waLink("Bonjour, je souhaite avoir des informations sur Le Sunset Beach Lounge.");
  return /* @__PURE__ */ jsxs(
    "a",
    {
      href,
      target: "_blank",
      rel: "noreferrer",
      "aria-label": "Nous contacter sur WhatsApp",
      className: "group fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-xl hover:scale-105 transition-transform",
      children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6" }),
        /* @__PURE__ */ jsx("span", { className: "absolute right-full mr-3 whitespace-nowrap rounded-md bg-graphite px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none", children: "Nous contacter sur WhatsApp" })
      ]
    }
  );
}
const reducer = (s, a) => {
  switch (a.type) {
    case "add": {
      const existing = s.lines.find((l) => l.item.id === a.item.id);
      const lines = existing ? s.lines.map((l) => l.item.id === a.item.id ? { ...l, qty: l.qty + 1 } : l) : [...s.lines, { item: a.item, qty: 1 }];
      return { ...s, lines, open: true };
    }
    case "remove":
      return { ...s, lines: s.lines.filter((l) => l.item.id !== a.id) };
    case "inc":
      return { ...s, lines: s.lines.map((l) => l.item.id === a.id ? { ...l, qty: l.qty + 1 } : l) };
    case "dec":
      return { ...s, lines: s.lines.flatMap((l) => l.item.id === a.id ? l.qty <= 1 ? [] : [{ ...l, qty: l.qty - 1 }] : [l]) };
    case "clear":
      return { ...s, lines: [] };
    case "open":
      return { ...s, open: true };
    case "close":
      return { ...s, open: false };
    case "toggle":
      return { ...s, open: !s.open };
  }
};
const Ctx$1 = createContext(null);
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], open: false });
  const total = state.lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const count = state.lines.reduce((s, l) => s + l.qty, 0);
  return /* @__PURE__ */ jsx(Ctx$1.Provider, { value: { state, dispatch, total, count }, children });
}
const useCart = () => {
  const v = useContext(Ctx$1);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
};
const KEY = "sunset_orders";
const Ctx = createContext(null);
function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const load = () => {
    if (typeof window === "undefined") return;
    try {
      setOrders(JSON.parse(localStorage.getItem(KEY) || "[]"));
    } catch {
      setOrders([]);
    }
  };
  useEffect(() => {
    load();
    const onStorage = () => load();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  const persist = (o) => {
    localStorage.setItem(KEY, JSON.stringify(o));
    setOrders(o);
  };
  const add = (o) => {
    const newOrder = { ...o, id: `o_${Date.now()}`, time: (/* @__PURE__ */ new Date()).toISOString(), status: "En attente" };
    persist([newOrder, ...orders]);
  };
  const setStatus = (id, s) => persist(orders.map((o) => o.id === id ? { ...o, status: s } : o));
  return /* @__PURE__ */ jsx(Ctx.Provider, { value: { orders, add, setStatus, refresh: load }, children });
}
const useOrders = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOrders must be used within OrdersProvider");
  return v;
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-offwhite px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-display text-graphite", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 font-accent text-2xl text-coral", children: "Page introuvable" }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-6 inline-flex rounded-md bg-coral px-5 py-2.5 text-white", children: "Retour à l'accueil" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-offwhite px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-display text-graphite", children: "Une erreur est survenue" }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 rounded-md bg-coral px-5 py-2.5 text-white",
        children: "Réessayer"
      }
    )
  ] }) });
}
const Route$9 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#E85C3A" },
      { title: "Le Sunset Beach Lounge — Rooftop Bar Vue Mer · Lomé, Togo" },
      { name: "description", content: "Rooftop bar, cocktails artisanaux, cuisine afro-fusion et DJ sets face à l'océan à Lomé." },
      { property: "og:title", content: "Le Sunset Beach Lounge — Lomé" },
      { property: "og:description", content: "Chill. Sip. Watch the Sunset." },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$9.useRouteContext();
  const location = useLocation();
  const bare = location.pathname.startsWith("/spot") || location.pathname.startsWith("/reception") || location.pathname.startsWith("/admin");
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(OrdersProvider, { children: /* @__PURE__ */ jsxs(CartProvider, { children: [
    !bare && /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: bare ? "" : "min-h-screen", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    !bare && /* @__PURE__ */ jsx(Footer, {}),
    !bare && /* @__PURE__ */ jsx(FloatingWhatsApp, {})
  ] }) }) });
}
const $$splitComponentImporter$8 = () => import("./reservation-_F4RvM_p.js");
const Route$8 = createFileRoute("/reservation")({
  head: () => ({
    meta: [{
      title: "Réservation — Le Sunset Beach Lounge · Lomé"
    }, {
      name: "description",
      content: "Réservez votre table au Sunset Beach Lounge à Lomé via WhatsApp."
    }, {
      property: "og:title",
      content: "Réservation — Le Sunset Beach Lounge"
    }, {
      property: "og:description",
      content: "Réservez votre table en quelques secondes."
    }, {
      property: "og:url",
      content: "/reservation"
    }],
    links: [{
      rel: "canonical",
      href: "/reservation"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./reception-VSYYn_7p.js");
const Route$7 = createFileRoute("/reception")({
  head: () => ({
    meta: [{
      title: "Réception — Le Sunset"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./menu-C2viq2N4.js");
const Route$6 = createFileRoute("/menu")({
  head: () => ({
    meta: [{
      title: "Menu — Le Sunset Beach Lounge · Lomé"
    }, {
      name: "description",
      content: "Cocktails signature, mocktails, bières, cuisine afro-fusion et tapas — découvrez notre carte."
    }, {
      property: "og:title",
      content: "Menu — Le Sunset Beach Lounge"
    }, {
      property: "og:description",
      content: "Cocktails signature, mocktails, cuisine afro-fusion."
    }, {
      property: "og:url",
      content: "/menu"
    }],
    links: [{
      rel: "canonical",
      href: "/menu"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./galerie-Ci_XUpuZ.js");
const Route$5 = createFileRoute("/galerie")({
  head: () => ({
    meta: [{
      title: "Galerie — Le Sunset Beach Lounge · Lomé"
    }, {
      name: "description",
      content: "Photos d'ambiance, couchers de soleil, cocktails et soirées du Sunset Beach Lounge."
    }, {
      property: "og:title",
      content: "Galerie — Le Sunset Beach Lounge"
    }, {
      property: "og:description",
      content: "Vues, ambiances, cocktails et couchers de soleil."
    }, {
      property: "og:url",
      content: "/galerie"
    }],
    links: [{
      rel: "canonical",
      href: "/galerie"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./evenements-G9Ix7GRl.js");
const Route$4 = createFileRoute("/evenements")({
  head: () => ({
    meta: [{
      title: "Événements — Le Sunset Beach Lounge · Lomé"
    }, {
      name: "description",
      content: "DJ sets, salsa, soirées thématiques et live music au Sunset Beach Lounge."
    }, {
      property: "og:title",
      content: "Événements — Le Sunset Beach Lounge"
    }, {
      property: "og:description",
      content: "Toutes nos soirées et événements à Lomé."
    }, {
      property: "og:url",
      content: "/evenements"
    }],
    links: [{
      rel: "canonical",
      href: "/evenements"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./contact-Bpw_C6bi.js");
const Route$3 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Le Sunset Beach Lounge · Lomé"
    }, {
      name: "description",
      content: "Adresse, horaires et contact du Sunset Beach Lounge à Kodjoviakopé, Lomé, Togo."
    }, {
      property: "og:title",
      content: "Contact — Le Sunset Beach Lounge"
    }, {
      property: "og:description",
      content: "Nous trouver et nous contacter à Lomé."
    }, {
      property: "og:url",
      content: "/contact"
    }],
    links: [{
      rel: "canonical",
      href: "/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin-DFIg_4GR.js");
const Route$2 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Le Sunset"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-B3kjCq6n.js");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Le Sunset Beach Lounge — Rooftop Bar Vue Mer · Lomé, Togo"
    }, {
      name: "description",
      content: "Rooftop, cocktails artisanaux, cuisine afro-fusion et DJ sets face à l'océan Atlantique à Lomé."
    }, {
      property: "og:title",
      content: "Le Sunset Beach Lounge — Lomé, Togo"
    }, {
      property: "og:description",
      content: "Chill. Sip. Watch the Sunset."
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./spot._spotId-B_1ZHs4-.js");
const Route = createFileRoute("/spot/$spotId")({
  head: () => ({
    meta: [{
      title: "Commande Table — Le Sunset"
    }, {
      name: "robots",
      content: "noindex"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ReservationRoute = Route$8.update({
  id: "/reservation",
  path: "/reservation",
  getParentRoute: () => Route$9
});
const ReceptionRoute = Route$7.update({
  id: "/reception",
  path: "/reception",
  getParentRoute: () => Route$9
});
const MenuRoute = Route$6.update({
  id: "/menu",
  path: "/menu",
  getParentRoute: () => Route$9
});
const GalerieRoute = Route$5.update({
  id: "/galerie",
  path: "/galerie",
  getParentRoute: () => Route$9
});
const EvenementsRoute = Route$4.update({
  id: "/evenements",
  path: "/evenements",
  getParentRoute: () => Route$9
});
const ContactRoute = Route$3.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$9
});
const AdminRoute = Route$2.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$9
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const SpotSpotIdRoute = Route.update({
  id: "/spot/$spotId",
  path: "/spot/$spotId",
  getParentRoute: () => Route$9
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  ContactRoute,
  EvenementsRoute,
  GalerieRoute,
  MenuRoute,
  ReceptionRoute,
  ReservationRoute,
  SpotSpotIdRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  BRAND as B,
  Route as R,
  useOrders as a,
  fmtFCFA as f,
  router as r,
  useCart as u,
  waLink as w
};
