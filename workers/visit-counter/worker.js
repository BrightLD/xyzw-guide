const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const totalKey = 'site:visits';

    try {
      if (request.method === 'POST') {
        const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
        const day = new Date().toISOString().slice(0, 10);
        const seenKey = `seen:${day}:${ip}`;
        const seen = await env.VISITS.get(seenKey);
        let count = Number(await env.VISITS.get(totalKey)) || 0;

        if (!seen) {
          count += 1;
          await env.VISITS.put(totalKey, String(count));
          await env.VISITS.put(seenKey, '1', { expirationTtl: 172800 });
        }

        return json({ count });
      }

      if (request.method === 'GET') {
        const count = Number(await env.VISITS.get(totalKey)) || 0;
        return json({ count });
      }

      return new Response('Method Not Allowed', { status: 405, headers: CORS });
    } catch (err) {
      return json({ error: String(err && err.message || err) }, 500);
    }
  },
};
