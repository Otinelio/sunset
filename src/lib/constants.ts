export const WHATSAPP_NUMBER = "22890000000"; // PLACEHOLDER — replace with real number
export const WA_BASE = `https://wa.me/+${WHATSAPP_NUMBER}`;
export const waLink = (msg: string) => `${WA_BASE}?text=${encodeURIComponent(msg)}`;

export const BRAND = {
  name: "Le Sunset Beach Lounge",
  short: "LE SUNSET",
  tagline: "L'art de vivre en bord de mer.",
  address: "667 Boulevard de la République, Kodjoviakopé, Lomé, Togo",
  hours: "Ouvert tous les jours sauf mardi, à partir de 17h00",
};

export const fmtFCFA = (n: number) => `${n.toLocaleString("fr-FR")} FCFA`;
