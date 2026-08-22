/**
 * Create the `projects` collection in Directus, with the interfaces that make
 * it editable by a non-engineer (dropdowns, file pickers, chapter repeaters).
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/setup-directus-schema.ts
 *
 * Re-running is a no-op: it stops if `projects` already exists.
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

if ((await api('/collections')).some((c: any) => c.collection === 'projects')) {
  console.error('`projects` already exists — delete it first if you meant to rebuild.');
  process.exit(1);
}

const text = (field: string, width = 'half', extra = {}) =>
  ({ field, type: 'string', meta: { interface: 'input', width, ...extra } });

// Two sub-fields per chapter, rendered as a repeater the client can add rows to.
const chapterRepeater = (field: string, note: string) => ({
  field, type: 'json',
  meta: {
    interface: 'list', note,
    options: { template: '{{title}}', fields: [
      { field: 'title', name: 'Judul', type: 'string', meta: { interface: 'input', width: 'full' } },
      { field: 'body',  name: 'Isi',   type: 'text',   meta: { interface: 'input-multiline', width: 'full' } },
    ]},
  },
});

console.log('Creating collection `projects`…');
await api('/collections', 'POST', {
  collection: 'projects',
  meta: { icon: 'architecture', note: 'Proyek yang tampil di situs', display_template: '{{title}} {{titleAccent}}', sort_field: 'id' },
  schema: { name: 'projects' },
  fields: [{
    field: 'id', type: 'integer',
    schema: { is_primary_key: true, has_auto_increment: true },
    meta: { interface: 'input', readonly: true, hidden: true },
  }],
});

const fields: any[] = [
  text('title', 'half', { required: true, note: 'Kata pertama judul, mis. "Rumah"' }),
  text('titleAccent', 'half', { note: 'Kata kedua, tampil dengan warna aksen, mis. "Kanyon"' }),
  text('location'),
  { field: 'year', type: 'integer', meta: { interface: 'input', width: 'half' } },
  text('area', 'half', { note: 'mis. "420m²"' }),
  { field: 'type', type: 'string', meta: { interface: 'select-dropdown', width: 'half',
    options: { choices: [{ text: 'Residential', value: 'Residential' }, { text: 'Interior', value: 'Interior' }] } } },
  { field: 'status', type: 'string', meta: { interface: 'select-dropdown', width: 'half',
    options: { choices: [{ text: 'Selesai', value: 'Selesai' }, { text: 'Berjalan', value: 'Berjalan' }] } } },
  text('client'), text('duration', 'half', { note: 'mis. "18 bulan"' }), text('team', 'half', { note: 'mis. "4 arsitek"' }),
  { field: 'img', type: 'uuid', meta: { interface: 'file', special: ['file'], width: 'half', note: 'Gambar utama / thumbnail' } },
  { field: 'brief', type: 'text', meta: { interface: 'input-multiline', note: 'Ringkasan, Bahasa Indonesia' } },
  { field: 'brief_en', type: 'text', meta: { interface: 'input-multiline', note: 'Ringkasan, English' } },
  chapterRepeater('chapters', 'Bab cerita proyek, Bahasa Indonesia'),
  chapterRepeater('chapters_en', 'Bab cerita proyek, English'),
];
for (const f of fields) { await api('/fields/projects', 'POST', f); console.log(`  + ${f.field}`); }

// img is a single file: point it at directus_files.
await api('/relations', 'POST', {
  collection: 'projects', field: 'img', related_collection: 'directus_files',
  schema: { on_delete: 'SET NULL' },
});
console.log('  ~ relation img → directus_files');

// gallery is many files, which in Directus means a junction table.
await api('/fields/projects', 'POST', {
  field: 'gallery', type: 'alias',
  meta: { interface: 'files', special: ['files'], note: 'Galeri, bisa beberapa gambar' },
});
await api('/collections', 'POST', {
  collection: 'projects_files', meta: { hidden: true, icon: 'import_export' }, schema: { name: 'projects_files' },
  fields: [{ field: 'id', type: 'integer', schema: { is_primary_key: true, has_auto_increment: true }, meta: { hidden: true } }],
});
await api('/fields/projects_files', 'POST', { field: 'projects_id', type: 'integer', schema: {}, meta: { hidden: true } });
await api('/fields/projects_files', 'POST', { field: 'directus_files_id', type: 'uuid', schema: {}, meta: { hidden: true } });
await api('/relations', 'POST', {
  collection: 'projects_files', field: 'projects_id', related_collection: 'projects',
  meta: { one_field: 'gallery', sort_field: null, junction_field: 'directus_files_id' },
  schema: { on_delete: 'CASCADE' },
});
await api('/relations', 'POST', {
  collection: 'projects_files', field: 'directus_files_id', related_collection: 'directus_files',
  meta: { one_field: null, sort_field: null, junction_field: 'projects_id' },
  schema: { on_delete: 'CASCADE' },
});
console.log('  + gallery (m2m via projects_files)');
console.log('Done.');
