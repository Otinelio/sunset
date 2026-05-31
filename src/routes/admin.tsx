import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, Download, QrCode, Settings, ShoppingBag, Trash2, UtensilsCrossed, Waves } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { PinGate } from "../components/PinGate";
import { MENU as INITIAL_MENU, type MenuItem, CATEGORIES } from "../data/menu";
import { EVENTS as INITIAL_EVENTS, type EventItem } from "../data/events";
import { useOrders } from "../context/OrdersContext";
import { fmtFCFA } from "../lib/constants";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Le Sunset" }, { name: "robots", content: "noindex" }] }),
  component: () => <PinGate pin="9999" label="Accès Admin"><AdminDashboard /></PinGate>,
});

type Tab = "menu" | "events" | "orders" | "qr" | "settings";

const TABS: { id: Tab; label: string; i: any }[] = [
  { id: "menu", label: "Menu", i: <UtensilsCrossed className="h-4 w-4" /> },
  { id: "events", label: "Événements", i: <Calendar className="h-4 w-4" /> },
  { id: "orders", label: "Historique", i: <ShoppingBag className="h-4 w-4" /> },
  { id: "qr", label: "QR Code", i: <QrCode className="h-4 w-4" /> },
  { id: "settings", label: "Paramètres", i: <Settings className="h-4 w-4" /> },
];

function useStored<T>(key: string, initial: T) {
  const [v, setV] = useState<T>(initial);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { const s = localStorage.getItem(key); if (s) setV(JSON.parse(s)); } catch { }
  }, [key]);
  useEffect(() => { if (typeof window !== "undefined") localStorage.setItem(key, JSON.stringify(v)); }, [key, v]);
  return [v, setV] as const;
}

function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("menu");

  return (
    <div className="min-h-screen bg-offwhite flex">
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-[#E8DDD0] p-5">
        <div className="flex items-center gap-2 mb-8">
          <Waves className="h-5 w-5 text-coral" />
          <span className="font-accent text-xl text-graphite">LE SUNSET</span>
        </div>
        <nav className="space-y-1 text-sm">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-left ${tab === t.id ? "bg-sand text-graphite" : "text-graphite/70 hover:bg-sand/60"}`}>
              {tab === t.id && <span className="h-1.5 w-1.5 rounded-full bg-coral" />}
              {t.i}{t.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-8 max-w-full overflow-x-hidden">
        <h1 className="font-display text-3xl text-graphite mb-6">{TABS.find((t) => t.id === tab)?.label}</h1>
        <div className="md:hidden flex gap-1 overflow-x-auto mb-5">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs ${tab === t.id ? "bg-coral text-white" : "bg-white border border-[#E8DDD0] text-graphite"}`}>{t.label}</button>
          ))}
        </div>
        {tab === "menu" && <MenuMgmt />}
        {tab === "events" && <EventsMgmt />}
        {tab === "orders" && <OrdersHistory />}
        {tab === "qr" && <QRGenerator />}
        {tab === "settings" && <SettingsPanel />}
      </main>
    </div>
  );
}

function MenuMgmt() {
  const [items, setItems] = useStored<(MenuItem & { unavailable?: boolean })[]>("sunset_menu", INITIAL_MENU);
  const [draft, setDraft] = useState<Partial<MenuItem>>({ category: "cocktails" });
  const add = () => {
    if (!draft.name || !draft.price) return;
    setItems([...items, { id: `n_${Date.now()}`, name: draft.name!, description: draft.description || "", price: Number(draft.price), category: draft.category || "cocktails", image: draft.image || "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=70" }]);
    setDraft({ category: "cocktails" });
  };
  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-xl border border-[#E8DDD0] grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <input placeholder="Nom" value={draft.name || ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
        <input placeholder="Description" value={draft.description || ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
        <input type="number" placeholder="Prix FCFA" value={draft.price || ""} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
        <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm">
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <button onClick={add} className="rounded-md bg-coral text-white py-2 text-sm font-medium">Ajouter</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-[#E8DDD0] p-3 flex gap-3">
            <img src={m.image} alt={m.name} className="h-16 w-16 rounded-md object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-display text-graphite truncate">{m.name}</p>
              <p className="text-coral font-medium text-sm">{fmtFCFA(m.price)}</p>
              <div className="flex items-center gap-2 mt-1">
                <label className="text-xs flex items-center gap-1 text-graphite/70">
                  <input type="checkbox" checked={!!m.unavailable} onChange={(e) => setItems(items.map((i) => i.id === m.id ? { ...i, unavailable: e.target.checked } : i))} className="accent-amber" />
                  Indisponible
                </label>
              </div>
            </div>
            <button onClick={() => setItems(items.filter((i) => i.id !== m.id))} className="text-coral self-start"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsMgmt() {
  const [items, setItems] = useStored<EventItem[]>("sunset_events", INITIAL_EVENTS);
  const [draft, setDraft] = useState<Partial<EventItem>>({ free: true });
  const add = () => {
    if (!draft.name || !draft.date) return;
    setItems([...items, {
      id: `e_${Date.now()}`,
      name: draft.name!, date: draft.date!, time: draft.time || "21h00",
      genre: draft.genre || "DJ Set", description: draft.description || "", free: !!draft.free,
      image: draft.image || "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?auto=format&fit=crop&w=1000&q=70",
    }]);
    setDraft({ free: true });
  };
  return (
    <div className="space-y-5">
      <div className="bg-white p-5 rounded-xl border border-[#E8DDD0] grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input placeholder="Nom" value={draft.name || ""} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
        <input placeholder="Date" value={draft.date || ""} onChange={(e) => setDraft({ ...draft, date: e.target.value })} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
        <input placeholder="Heure" value={draft.time || ""} onChange={(e) => setDraft({ ...draft, time: e.target.value })} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
        <input placeholder="Genre" value={draft.genre || ""} onChange={(e) => setDraft({ ...draft, genre: e.target.value })} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
        <input placeholder="Description" value={draft.description || ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm sm:col-span-2" />
        <input placeholder="Image URL" value={draft.image || ""} onChange={(e) => setDraft({ ...draft, image: e.target.value })} className="bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
        <button onClick={add} className="rounded-md bg-coral text-white py-2 text-sm font-medium">Créer</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((e) => (
          <div key={e.id} className="bg-white rounded-xl border border-[#E8DDD0] overflow-hidden">
            <img src={e.image} alt={e.name} className="h-32 w-full object-cover" />
            <div className="p-3">
              <p className="font-display text-graphite">{e.name}</p>
              <p className="text-xs text-graphite/60">{e.date} · {e.time} · {e.genre}</p>
              <button onClick={() => setItems(items.filter((i) => i.id !== e.id))} className="mt-2 text-xs text-coral flex items-center gap-1"><Trash2 className="h-3 w-3" />Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersHistory() {
  const { orders } = useOrders();
  const [filter, setFilter] = useState<"all" | "En attente" | "Confirmée" | "Servie" | "Annulée">("all");
  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(["all", "En attente", "Confirmée", "Servie", "Annulée"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-xs ${filter === s ? "bg-coral text-white" : s === "En attente" ? "bg-amber/30 text-graphite" : s === "Confirmée" ? "bg-teal/20 text-teal" : "bg-white border border-[#E8DDD0]"}`}>
            {s === "all" ? "Toutes" : s}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-[#E8DDD0] divide-y divide-[#E8DDD0]">
        {filtered.length === 0 && <p className="p-6 text-center text-graphite/50">Aucune commande</p>}
        {filtered.map((o) => (
          <div key={o.id} className="p-4 flex flex-wrap gap-3 items-center">
            <span className="bg-coral text-white text-xs px-2 py-0.5 rounded-full">Table {o.spotId}</span>
            <span className="font-display text-graphite">{o.guestName}</span>
            <span className="text-xs text-graphite/60">{new Date(o.time).toLocaleString("fr-FR")}</span>
            <span className="text-sm text-graphite/70">{o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}</span>
            <span className="ml-auto text-coral font-bold">{fmtFCFA(o.total)}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-sand">{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QRGenerator() {
  const [table, setTable] = useState("1");
  const [origin, setOrigin] = useState("");
  useEffect(() => { setOrigin(window.location.origin); }, []);
  const url = `${origin}/spot/${table}`;
  const download = () => {
    const canvas = document.querySelector<HTMLCanvasElement>("#qrcanvas canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `table-${table}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };
  return (
    <div className="max-w-md bg-white p-6 rounded-xl border border-[#E8DDD0] space-y-4">
      <div>
        <label className="text-sm font-medium text-graphite">Numéro de table</label>
        <input value={table} onChange={(e) => setTable(e.target.value)} className="mt-1 w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
      </div>
      <div id="qrcanvas" className="flex justify-center p-4 bg-sand rounded-xl">
        <QRCodeCanvas value={url} size={220} fgColor="#1C1C1C" bgColor="#F8EDE0" />
      </div>
      <p className="text-xs text-graphite/60 text-center break-all">{url}</p>
      <button onClick={download} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-coral text-white py-2.5 font-medium">
        <Download className="h-4 w-4" />Télécharger
      </button>
    </div>
  );
}

function SettingsPanel() {
  const [s, setS] = useStored("sunset_settings", { whatsapp: "+22890000000", hours: "Ouvert tous les jours sauf mardi, à partir de 17h00", pin: "sunset2025" });
  return (
    <div className="max-w-xl bg-white p-6 rounded-xl border border-[#E8DDD0] space-y-4">
      <div>
        <label className="text-sm font-medium text-graphite">Numéro WhatsApp</label>
        <input value={s.whatsapp} onChange={(e) => setS({ ...s, whatsapp: e.target.value })} className="mt-1 w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium text-graphite">Horaires</label>
        <input value={s.hours} onChange={(e) => setS({ ...s, hours: e.target.value })} className="mt-1 w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium text-graphite">Code admin</label>
        <input value={s.pin} onChange={(e) => setS({ ...s, pin: e.target.value })} className="mt-1 w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2 text-sm" />
      </div>
      <p className="text-xs text-graphite/60">Note : ces valeurs sont stockées localement. Pour les appliquer côté code, mettez à jour <code>src/lib/constants.ts</code>.</p>
    </div>
  );
}
