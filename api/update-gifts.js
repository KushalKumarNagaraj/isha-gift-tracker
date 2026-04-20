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

  try {
    const { kv } = await import('@vercel/kv');
    await kv.set('gifts', gifts);
  } catch {
    // KV not configured — password was correct, changes won't persist across cold starts
  }

  return res.status(200).json({ ok: true });
}
