/**
 * Add the WhatsApp field to `inquiries` and let the public form submit it.
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/add-whatsapp-field.ts
 *
 * Must run BEFORE the frontend change ships: the public create permission is a
 * field whitelist, so posting an unknown field is rejected outright and every
 * submission would fail with 403.
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

const fields = await api('/fields/inquiries');
if (fields.some((f: any) => f.field === 'whatsapp')) console.log('= field whatsapp sudah ada');
else {
  await api('/fields/inquiries', 'POST', {
    field: 'whatsapp', type: 'string',
    meta: { interface: 'input', width: 'half', note: 'Nomor WhatsApp, opsional', options: { iconLeft: 'chat' } },
  });
  console.log('+ field whatsapp');
}

// Widen the public whitelist, leaving every other permission untouched.
const perms = await api('/permissions?limit=-1&fields=id,collection,action,fields,policy');
const create = perms.find((p: any) => p.collection === 'inquiries' && p.action === 'create');
if (!create) throw new Error('Public create permission on inquiries not found.');
if (create.fields?.includes('whatsapp')) console.log('= izin publik sudah memuat whatsapp');
else {
  await api(`/permissions/${create.id}`, 'PATCH', { fields: [...create.fields, 'whatsapp'] });
  console.log(`+ whatsapp ditambahkan ke izin publik → ${[...create.fields, 'whatsapp'].join(', ')}`);
}

// Show it in the list view next to the other contact details.
const presets = await api('/presets?limit=-1&fields=id,collection,user,role,bookmark,layout_query');
const p = presets.find((x: any) => x.collection === 'inquiries' && !x.user && !x.role && !x.bookmark);
if (p && !p.layout_query?.tabular?.fields?.includes('whatsapp')) {
  const f = p.layout_query.tabular.fields;
  await api(`/presets/${p.id}`, 'PATCH', {
    layout_query: { ...p.layout_query, tabular: { ...p.layout_query.tabular, fields: [...f.slice(0, 2), 'whatsapp', ...f.slice(2)] } },
  });
  console.log('+ kolom whatsapp di tampilan daftar');
}
console.log('Done.');
