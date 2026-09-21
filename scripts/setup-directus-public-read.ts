/**
 * Let the public website read the catalogue — read only, nothing else.
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/setup-directus-public-read.ts
 *
 * Rendering `gallery` needs all three collections: the projects themselves,
 * the junction rows, and the file records the /assets/:id URLs resolve against.
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

const policies = await api('/policies?fields=id,name&limit=-1');
const publicPolicy = policies.find((p: any) => p.name.includes('public'));
if (!publicPolicy) throw new Error('No public policy found.');

const grants = [
  { collection: 'projects', fields: ['id', 'is_active', 'title', 'titleAccent', 'location', 'year', 'area', 'img', 'brief', 'brief_en', 'chapters', 'chapters_en'] },
  { collection: 'marquee_items', fields: ['id', 'text_id', 'text_en', 'sort', 'status'] },
  { collection: 'services', fields: ['id', 'title_id', 'title_en', 'desc_id', 'desc_en', 'tag_id', 'tag_en', 'contact_type', 'sort', 'status'] },
  { collection: 'projects_files', fields: ['id', 'projects_id', 'directus_files_id'] },
  // Only what an <img> needs — not filename_disk, storage or uploader.
  { collection: 'directus_files', fields: ['id', 'title', 'type', 'width', 'height'] },
  { collection: 'hero_image', fields: ['id', 'image', 'image_responsive'] },
];

const existing = await api('/permissions?limit=-1&fields=id,collection,action,policy');
for (const g of grants) {
  const dup = existing.find((p: any) => p.policy === publicPolicy.id && p.collection === g.collection && p.action === 'read');
  if (dup) { console.log(`  = ${g.collection} (sudah ada)`); continue; }
  await api('/permissions', 'POST', {
    policy: publicPolicy.id, collection: g.collection, action: 'read',
    fields: g.fields, permissions: {}, validation: {},
  });
  console.log(`  + read ${g.collection}`);
}
console.log('Done.');
