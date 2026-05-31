import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { PageTransition } from "../components/PageTransition";
import { CartDrawer } from "../components/CartDrawer";
import { WaveAnimation } from "../components/WaveAnimation";
import { CATEGORIES, MENU, type MenuItem } from "../data/menu";
import { useCart } from "../context/CartContext";
import { fmtFCFA } from "../lib/constants";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Le Sunset Beach Lounge · Lomé" },
      { name: "description", content: "Cocktails signature, mocktails, bières, cuisine afro-fusion et tapas — découvrez notre carte." },
      { property: "og:title", content: "Menu — Le Sunset Beach Lounge" },
      { property: "og:description", content: "Cocktails signature, mocktails, cuisine afro-fusion." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function ItemCard({ item }: { item: MenuItem }) {
  const { dispatch } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="bg-white border border-[#E8DDD0] rounded-xl overflow-hidden hover:shadow-xl hover:border-coral transition-all"
    >
      <div className="relative h-44 overflow-hidden bg-sand">
        <img src={item.image} alt={item.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        <span className="absolute top-3 right-3 bg-coral text-white text-xs font-medium px-2.5 py-1 rounded-full">{fmtFCFA(item.price)}</span>
      </div>
      <div className="p-4">
        <h3 className="font-display text-graphite text-lg leading-tight">{item.name}</h3>
        <p className="italic text-sm text-graphite/55 mt-1 line-clamp-2">{item.description}</p>
        <button
          onClick={() => dispatch({ type: "add", item })}
          className="mt-4 w-full inline-flex items-center justify-center rounded-md border border-coral text-coral py-2 text-sm font-medium hover:bg-coral hover:text-white transition-colors"
        >Commander</button>
      </div>
    </motion.div>
  );
}

function MenuPage() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const { count, dispatch } = useCart();
  const items = useMemo(() => MENU.filter((i) => i.category === active), [active]);

  return (
    <PageTransition>
      <section className="relative pt-24 pb-16 bg-graphite overflow-hidden">
        <div className="absolute inset-0 noise-overlay opacity-40" />
        <div className="relative text-center px-5">
          <div className="h-px w-16 bg-coral mx-auto mb-5" />
          <h1 className="font-display text-white text-5xl md:text-6xl">Notre Menu</h1>
          <p className="font-accent text-amber text-xl mt-3">Cocktails · Cuisine · Tapas</p>
        </div>
        <WaveAnimation className="absolute bottom-0 left-0" />
      </section>

      <div className="sticky top-16 z-30 bg-white border-b border-[#E8DDD0]">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 flex gap-1 overflow-x-auto py-3 scrollbar-hide">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                active === c.id ? "bg-coral text-white" : "text-graphite hover:text-coral border-b-2 border-transparent hover:border-coral"
              }`}
            >{c.label}</button>
          ))}
        </div>
      </div>

      <section className="py-16 bg-offwhite">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-3xl text-graphite mb-8">{CATEGORIES.find((c) => c.id === active)?.label}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((i) => <ItemCard key={i.id} item={i} />)}
          </div>
        </div>
      </section>

      {count > 0 && (
        <button
          onClick={() => dispatch({ type: "open" })}
          className="fixed bottom-24 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-graphite text-white pl-4 pr-5 py-3 shadow-xl hover:bg-graphite/90"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="text-sm font-medium">{count} article{count > 1 ? "s" : ""}</span>
        </button>
      )}

      <CartDrawer />
    </PageTransition>
  );
}
