import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, CheckCheck, Clock, Waves, X } from "lucide-react";
import { PinGate } from "../components/PinGate";
import { useOrders, type Order, type OrderStatus } from "../context/OrdersContext";
import { fmtFCFA } from "../lib/constants";

export const Route = createFileRoute("/reception")({
  head: () => ({ meta: [{ title: "Réception — Le Sunset" }, { name: "robots", content: "noindex" }] }),
  component: () => <PinGate pin="2025" label="Accès Réception"><ReceptionDashboard /></PinGate>,
});

const STATUS_DOT: Record<OrderStatus, string> = {
  "En attente": "bg-amber",
  "Confirmée": "bg-teal",
  "Servie": "bg-[#22C55E]",
  "Annulée": "bg-[#EF4444]",
};

function useChime() {
  const ctxRef = useRef<AudioContext | null>(null);
  return () => {
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = ctxRef.current;
      const o = ctx.createOscillator(); const g = ctx.createGain();
      o.frequency.value = 880; o.type = "sine";
      g.gain.value = 0.0001; o.connect(g); g.connect(ctx.destination);
      o.start(); g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      o.stop(ctx.currentTime + 0.45);
    } catch {}
  };
}

function ReceptionDashboard() {
  const { orders, setStatus, refresh } = useOrders();
  const [now, setNow] = useState(new Date());
  const lastCount = useRef(orders.length);
  const chime = useChime();

  useEffect(() => {
    const t = setInterval(() => { setNow(new Date()); refresh(); }, 5000);
    const t2 = setInterval(() => setNow(new Date()), 1000);
    return () => { clearInterval(t); clearInterval(t2); };
  }, [refresh]);

  useEffect(() => {
    if (orders.length > lastCount.current) chime();
    lastCount.current = orders.length;
  }, [orders.length, chime]);

  const today = new Date().toDateString();
  const todayOrders = orders.filter((o) => new Date(o.time).toDateString() === today);
  const pending = todayOrders.filter((o) => o.status === "En attente").length;
  const served = todayOrders.filter((o) => o.status === "Servie").length;

  const topItem = useMemo(() => {
    const counts: Record<string, number> = {};
    todayOrders.forEach((o) => o.items.forEach((it) => { counts[it.name] = (counts[it.name] || 0) + it.qty; }));
    return Object.entries(counts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "—";
  }, [todayOrders]);

  return (
    <div className="min-h-screen bg-offwhite flex">
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-[#E8DDD0] p-5">
        <div className="flex items-center gap-2 mb-8">
          <Waves className="h-5 w-5 text-coral" />
          <span className="font-accent text-xl text-graphite">LE SUNSET</span>
        </div>
        <nav className="space-y-1 text-sm">
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-sand text-graphite">
            <span className="h-1.5 w-1.5 rounded-full bg-coral" /> Commandes
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-8">
        <header className="flex items-end justify-between flex-wrap gap-3 mb-6">
          <h1 className="font-display text-3xl text-graphite">Tableau de Réception</h1>
          <span className="text-sm text-graphite/60 font-mono">{now.toLocaleString("fr-FR")}</span>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Stat label="Total commandes" value={todayOrders.length} color="text-coral" />
          <Stat label="En attente" value={pending} color="text-amber" />
          <Stat label="Servies" value={served} color="text-teal" />
          <Stat label="Article phare" value={topItem} color="text-graphite" small />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.length === 0 && <p className="col-span-full text-center text-graphite/50 py-12 font-accent text-xl">Aucune commande pour le moment</p>}
          {orders.map((o) => <OrderCard key={o.id} order={o} onSet={(s) => setStatus(o.id, s)} />)}
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, color, small }: { label: string; value: any; color: string; small?: boolean }) {
  return (
    <div className="bg-sand rounded-xl p-4 border border-[#E8DDD0]">
      <p className="text-xs text-graphite/60">{label}</p>
      <p className={`font-display ${small ? "text-lg" : "text-3xl"} ${color} mt-1 truncate`}>{value}</p>
    </div>
  );
}

function OrderCard({ order, onSet }: { order: Order; onSet: (s: OrderStatus) => void }) {
  return (
    <div className="bg-white rounded-xl border border-[#E8DDD0] p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="bg-coral text-white text-xs px-2.5 py-1 rounded-full">Table {order.spotId}</span>
        <span className="text-xs text-teal flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(order.time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
      <p className="font-display text-graphite text-lg">{order.guestName}</p>
      <ul className="text-sm text-graphite/70 space-y-0.5">
        {order.items.map((it, i) => <li key={i}>{it.name} × {it.qty}</li>)}
      </ul>
      <div className="flex items-center justify-between">
        <span className="text-coral font-bold">{fmtFCFA(order.total)}</span>
        <span className="text-xs flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full ${STATUS_DOT[order.status]}`} />{order.status}</span>
      </div>
      <div className="flex gap-1.5">
        <button onClick={() => onSet("Confirmée")} className="flex-1 inline-flex items-center justify-center gap-1 text-xs border border-teal text-teal rounded-md py-1.5 hover:bg-teal hover:text-white transition-colors"><Check className="h-3 w-3" />Confirmer</button>
        <button onClick={() => onSet("Servie")} className="flex-1 inline-flex items-center justify-center gap-1 text-xs bg-coral text-white rounded-md py-1.5 hover:bg-coral/90"><CheckCheck className="h-3 w-3" />Servie</button>
        <button onClick={() => onSet("Annulée")} className="inline-flex items-center justify-center text-xs border border-graphite/30 text-graphite/60 rounded-md px-2 py-1.5 hover:bg-graphite/10"><X className="h-3 w-3" /></button>
      </div>
    </div>
  );
}
