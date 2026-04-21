const BIN_URL = `https://api.jsonbin.io/v3/b/${process.env.JSONBIN_BIN_ID}`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  if (!body || typeof body !== 'object') {
    try {
      const raw = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => resolve(data));
        req.on('error', reject);
      });
      body = JSON.parse(raw);
    } catch { body = {}; }
  }

  const { gifts } = body;

  if (!Array.isArray(gifts)) {
    return res.status(400).json({ error: 'Invalid gifts data' });
  }

  if (!process.env.JSONBIN_BIN_ID || !process.env.JSONBIN_KEY) {
    return res.status(500).json({ error: 'Storage not configured' });
  }

  const r = await fetch(BIN_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': process.env.JSONBIN_KEY,
      'X-Bin-Versioning': 'false'
    },
    body: JSON.stringify(gifts)
  });

  if (!r.ok) {
    const text = await r.text();
    return res.status(502).json({ error: `JSONBin error ${r.status}: ${text}` });
  }

  return res.status(200).json({ ok: true });
}
