const CATEGORIES = [
  { id: "cocktails", label: "Cocktails Signature" },
  { id: "mocktails", label: "Mocktails" },
  { id: "bieres", label: "Bières" },
  { id: "spiritueux", label: "Spiritueux" },
  { id: "cuisine", label: "Cuisine Afro-Fusion" },
  { id: "snacks", label: "Snacks & Tapas" }
];
const img = (q) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=70`;
const MENU = [
  { id: "c1", category: "cocktails", name: "Sunset Tonic", description: "Gin, tonic, pamplemousse, romarin", price: 5500, image: img("photo-1551024709-8f23befc6f87") },
  { id: "c2", category: "cocktails", name: "Togo Mule", description: "Vodka, gingembre frais, citron vert, ginger beer", price: 5500, image: img("photo-1514362545857-3bc16c4c7d1b") },
  { id: "c3", category: "cocktails", name: "Atlantic Blue", description: "Rhum blanc, curaçao bleu, ananas, citron", price: 5e3, image: img("photo-1587223962930-cb7f31384c19") },
  { id: "c4", category: "cocktails", name: "Lomé Sour", description: "Whisky, citron, sirop de canne, blanc d'oeuf", price: 6e3, image: img("photo-1536935338788-846bb9981813") },
  { id: "c5", category: "cocktails", name: "Mango Fizz", description: "Prosecco, purée de mangue, menthe", price: 6500, image: img("photo-1541546006121-5c3bc5e8c7b9") },
  { id: "c6", category: "cocktails", name: "Passion Royale", description: "Champagne, fruit de la passion, vanille", price: 7500, image: img("photo-1470337458703-46ad1756a187") },
  { id: "m1", category: "mocktails", name: "Virgin Sunset", description: "Jus d'orange, grenadine, ginger ale", price: 3500, image: img("photo-1497534446932-c925b458314e") },
  { id: "m2", category: "mocktails", name: "Coconut Beach", description: "Lait de coco, ananas, citron vert", price: 4e3, image: img("photo-1546171753-97d7676e4602") },
  { id: "b1", category: "bieres", name: "Pression locale", description: "Eku, Awooyo", price: 1500, image: img("photo-1568644396922-5c3bfae12521") },
  { id: "b2", category: "bieres", name: "Bière importée", description: "Heineken, Guinness", price: 2500, image: img("photo-1608270586620-248524c67de9") },
  { id: "s1", category: "spiritueux", name: "Whisky single malt", description: "Verre 4cl", price: 4500, image: img("photo-1527281400683-1aae777175f8") },
  { id: "s2", category: "spiritueux", name: "Rhum vieux", description: "Verre 4cl", price: 4e3, image: img("photo-1569529465841-dfecdab7503b") },
  { id: "f1", category: "cuisine", name: "Attiéké au poisson grillé", description: "Spécialité locale revisitée", price: 4500, image: img("photo-1604908176997-125f25cc6f3d") },
  { id: "f2", category: "cuisine", name: "Crevettes sautées au piment doux", description: "Servies avec citron vert", price: 7e3, image: img("photo-1565299624946-b28f40a0ae38") },
  { id: "f3", category: "cuisine", name: "Plateau de fruits de mer", description: "Pour 2 personnes", price: 12e3, image: img("photo-1559737558-2f5a35f4523b") },
  { id: "f4", category: "cuisine", name: "Brochettes mixtes", description: "Boeuf et poulet marinés", price: 5500, image: img("photo-1529193591184-b1d58069ecdd") },
  { id: "t1", category: "snacks", name: "Tapas mixtes maison", description: "Sélection du chef", price: 3500, image: img("photo-1541529086526-db283c563270") },
  { id: "t2", category: "snacks", name: "Spring rolls", description: "4 pièces, sauce aigre-douce", price: 3e3, image: img("photo-1606471191009-63994c53433b") },
  { id: "t3", category: "snacks", name: "Frites maison", description: "Sel de mer, herbes", price: 2500, image: img("photo-1573080496219-bb080dd4f877") },
  { id: "t4", category: "snacks", name: "Ailes de poulet épicées", description: "Sauce maison piquante", price: 4e3, image: img("photo-1567620832903-9fc6debc209f") }
];
export {
  CATEGORIES as C,
  MENU as M
};
