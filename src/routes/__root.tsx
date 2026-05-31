import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { CartProvider } from "../context/CartContext";
import { OrdersProvider } from "../context/OrdersContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-offwhite px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display text-graphite">404</h1>
        <p className="mt-4 font-accent text-2xl text-coral">Page introuvable</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-coral px-5 py-2.5 text-white">Retour à l'accueil</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-offwhite px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-display text-graphite">Une erreur est survenue</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-md bg-coral px-5 py-2.5 text-white"
        >Réessayer</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#E85C3A" },
      { title: "Le Sunset Beach Lounge — Rooftop Bar Vue Mer · Lomé, Togo" },
      { name: "description", content: "Rooftop bar, cocktails artisanaux, cuisine afro-fusion et DJ sets face à l'océan à Lomé." },
      { property: "og:title", content: "Le Sunset Beach Lounge — Lomé" },
      { property: "og:description", content: "Chill. Sip. Watch the Sunset." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@1,400;1,600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const bare = location.pathname.startsWith("/spot") || location.pathname.startsWith("/reception") || location.pathname.startsWith("/admin");
  return (
    <QueryClientProvider client={queryClient}>
      <OrdersProvider>
        <CartProvider>
          {!bare && <Navbar />}
          <main className={bare ? "" : "min-h-screen"}><Outlet /></main>
          {!bare && <Footer />}
          {!bare && <FloatingWhatsApp />}
        </CartProvider>
      </OrdersProvider>
    </QueryClientProvider>
  );
}
