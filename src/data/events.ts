export type EventItem = {
  id: string;
  name: string;
  date: string;
  time: string;
  genre: string;
  description: string;
  image: string;
  free: boolean;
};

const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1000&q=70`;

export const EVENTS: EventItem[] = [
  { id: "e1", name: "Salsa Night", date: "Tous les deux jeudis", time: "21h00", genre: "Salsa", description: "Initiation et soirée dansante avec DJ latino.", image: img("photo-1504609813442-a8924e83f76e"), free: true },
  { id: "e2", name: "Weekend DJ Set", date: "Tous les vendredis", time: "20h00", genre: "DJ Set", description: "House, afrobeats et classiques jusqu'au bout de la nuit.", image: img("photo-1571266028243-d220c6a6b0d8"), free: true },
  { id: "e3", name: "Soirée Thématique", date: "Tous les samedis", time: "21h00", genre: "Spécial", description: "Soirée à thème changeant — sur invitation.", image: img("photo-1493676304819-0d7a8d026dcf"), free: false },
  { id: "e4", name: "Sunset Apéro", date: "Tous les dimanches", time: "17h00 — 20h00", genre: "Live", description: "Coucher de soleil, live acoustique et cocktails.", image: img("photo-1507525428034-b723cf961d3e"), free: true },
];
