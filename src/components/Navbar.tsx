import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logoDefault from "../images/logo_sunset.png";
import logoScrolled from "../images/logo_sunset1.png";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/menu", label: "Menu" },
  { to: "/evenements", label: "Événements" },
  { to: "/galerie", label: "Galerie" },
  { to: "/reservation", label: "Réservation" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;
  const logoSrc = scrolled ? logoScrolled : logoDefault;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          transparent ? "bg-transparent" : "bg-white/92 backdrop-blur-lg border-b border-[#E8DDD0]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex h-16 lg:h-18 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logoSrc} alt="Logo Sunset" className="h-14 w-auto object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((l) => {
              const active = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative font-body text-sm font-medium transition-colors ${
                    active ? "text-coral" : transparent ? "text-white hover:text-amber" : "text-graphite hover:text-coral"
                  }`}
                >
                  {l.label}
                  {active && (
                    <>
                      <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-amber" />
                      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-amber" />
                    </>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/reservation"
              className="hidden md:inline-flex items-center rounded-md bg-coral px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-coral/90 transition-colors"
            >
              Réserver une Table
            </Link>
            <button
              aria-label="Menu"
              className={`lg:hidden p-2 rounded-md ${transparent ? "text-white" : "text-graphite"}`}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-sand border-b border-[#E8DDD0] lg:hidden shadow-lg"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {NAV.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-3 rounded-md text-base font-medium ${
                    pathname === l.to ? "bg-coral text-white" : "text-graphite hover:bg-white"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/reservation" className="mt-3 text-center rounded-md bg-coral px-4 py-3 text-white font-medium">
                Réserver une Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
