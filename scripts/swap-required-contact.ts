/**
 * WhatsApp becomes the required way to reach someone; email becomes optional.
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/swap-required-contact.ts
 *
 * meta.required only drives the admin form, so the public create permission
 * also gets a validation rule — otherwise "required" would not hold for anyone
 * posting to the API directly.
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

await api('/fields/inquiries/whatsapp', 'PATCH', {
  meta: { required: true, note: 'Nomor WhatsApp — jalur utama menghubungi', options: { iconLeft: 'chat' } },
});
console.log('~ whatsapp: wajib');

await api('/fields/inquiries/email', 'PATCH', {
  meta: { required: false, note: 'Opsional', options: { iconLeft: 'alternate_email' } },
});
console.log('~ email: opsional');

const perms = await api('/permissions?limit=-1&fields=id,collection,action,validation');
const create = perms.find((p: any) => p.collection === 'inquiries' && p.action === 'create');
if (!create) throw new Error('Public create permission on inquiries not found.');
// _nempty alone only rejects an empty string; a payload that omits the field
// entirely still passes, so pair it with _nnull.
await api(`/permissions/${create.id}`, 'PATCH', {
  validation: { _and: [{ whatsapp: { _nnull: true } }, { whatsapp: { _nempty: true } }] },
});
console.log('~ izin publik: menolak kiriman tanpa whatsapp');
// Validation only inspects fields present in the payload, so a request that
// omits whatsapp entirely slips past it. NOT NULL at the database is the only
// version of "required" that actually holds.
const rows = await api('/items/inquiries?limit=-1&fields=id,whatsapp');
const blank = rows.filter((r: any) => !r.whatsapp);
for (const r of blank) await api(`/items/inquiries/${r.id}`, 'PATCH', { whatsapp: '-' });
if (blank.length) console.log(`~ ${blank.length} baris lama diisi '-' agar constraint bisa dipasang`);

await api('/fields/inquiries/whatsapp', 'PATCH', { schema: { is_nullable: false } });
console.log('~ kolom whatsapp: NOT NULL');

await api('/fields/inquiries/email', 'PATCH', { schema: { is_nullable: true } });
console.log('~ kolom email: boleh kosong');

console.log('Done.');
