const DEFAULT_GIFTS = [
  { id: 1, emoji: "🔭", name: "Kinder-Teleskop", desc: "Für die ersten Blicke in den Sternenhimmel", price: "ca. 35 €", url: "https://www.amazon.de/s?k=kinder+teleskop", taken: false },
  { id: 2, emoji: "🚀", name: "LEGO City Raumstation", desc: "Set zum Bauen und Spielen", price: "ca. 45 €", url: "https://www.amazon.de/s?k=lego+raumstation", taken: false },
  { id: 3, emoji: "🌌", name: "Planetarium-Projektor", desc: "Projiziert Sterne und Planeten an die Zimmerdecke", price: "ca. 25 €", url: "https://www.amazon.de/s?k=planetarium+projektor+kinder", taken: false },
  { id: 4, emoji: "📚", name: "Weltall-Wissensbuch", desc: "Kindgerechtes Sachbuch über das Universum", price: "ca. 15 €", url: "https://www.amazon.de/s?k=kinderbuch+weltall+universum", taken: false },
  { id: 5, emoji: "🎨", name: "Leuchtfarben-Set", desc: "Neonfarben, die im Dunkeln leuchten – perfekt für Space-Art", price: "ca. 18 €", url: "https://www.amazon.de/s?k=leuchtfarben+neon+kinder", taken: false },
  { id: 6, emoji: "🧩", name: "Galaxie-Puzzle (1000 Teile)", desc: "Beeindruckendes Nebel- oder Milchstraßen-Motiv", price: "ca. 20 €", url: "https://www.amazon.de/s?k=galaxie+puzzle+1000", taken: false },
  { id: 7, emoji: "👾", name: "Space-Bettwäsche-Set", desc: "Planeten und Raketen-Design, 135×200 cm", price: "ca. 30 €", url: "https://www.amazon.de/s?k=kinder+bettwäsche+weltall", taken: false },
  { id: 8, emoji: "🎮", name: "Experimentierkasten Astronomie", desc: "Bastelt Sonnensystem-Modelle und mehr", price: "ca. 28 €", url: "https://www.amazon.de/s?k=experimentierkasten+astronomie+kinder", taken: false }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const { kv } = await import('@vercel/kv');
    const data = await kv.get('gifts');
    return res.status(200).json({ gifts: data ?? DEFAULT_GIFTS });
  } catch {
    return res.status(200).json({ gifts: DEFAULT_GIFTS });
  }
}
