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
const permissions = await api('/permissions?limit=-1&fields=id,collection,action,fields');
const createPermission = permissions.find((item: any) => item.collection === 'inquiries' && item.action === 'create');
if (!createPermission) throw new Error('Public create permission on inquiries not found.');

await api('/collections/inquiries', 'PATCH', {
  meta: { display_template: '{{name}} — {{need}}' },
});

for (const field of ['email', 'project', 'budget', 'message']) {
  if (fields.some((item: any) => item.field === field)) {
    await api(`/fields/inquiries/${field}`, 'DELETE');
    console.log(`- ${field}`);
  }
}

if (!fields.some((item: any) => item.field === 'area')) {
  await api('/fields/inquiries', 'POST', {
    field: 'area', type: 'string',
    meta: { interface: 'input', width: 'half', note: 'Luas area proyek', required: true },
  });
  console.log('+ area');
}

if (!fields.some((item: any) => item.field === 'need')) {
  await api('/fields/inquiries', 'POST', {
    field: 'need', type: 'string',
    meta: {
      interface: 'select-dropdown', width: 'half', note: 'Jenis kebutuhan proyek', required: true,
      options: { choices: [
        { text: 'Design', value: 'design' },
        { text: 'Build', value: 'build' },
        { text: 'Design + Build', value: 'design_build' },
      ] },
    },
    schema: { default_value: 'design' },
  });
  console.log('+ need');
}

if (!fields.some((item: any) => item.field === 'address')) {
  await api('/fields/inquiries', 'POST', {
    field: 'address', type: 'text',
    meta: { interface: 'input-multiline', width: 'full', note: 'Alamat lokasi proyek', required: true },
  });
  console.log('+ address');
}

const allowedFields = ['name', 'whatsapp', 'area', 'need', 'address'];
const currentFields = Array.isArray(createPermission.fields) ? createPermission.fields : [];
if (allowedFields.some((field) => !currentFields.includes(field))) {
  await api(`/permissions/${createPermission.id}`, 'PATCH', { fields: allowedFields });
  console.log('+ public create permission whitelist updated');
}

console.log('Directus inquiries updated.');
