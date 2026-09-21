/**
 * Add the optional responsive image field to the existing hero_image collection.
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/add-hero-responsive-field.ts
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

const fields = await api('/fields/hero_image?limit=-1&fields=field');
if (fields.some((field: { field: string }) => field.field === 'image_responsive')) {
  console.log('hero_image.image_responsive already exists.');
} else {
  await api('/fields/hero_image', 'POST', {
    field: 'image_responsive',
    type: 'uuid',
    meta: {
      interface: 'file',
      special: ['file'],
      width: 'half',
      note: 'Gambar mobile/responsive, opsional. Fallback ke image jika kosong.',
    },
  });
  await api('/relations', 'POST', {
    collection: 'hero_image',
    field: 'image_responsive',
    related_collection: 'directus_files',
    schema: { on_delete: 'SET NULL' },
  });
  console.log('Added hero_image.image_responsive.');
}
console.log('Done.');
