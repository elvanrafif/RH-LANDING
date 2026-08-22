/**
 * Seed Directus with the 12 projects currently hardcoded in src/data/projects.ts.
 *
 * Run AFTER creating the `projects` collection in the Directus UI:
 *   DIRECTUS_URL=https://cms.example.com \
 *   DIRECTUS_TOKEN=<admin static token> \
 *   node --experimental-strip-types scripts/seed-directus.ts
 *
 * Safe to re-run: it refuses to seed a collection that already has items.
 */
import { PROJECTS } from '../src/data/projects.ts';

const URL_ = process.env.DIRECTUS_URL?.replace(/\/$/, '');
const TOKEN = process.env.DIRECTUS_TOKEN;
if (!URL_ || !TOKEN) {
  console.error('Set DIRECTUS_URL and DIRECTUS_TOKEN first.');
  process.exit(1);
}

const api = async (path: string, init: RequestInit = {}) => {
  const res = await fetch(`${URL_}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...init.headers,
    },
  });
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path} → ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : (await res.json()).data;
};

// Refuse to double-seed.
const existing = await api('/items/projects?limit=1&fields=id');
if (existing.length) {
  console.error(`projects already has items — delete them first if you meant to re-seed.`);
  process.exit(1);
}

// The 12 source photos are reused across projects (gallery[0] === img, and the
// same URLs recur), so upload each distinct URL once and reuse the file id.
const urls = [...new Set(PROJECTS.flatMap((p) => [p.img, ...p.gallery]))];
console.log(`Uploading ${urls.length} distinct images…`);

const fileId = new Map<string, string>();
for (const [i, url] of urls.entries()) {
  const blob = await (await fetch(url)).blob();
  const form = new FormData();
  form.append('file', blob, `project-${i + 1}.jpg`);
  const file = await api('/files', { method: 'POST', body: form });
  fileId.set(url, file.id);
  console.log(`  ${i + 1}/${urls.length}  ${file.id}`);
}

console.log(`Creating ${PROJECTS.length} projects…`);
for (const p of PROJECTS) {
  await api('/items/projects', {
    method: 'POST',
    // `id` is auto-increment: inserting in order reproduces the original 1..12
    // without leaving the Postgres sequence behind the highest row.
    body: JSON.stringify({
      ...p,
      id: undefined,
      img: fileId.get(p.img),
      gallery: p.gallery.map((u) => ({ directus_files_id: fileId.get(u) })),
    }),
  });
  console.log(`  #${p.id} ${p.title} ${p.titleAccent}`);
}

console.log('Done.');
