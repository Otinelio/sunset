import { useState, type ReactNode } from "react";
import { Waves } from "lucide-react";

export function PinGate({ pin, label, children }: { pin: string; label: string; children: ReactNode }) {
  const [v, setV] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState(false);

  if (ok) return <>{children}</>;

  const submit = () => {
    if (v === pin) { setOk(true); setErr(false); }
    else { setErr(true); }
  };

  return (
    <div className="min-h-screen bg-sand flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-xl border border-[#E8DDD0] w-full max-w-sm p-8">
        <div className="flex items-center gap-2 justify-center">
          <Waves className="h-5 w-5 text-coral" />
          <span className="font-accent text-2xl text-graphite">LE SUNSET</span>
        </div>
        <p className="mt-6 text-center font-body text-graphite/70 text-sm">{label}</p>
        <input
          type="password"
          value={v}
          onChange={(e) => { setV(e.target.value); setErr(false); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Code d'accès"
          className="mt-4 w-full text-center text-xl tracking-widest font-display bg-sand border border-[#E0D5C8] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-coral"
        />
        {err && <p className="mt-2 text-center text-sm text-destructive">Code incorrect</p>}
        <button
          onClick={submit}
          className="mt-5 w-full rounded-md bg-coral text-white py-3 font-medium hover:bg-coral/90 transition-colors"
        >Accéder</button>
      </div>
    </div>
  );
}
