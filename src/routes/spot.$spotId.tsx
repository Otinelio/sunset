import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MessageCircle, Minus, Plus, ShoppingBag, Sun, Trash2, Waves } from "lucide-react";
import { CATEGORIES, MENU } from "../data/menu";
import { fmtFCFA, waLink } from "../lib/constants";
import { useOrders } from "../context/OrdersContext";

export const Route = createFileRoute("/spot/$spotId")({
  head: () => ({
    meta: [
      { title: "Commande Table — Le Sunset" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SpotPage,
});

type Line = { id: string; name: string; qty: number; price: number; image: string };

function SpotPage() {
  const { spotId } = Route.useParams();
  const { add } = useOrders();
  const [active, setActive] = useState(CATEGORIES[0].id);
  const [lines, setLines] = useState<Line[]>([]);
  const [name, setName] = useState("");
  const [people, setPeople] = useState("2");
  const [sent, setSent] = useState(false);

  const items = useMemo(() => MENU.filter((m) => m.category === active), [active]);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  const addItem = (id: string) => {
    const m = MENU.find((x) => x.id === id)!;
    setLines((prev) => {
      const ex = prev.find((p) => p.id === id);
      return ex ? prev.map((p) => p.id === id ? { ...p, qty: p.qty + 1 } : p)
                : [...prev, { id: m.id, name: m.name, qty: 1, price: m.price, image: m.image }];
    });
  };
  const inc = (id: string) => setLines((p) => p.map((l) => l.id === id ? { ...l, qty: l.qty + 1 } : l));
  const dec = (id: string) => setLines((p) => p.flatMap((l) => l.id === id ? (l.qty <= 1 ? [] : [{ ...l, qty: l.qty - 1 }]) : [l]));
  const remove = (id: string) => setLines((p) => p.filter((l) => l.id !== id));

  const send = () => {
    if (!name) return alert("Merci d'indiquer votre prénom.");
    if (lines.length === 0) return;
    add({ spotId, guestName: name, items: lines.map((l) => ({ name: l.name, qty: l.qty, price: l.price })), total });
    const msg = `Bonjour Le Sunset, voici ma commande :\n${lines.map((l) => `- ${l.name} x${l.qty} — ${fmtFCFA(l.price * l.qty)}`).join("\n")}\nTotal : ${fmtFCFA(total)}\nNom : ${name}\nTable : ${spotId}\nMerci !`;
    window.open(waLink(msg), "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center p-5">
        <div className="bg-white rounded-2xl p-10 max-w-md text-center shadow-xl">
          <Sun className="h-16 w-16 text-amber mx-auto" />
          <h1 className="font-display text-3xl text-graphite mt-4">Commande envoyée !</h1>
          <div className="h-px w-12 bg-coral mx-auto my-4" />
          <p className="text-graphite/70">Notre équipe arrive dans quelques minutes à votre table.</p>
          <button onClick={() => { setSent(false); setLines([]); setName(""); }} className="mt-6 inline-flex rounded-md bg-coral text-white px-5 py-2.5 font-medium">Nouvelle commande</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand pb-40">
      <header className="bg-white border-b border-[#E8DDD0] py-4 px-5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Waves className="h-4 w-4 text-coral" />
          <span className="font-accent text-xl text-graphite">LE SUNSET</span>
        </div>
        <span className="bg-coral text-white px-3 py-1.5 rounded-full text-sm font-medium">Table {spotId}</span>
      </header>

      <div className="bg-white border-b border-[#E8DDD0] px-5 py-3 flex gap-1 overflow-x-auto sticky top-[57px] z-20">
        {CATEGORIES.map((c) => (
          <button key={c.id} onClick={() => setActive(c.id)} className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-medium ${active === c.id ? "bg-coral text-white" : "text-graphite hover:text-coral"}`}>{c.label}</button>
        ))}
      </div>

      <div className="p-5 space-y-3 max-w-2xl mx-auto">
        {items.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-[#E8DDD0] p-3 flex gap-3 items-center">
            <img src={m.image} alt={m.name} loading="lazy" className="h-16 w-16 rounded-md object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-display text-graphite">{m.name}</p>
              <p className="text-xs text-graphite/60 italic line-clamp-1">{m.description}</p>
              <span className="inline-block mt-1 bg-coral text-white text-xs px-2 py-0.5 rounded-full">{fmtFCFA(m.price)}</span>
            </div>
            <button onClick={() => addItem(m.id)} className="rounded-md bg-coral text-white px-3 py-2 text-sm font-medium">Ajouter</button>
          </div>
        ))}
      </div>

      {lines.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8DDD0] z-30 shadow-2xl">
          <div className="max-w-2xl mx-auto p-4 space-y-3">
            <div className="max-h-40 overflow-y-auto space-y-2">
              {lines.map((l) => (
                <div key={l.id} className="flex items-center gap-2 text-sm">
                  <span className="flex-1 truncate">{l.name}</span>
                  <button onClick={() => dec(l.id)} className="p-1 bg-sand rounded text-coral"><Minus className="h-3 w-3" /></button>
                  <span className="w-5 text-center">{l.qty}</span>
                  <button onClick={() => inc(l.id)} className="p-1 bg-sand rounded text-coral"><Plus className="h-3 w-3" /></button>
                  <span className="w-20 text-right text-coral font-medium">{fmtFCFA(l.price * l.qty)}</span>
                  <button onClick={() => remove(l.id)} className="text-coral"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Prénom" className="flex-1 bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coral" />
              <select value={people} onChange={(e) => setPeople(e.target.value)} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm">
                {["1","2","3","4","5","6","7+"].map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-graphite"><ShoppingBag className="h-4 w-4" />Total</span>
              <span className="font-display text-2xl text-coral">{fmtFCFA(total)}</span>
            </div>
            <button onClick={send} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-coral text-white py-3 font-medium">
              <MessageCircle className="h-4 w-4" /> Envoyer ma commande
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
