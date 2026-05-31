import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { fmtFCFA, waLink } from "../lib/constants";

export function CartDrawer() {
  const { state, dispatch, total } = useCart();
  const [name, setName] = useState("");
  const [table, setTable] = useState("");

  const send = () => {
    const lines = state.lines.map((l) => `- ${l.item.name} x${l.qty} — ${fmtFCFA(l.item.price * l.qty)}`).join("\n");
    const msg = `Bonjour Le Sunset, voici ma commande :\n${lines}\nTotal : ${fmtFCFA(total)}\nNom : ${name || "A préciser"}\nTable : ${table || "A préciser"}\nMerci !`;
    window.open(waLink(msg), "_blank");
    dispatch({ type: "clear" });
    dispatch({ type: "close" });
  };

  return (
    <AnimatePresence>
      {state.open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40" onClick={() => dispatch({ type: "close" })}
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[420px] bg-white border-l border-[#E8DDD0] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#E8DDD0]">
              <h3 className="font-display text-2xl text-graphite">Ma Commande</h3>
              <button onClick={() => dispatch({ type: "close" })} className="text-coral p-1.5 rounded-md hover:bg-sand"><X className="h-5 w-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {state.lines.length === 0 ? (
                <p className="text-center text-graphite/60 mt-10 font-accent text-xl">Votre commande est vide</p>
              ) : state.lines.map((l) => (
                <div key={l.item.id} className="flex gap-3 items-center bg-sand rounded-lg p-3">
                  <img src={l.item.image} alt={l.item.name} className="h-14 w-14 rounded-md object-cover" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-graphite text-sm truncate">{l.item.name}</p>
                    <p className="text-coral font-medium text-sm">{fmtFCFA(l.item.price)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => dispatch({ type: "dec", id: l.item.id })} className="p-1.5 rounded-md bg-white text-coral border border-[#E8DDD0]"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="w-6 text-center text-sm">{l.qty}</span>
                    <button onClick={() => dispatch({ type: "inc", id: l.item.id })} className="p-1.5 rounded-md bg-white text-coral border border-[#E8DDD0]"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <button onClick={() => dispatch({ type: "remove", id: l.item.id })} className="text-coral p-1.5"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
            </div>

            {state.lines.length > 0 && (
              <div className="border-t border-[#E8DDD0] p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-graphite/70">Total</span>
                  <span className="font-display text-2xl text-graphite">{fmtFCFA(total)}</span>
                </div>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom" className="w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral" />
                <input value={table} onChange={(e) => setTable(e.target.value)} placeholder="N° de table (optionnel)" className="w-full bg-sand border border-[#E0D5C8] rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-coral" />
                <button onClick={send} className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-coral text-white py-3 font-medium hover:bg-coral/90 transition-colors">
                  <MessageCircle className="h-4 w-4" /> Envoyer via WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
