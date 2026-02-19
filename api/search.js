export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { key, q, gl = "fr", hl = "fr", num = "10" } = req.query;

  if (!key || !q) {
    return res.status(400).json({ error: "Paramètres manquants (key, q)" });
  }

  const url = `https://serpapi.com/search.json?api_key=${key}&q=${encodeURIComponent(q)}&gl=${gl}&hl=${hl}&num=${num}&engine=google`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
