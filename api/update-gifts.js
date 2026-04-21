const BIN_URL = `https://api.jsonbin.io/v3/b/${process.env.JSONBIN_BIN_ID}`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { password, gifts } = req.body || {};

  if (!password || password !== (process.env.ADMIN_PASSWORD || '02122022')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!Array.isArray(gifts)) {
    return res.status(400).json({ error: 'Invalid gifts data' });
  }

  // Attempt to persist — failure does not block the admin unlock
  if (process.env.JSONBIN_BIN_ID && process.env.JSONBIN_KEY) {
    try {
      await fetch(BIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': process.env.JSONBIN_KEY
        },
        body: JSON.stringify(gifts)
      });
    } catch { /* ignore */ }
  }

  return res.status(200).json({ ok: true });
}
