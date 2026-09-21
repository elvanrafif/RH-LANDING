/**
 * Create and seed the editable services collection.
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/setup-directus-services.ts
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
if (!collections.some((c: { collection: string }) => c.collection === 'services')) {
  await api('/collections', 'POST', {
    collection: 'services',
    meta: {
      icon: 'design_services',
      note: 'Layanan yang tampil di situs',
      display_template: '{{title_id}}',
      sort_field: 'sort',
    },
    schema: { name: 'services' },
    fields: [{
      field: 'id', type: 'integer',
      schema: { is_primary_key: true, has_auto_increment: true },
      meta: { hidden: true, readonly: true },
    }],
  });

  const text = (field: string, note: string, width = 'full') => ({
    field, type: 'text', meta: { interface: 'input-multiline', width, required: true, note },
  });
  const fields = [
    text('title_id', 'Judul Bahasa Indonesia, boleh memakai <br/>'),
    text('title_en', 'Judul English, boleh memakai <br/>'),
    text('desc_id', 'Deskripsi Bahasa Indonesia'),
    text('desc_en', 'Deskripsi English'),
    text('tag_id', 'Tag Bahasa Indonesia'),
    text('tag_en', 'Tag English'),
    { field: 'contact_type', type: 'string', meta: { interface: 'input', width: 'half', required: true, note: 'Nilai internal: residential, interior, atau renovation' } },
    { field: 'sort', type: 'integer', meta: { interface: 'input', width: 'half', required: true } },
    { field: 'status', type: 'string', schema: { default_value: 'published' }, meta: {
      interface: 'select-dropdown', width: 'half', required: true,
      options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] },
    } },
  ];
  for (const field of fields) await api('/fields/services', 'POST', field);
  console.log('Created collection `services`.');
} else {
  console.log('Collection `services` already exists.');
}

const existing = await api('/items/services?limit=1&fields=id');
if (existing.length === 0) {
  const rows = [
    {
      title_id: 'Arsitektur<br/>Residensial', title_en: 'Residential Architecture',
      desc_id: 'Rumah tinggal yang dirancang untuk iklim tropis, lanskap lokal, dan cara hidup pemiliknya.',
      desc_en: 'Homes designed for the tropical climate, local landscape, and the way their owners live.',
      tag_id: 'Ground-up · Renovation', tag_en: 'Ground-up · Renovation', contact_type: 'residential', sort: 1, status: 'published',
    },
    {
      title_id: 'Desain Interior', title_en: 'Interior Design',
      desc_id: 'Ruang dalam yang tenang — memadukan material alami, pencahayaan lembut, dan detail yang terjaga.',
      desc_en: 'Quiet interiors — balancing natural materials, gentle light, and restrained detail.',
      tag_id: 'Turnkey · Furnishing', tag_en: 'Turnkey · Furnishing', contact_type: 'interior', sort: 2, status: 'published',
    },
    {
      title_id: 'Manajemen<br/>Konstruksi', title_en: 'Construction Management',
      desc_id: 'Dari material hingga tenaga tukang, kami kelola setiap tahap pembangunan di lapangan — memastikan proyek selesai tuntas, sesuai jadwal, dan sesuai anggaran.',
      desc_en: 'From materials to skilled labor, we manage every stage of construction on site — so your project is delivered complete, on schedule, and on budget.',
      tag_id: 'Materials · Full-service', tag_en: 'Materials · Labor · Full-service', contact_type: 'renovation', sort: 3, status: 'published',
    },
  ];
  await api('/items/services', 'POST', rows);
  console.log(`Seeded ${rows.length} services.`);
} else {
  console.log('Services already exist; skipped seed.');
}
console.log('Done.');
