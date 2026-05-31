import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type OrderStatus = "En attente" | "Confirmée" | "Servie" | "Annulée";
export type Order = {
  id: string;
  spotId: string;
  guestName: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  time: string;
  status: OrderStatus;
};

const KEY = "sunset_orders";

const Ctx = createContext<{
  orders: Order[];
  add: (o: Omit<Order, "id" | "time" | "status">) => void;
  setStatus: (id: string, s: OrderStatus) => void;
  refresh: () => void;
} | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const load = () => {
    if (typeof window === "undefined") return;
    try { setOrders(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { setOrders([]); }
  };

  useEffect(() => {
    load();
    const onStorage = () => load();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = (o: Order[]) => { localStorage.setItem(KEY, JSON.stringify(o)); setOrders(o); };

  const add: any = (o: Omit<Order, "id" | "time" | "status">) => {
    const newOrder: Order = { ...o, id: `o_${Date.now()}`, time: new Date().toISOString(), status: "En attente" };
    persist([newOrder, ...orders]);
  };
  const setStatus = (id: string, s: OrderStatus) => persist(orders.map((o) => o.id === id ? { ...o, status: s } : o));

  return <Ctx.Provider value={{ orders, add, setStatus, refresh: load }}>{children}</Ctx.Provider>;
}

export const useOrders = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useOrders must be used within OrdersProvider");
  return v;
};
