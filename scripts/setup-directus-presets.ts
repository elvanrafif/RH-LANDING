/**
 * Default list layouts, so the client sees the useful columns in a useful
 * order the first time they open a collection rather than having to build
 * the view themselves.
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/setup-directus-presets.ts
 */
const URL_ = process.env.DIRECTUS_URL?.replace(/\/$/, '');
const TOKEN = process.env.DIRECTUS_TOKEN;
if (!URL_ || !TOKEN) { console.error('Set DIRECTUS_URL and DIRECTUS_TOKEN first.'); process.exit(1); }

const api = async (path: string, method = 'GET', body?: unknown) => {
  const res = await fetch(`${URL_}${path}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : (await res.json()).data;
};

// user + role null makes these the defaults for everyone, including the
// editor account the client will log in with.
const presets = [
  {
    collection: 'inquiries', user: null, role: null, bookmark: null, layout: 'tabular',
    layout_query: { tabular: { fields: ['name', 'project', 'email', 'date_created', 'handled'], sort: ['-date_created'], limit: 50 } },
  },
  {
    collection: 'projects', user: null, role: null, bookmark: null, layout: 'tabular',
    layout_query: { tabular: { fields: ['img', 'title', 'titleAccent', 'type', 'location', 'year'], sort: ['id'], limit: 50 } },
  },
];

const existing = await api('/presets?limit=-1&fields=id,collection,user,role,bookmark');
for (const p of presets) {
  const dup = existing.find((e: any) => e.collection === p.collection && !e.user && !e.role && !e.bookmark);
  if (dup) { await api(`/presets/${dup.id}`, 'PATCH', p); console.log(`  ~ ${p.collection} (diperbarui)`); }
  else { await api('/presets', 'POST', p); console.log(`  + ${p.collection}`); }
}
console.log('Done.');
