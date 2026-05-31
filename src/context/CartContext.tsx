import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { MenuItem } from "../data/menu";

export type CartLine = { item: MenuItem; qty: number };

type State = { lines: CartLine[]; open: boolean };
type Action =
  | { type: "add"; item: MenuItem }
  | { type: "remove"; id: string }
  | { type: "inc"; id: string }
  | { type: "dec"; id: string }
  | { type: "clear" }
  | { type: "open" }
  | { type: "close" }
  | { type: "toggle" };

const reducer = (s: State, a: Action): State => {
  switch (a.type) {
    case "add": {
      const existing = s.lines.find((l) => l.item.id === a.item.id);
      const lines = existing
        ? s.lines.map((l) => (l.item.id === a.item.id ? { ...l, qty: l.qty + 1 } : l))
        : [...s.lines, { item: a.item, qty: 1 }];
      return { ...s, lines, open: true };
    }
    case "remove": return { ...s, lines: s.lines.filter((l) => l.item.id !== a.id) };
    case "inc": return { ...s, lines: s.lines.map((l) => l.item.id === a.id ? { ...l, qty: l.qty + 1 } : l) };
    case "dec": return { ...s, lines: s.lines.flatMap((l) => l.item.id === a.id ? (l.qty <= 1 ? [] : [{ ...l, qty: l.qty - 1 }]) : [l]) };
    case "clear": return { ...s, lines: [] };
    case "open": return { ...s, open: true };
    case "close": return { ...s, open: false };
    case "toggle": return { ...s, open: !s.open };
  }
};

const Ctx = createContext<{ state: State; dispatch: React.Dispatch<Action>; total: number; count: number } | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], open: false });
  const total = state.lines.reduce((s, l) => s + l.item.price * l.qty, 0);
  const count = state.lines.reduce((s, l) => s + l.qty, 0);
  return <Ctx.Provider value={{ state, dispatch, total, count }}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
};
