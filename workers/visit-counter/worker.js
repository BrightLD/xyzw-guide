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

async function handleVisits(request, env) {
  const totalKey = 'site:visits';
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
}

async function handleLikes(request, env) {
  const totalKey = 'site:likes';
  if (request.method === 'GET') {
    const count = Number(await env.VISITS.get(totalKey)) || 0;
    return json({ count });
  }
  if (request.method === 'POST') {
    let action = 'like';
    try {
      const body = await request.json();
      if (body && (body.action === 'unlike' || body.action === 'like')) action = body.action;
    } catch (_) { /* empty body => like */ }

    let count = Number(await env.VISITS.get(totalKey)) || 0;
    if (action === 'like') count += 1;
    else count = Math.max(0, count - 1);
    await env.VISITS.put(totalKey, String(count));
    return json({ count });
  }
  return new Response('Method Not Allowed', { status: 405, headers: CORS });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }
    try {
      const path = new URL(request.url).pathname.replace(/\/+$/, '') || '/';
      if (path === '/like') return handleLikes(request, env);
      if (path === '/' || path === '/visit') return handleVisits(request, env);
      return json({ error: 'not found' }, 404);
    } catch (err) {
      return json({ error: String(err && err.message || err) }, 500);
    }
  },
};
