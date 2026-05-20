// FELKAT — catálogo real (precios en COP con ganancia de $50.000)
window.FELKAT_CATEGORIES = [
  { id: "caballero", name: "Caballero", short: "ÉL",     desc: "Fragancias masculinas — frescas, intensas, atemporales" },
  { id: "dama",      name: "Dama",      short: "ELLA",   desc: "Fragancias femeninas — florales, dulces, sofisticadas" },
  { id: "arabes",    name: "Árabes",    short: "ÁRABES", desc: "Perfumes orientales — oud, ámbar, especias profundas" },
];

// Helper to build product
const _p = (id, cat, brand, name, price, mood) => ({
  id, category: cat, brand, name, price, mood,
  desc: descFor(cat, mood),
});

function descFor(cat, mood) {
  const moods = {
    fresh:    "Fragancia limpia y luminosa para el día.",
    deep:     "Composición profunda y envolvente, ideal para la noche.",
    sweet:    "Notas dulces y golosas con un toque irresistible.",
    floral:   "Bouquet floral elegante, suave y sofisticado.",
    woody:    "Maderas nobles, presencia masculina y refinada.",
    citrus:   "Cítricos chispeantes, frescura inmediata.",
    spicy:    "Especias cálidas, carácter rotundo.",
    oriental: "Oriental intenso — oud, ámbar y resinas.",
    sport:    "Vibrante y enérgico para todos los días.",
    elegant:  "Clásico universal, elegancia sin esfuerzo.",
  };
  return moods[mood] || moods.elegant;
}

window.FELKAT_PRODUCTS = [
  // ──────────── CABALLERO ────────────
  _p("c01", "caballero", "BVLGARI",          "MAN IN BLACK",       100000, "deep"),
  _p("c02", "caballero", "CALVIN KLEIN",     "CK ONE",             100000, "fresh"),
  _p("c03", "caballero", "CAROLINA HERRERA", "212",                108000, "elegant"),
  _p("c04", "caballero", "CAROLINA HERRERA", "212 VIP BLACK",      106000, "deep"),
  _p("c05", "caballero", "CHANEL",           "BLEU DE CHANEL",     106000, "elegant"),
  _p("c06", "caballero", "DIOR",             "SAUVAGE",            106000, "woody"),
  _p("c07", "caballero", "GIORGIO ARMANI",   "ACQUA DI GIÒ",       100000, "fresh"),
  _p("c08", "caballero", "HUGO BOSS",        "BOSS ORANGE",         100000, "citrus"),
  _p("c09", "caballero", "HUGO BOSS",        "BOSS BOTTLED NIGHT",  99000, "woody"),
  _p("c10", "caballero", "HUGO BOSS",        "BOSS",                99000, "elegant"),
  _p("c11", "caballero", "HUGO BOSS",        "BOSS UNLIMITED",      99000, "sport"),
  _p("c12", "caballero", "HUGO BOSS",        "HUGO RED",            98000, "spicy"),
  _p("c13", "caballero", "RALPH LAUREN",     "POLO SPORT",         100000, "sport"),
  _p("c14", "caballero", "RALPH LAUREN",     "POLO RED",           100000, "spicy"),
  _p("c15", "caballero", "RALPH LAUREN",     "POLO BLUE",          100000, "fresh"),
  _p("c16", "caballero", "PACO RABANNE",     "INVICTUS LEGEND",    106000, "woody"),
  _p("c17", "caballero", "PACO RABANNE",     "INVICTUS ONIX",      106000, "deep"),
  _p("c18", "caballero", "PACO RABANNE",     "INVICTUS VICTORY",   106000, "sport"),
  _p("c19", "caballero", "PACO RABANNE",     "INVICTUS PARFUM",    114000, "deep"),
  _p("c20", "caballero", "PACO RABANNE",     "INVICTUS",            98000, "sport"),
  _p("c21", "caballero", "PACO RABANNE",     "PHANTOM",            116000, "elegant"),
  _p("c22", "caballero", "PACO RABANNE",     "PHANTOM PARFUM",     114000, "elegant"),
  _p("c23", "caballero", "PACO RABANNE",     "ONE MILLION",        100000, "spicy"),
  _p("c24", "caballero", "FERRARI",          "FERRARI BLACK",       98000, "woody"),
  _p("c25", "caballero", "NAUTICA",          "NAUTICA",            100000, "fresh"),
  _p("c26", "caballero", "TOMMY HILFIGER",   "TOMMY MEN",           98000, "fresh"),

  // ──────────── DAMA ────────────
  _p("d01", "dama", "ARIANA GRANDE",    "THANK U, NEXT",     126000, "sweet"),
  _p("d02", "dama", "ARIANA GRANDE",    "SWEET LIKE CANDY",  102000, "sweet"),
  _p("d03", "dama", "ARIANA GRANDE",    "CLOUD",             126000, "sweet"),
  _p("d04", "dama", "DIOR",             "J'ADORE",           102000, "floral"),
  _p("d05", "dama", "DIOR",             "MISS DIOR BLOOMING", 98000, "floral"),
  _p("d06", "dama", "CAROLINA HERRERA", "212 NYC",           106000, "floral"),
  _p("d07", "dama", "CAROLINA HERRERA", "212 VIP",           106000, "elegant"),
  _p("d08", "dama", "CAROLINA HERRERA", "212 VIP ROSÉ",      104000, "floral"),
  _p("d09", "dama", "CAROLINA HERRERA", "CH",                104000, "elegant"),
  _p("d10", "dama", "CAROLINA HERRERA", "GOOD GIRL",         104000, "deep"),
  _p("d11", "dama", "CAROLINA HERRERA", "FANTASTIC PINK",    107000, "sweet"),
  _p("d12", "dama", "CAROLINA HERRERA", "SUPREME",           107000, "elegant"),
  _p("d13", "dama", "CAROLINA HERRERA", "212 SEXY",          106000, "deep"),
  _p("d14", "dama", "CHANEL",           "CHANEL N°5",        100000, "floral"),
  _p("d15", "dama", "CHANEL",           "CHANCE CHANEL",     100000, "floral"),
  _p("d16", "dama", "CHANEL",           "COCO MADEMOISELLE", 100000, "elegant"),
  _p("d17", "dama", "DOLCE & GABBANA",  "DEVOTION",          110000, "deep"),
  _p("d18", "dama", "DOLCE & GABBANA",  "THE ONE",           100000, "floral"),
  _p("d19", "dama", "GIVENCHY",         "ANGE OU DÉMON",     100000, "deep"),
  _p("d20", "dama", "PARIS HILTON",     "CAN CAN",            98000, "sweet"),
  _p("d21", "dama", "LANCÔME",          "LA VIE EST BELLE",  100000, "floral"),

  // ──────────── ÁRABES ────────────
  _p("a01", "arabes", "LATTAFA",    "ASAD BOURBON",          126000, "oriental"),
  _p("a02", "arabes", "LATTAFA",    "YARA CANDY",            126000, "sweet"),
  _p("a03", "arabes", "LATTAFA",    "YARA",                  126000, "sweet"),
  _p("a04", "arabes", "LATTAFA",    "KHAMRAH",               122000, "oriental"),
  _p("a05", "arabes", "LATTAFA",    "KHAMRAH QAHWA",         122000, "oriental"),
  _p("a06", "arabes", "ORIENTICA",  "OUD SAFFRON",           122000, "oriental"),
  _p("a07", "arabes", "ARMAF",      "ODYSSEY SPECTRA",       132000, "oriental"),
  _p("a08", "arabes", "ARMAF",      "CLUB DE NUIT WOMAN",    124000, "floral"),
  _p("a09", "arabes", "ARMAF",      "CLUB DE NUIT INTENSE",  136000, "woody"),
  _p("a10", "arabes", "MAISON",     "BACCARAT ROUGE",        100000, "oriental"),
];

// Unique brands list
window.FELKAT_BRANDS = [...new Set(window.FELKAT_PRODUCTS.map(p => p.brand))].sort();

// ──────────── QUIZ ────────────
window.FELKAT_QUIZ = [
  { q: "¿Para quién buscas la fragancia?",
    options: [
      { label: "Para él",       weights: { cat_caballero: 4 } },
      { label: "Para ella",     weights: { cat_dama: 4 } },
      { label: "Algo exclusivo / oriental", weights: { cat_arabes: 4 } },
      { label: "Aún no lo sé",  weights: { cat_caballero: 1, cat_dama: 1, cat_arabes: 1 } },
    ] },
  { q: "¿Qué tipo de presencia prefieres?",
    options: [
      { label: "Discreta y limpia",   weights: { fresh: 3, citrus: 2, floral: 1 } },
      { label: "Elegante y clásica",  weights: { elegant: 3, floral: 2, woody: 1 } },
      { label: "Intensa y envolvente", weights: { deep: 3, oriental: 2, woody: 2 } },
      { label: "Dulce y golosa",      weights: { sweet: 4 } },
    ] },
  { q: "¿En qué momento la usarías más?",
    options: [
      { label: "Día / oficina",       weights: { fresh: 3, citrus: 2, sport: 2 } },
      { label: "Noche / cena",        weights: { deep: 3, elegant: 2, oriental: 2 } },
      { label: "Cita / ocasión especial", weights: { elegant: 2, deep: 2, sweet: 2, oriental: 1 } },
      { label: "Todos los días",      weights: { fresh: 2, sport: 2, floral: 2 } },
    ] },
  { q: "¿Qué estación olfativa te llama más?",
    options: [
      { label: "Cítrica fresca",      weights: { citrus: 3, fresh: 2 } },
      { label: "Floral",              weights: { floral: 4 } },
      { label: "Amaderada",           weights: { woody: 4 } },
      { label: "Oriental / especiada", weights: { oriental: 3, spicy: 3 } },
    ] },
  { q: "Una palabra que describa el aroma ideal.",
    options: [
      { label: "Magnético",  weights: { deep: 3, oriental: 2 } },
      { label: "Luminoso",   weights: { fresh: 3, citrus: 2 } },
      { label: "Atemporal",  weights: { elegant: 4 } },
      { label: "Adictivo",   weights: { sweet: 3, oriental: 2 } },
    ] },
];
