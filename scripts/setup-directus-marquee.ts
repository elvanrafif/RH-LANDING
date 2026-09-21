/**
 * Create and seed the editable marquee collection.
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/setup-directus-marquee.ts
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

const collections = await api('/collections?limit=-1&fields=collection');
if (!collections.some((c: { collection: string }) => c.collection === 'marquee_items')) {
  await api('/collections', 'POST', {
    collection: 'marquee_items',
    meta: {
      icon: 'format_quote',
      note: 'Teks berjalan di bawah header',
      display_template: '{{text_id}}',
      sort_field: 'sort',
    },
    schema: { name: 'marquee_items' },
    fields: [{
      field: 'id', type: 'integer',
      schema: { is_primary_key: true, has_auto_increment: true },
      meta: { hidden: true, readonly: true },
    }],
  });

  const fields = [
    { field: 'text_id', type: 'string', meta: { interface: 'input', width: 'half', required: true, note: 'Bahasa Indonesia' } },
    { field: 'text_en', type: 'string', meta: { interface: 'input', width: 'half', required: true, note: 'English' } },
    { field: 'sort', type: 'integer', meta: { interface: 'input', width: 'half', required: true } },
    { field: 'status', type: 'string', schema: { default_value: 'published' }, meta: {
      interface: 'select-dropdown', width: 'half', required: true,
      options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] },
    } },
  ];
  for (const field of fields) await api('/fields/marquee_items', 'POST', field);
  console.log('Created collection `marquee_items`.');
} else {
  console.log('Collection `marquee_items` already exists.');
}

const existing = await api('/items/marquee_items?limit=1&fields=id');
if (existing.length === 0) {
  const rows = [
    ['Desain', 'Design'], ['Bangun', 'Build'], ['Arsitektur', 'Architecture'], ['Interior', 'Interior'],
    ['Residensial', 'Residential'], ['Detail', 'Crafted'], ['Presisi', 'Precision'], ['Estetika', 'Timeless'],
  ].map(([text_id, text_en], sort) => ({ text_id, text_en, sort, status: 'published' }));
  await api('/items/marquee_items', 'POST', rows);
  console.log(`Seeded ${rows.length} marquee items.`);
} else {
  console.log('Marquee items already exist; skipped seed.');
}
console.log('Done.');
