/**
 * Permanently remove project metadata that is no longer shown in project details.
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/remove-project-metadata.ts
 */
const URL_ = process.env.DIRECTUS_URL?.replace(/\/$/, '');
const TOKEN = process.env.DIRECTUS_TOKEN;
if (!URL_ || !TOKEN) { console.error('Set DIRECTUS_URL and DIRECTUS_TOKEN first.'); process.exit(1); }

const api = async (path: string, method = 'GET') => {
  const res = await fetch(`${URL_}${path}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : (await res.json()).data;
};

const fields = await api('/fields/projects?limit=-1&fields=field');
for (const field of ['client', 'duration', 'team', 'status', 'type']) {
  if (fields.some((item: { field: string }) => item.field === field)) {
    await api(`/fields/projects/${field}`, 'DELETE');
    console.log(`Removed projects.${field}`);
  } else {
    console.log(`projects.${field} already absent`);
  }
}
console.log('Done.');
