/**
 * Create the `inquiries` collection and let the public site submit to it.
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/setup-directus-inquiries.ts
 *
 * The public policy gets `create` and nothing else: anyone may send an
 * enquiry, nobody may read back what other people sent.
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

if ((await api('/collections')).some((c: any) => c.collection === 'inquiries')) {
  console.error('`inquiries` already exists.');
  process.exit(1);
}

await api('/collections', 'POST', {
  collection: 'inquiries',
  meta: {
    icon: 'mail', note: 'Permintaan yang masuk lewat form di situs',
    display_template: '{{name}} — {{project}}',
    sort_field: 'date_created',
    archive_field: 'handled', archive_value: 'true', unarchive_value: 'false',
  },
  schema: { name: 'inquiries' },
  fields: [{ field: 'id', type: 'integer', schema: { is_primary_key: true, has_auto_increment: true }, meta: { hidden: true } }],
});
console.log('+ collection inquiries');

const fields: any[] = [
  { field: 'date_created', type: 'timestamp',
    meta: { special: ['date-created'], interface: 'datetime', readonly: true, width: 'half', note: 'Diisi otomatis' } },
  // Checkbox so the client can tick off the ones they have answered; ticking it
  // archives the row, which keeps the inbox showing only what still needs a reply.
  { field: 'handled', type: 'boolean', schema: { default_value: false },
    meta: { interface: 'boolean', width: 'half', note: 'Centang kalau sudah ditindaklanjuti' } },
  { field: 'name', type: 'string', meta: { interface: 'input', width: 'half', required: true } },
  { field: 'email', type: 'string', meta: { interface: 'input', width: 'half', required: true, options: { iconLeft: 'alternate_email' } } },
  { field: 'project', type: 'string', meta: { interface: 'select-dropdown', width: 'half',
    options: { choices: [
      { text: 'Residential', value: 'residential' }, { text: 'Interior', value: 'interior' },
      { text: 'Renovation', value: 'renovation' }, { text: 'Consult', value: 'consult' },
    ] } } },
  { field: 'whatsapp', type: 'string', meta: { interface: 'input', width: 'half', note: 'Nomor WhatsApp, opsional', options: { iconLeft: 'chat' } } },
  { field: 'budget', type: 'string', meta: { interface: 'input', width: 'half' } },
  { field: 'message', type: 'text', meta: { interface: 'input-multiline' } },
];
for (const f of fields) { await api('/fields/inquiries', 'POST', f); console.log(`  + ${f.field}`); }

const policies = await api('/policies?fields=id,name&limit=-1');
const publicPolicy = policies.find((p: any) => p.name.includes('public'));
if (!publicPolicy) throw new Error('No public policy found.');

await api('/permissions', 'POST', {
  policy: publicPolicy.id, collection: 'inquiries', action: 'create',
  // Only the fields the form owns. `handled` and `date_created` are not in this
  // list, so a crafted request cannot pre-archive itself or forge a timestamp.
  fields: ['name', 'email', 'whatsapp', 'project', 'budget', 'message'],
  permissions: {}, validation: {},
});
console.log('+ public create (no read)');
console.log('Done.');
