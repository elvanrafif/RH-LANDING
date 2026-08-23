/**
 * Build the Editor role the studio's client logs in with: enough to run the
 * content, nothing that can break the site.
 *
 *   set -a; . ./.env.directus; set +a
 *   node --experimental-strip-types scripts/setup-directus-editor-role.ts
 *
 * Creating the user (and their password) is deliberately left to a human.
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

const POLICY = 'Editor Konten';
const ROLE = 'Editor';

// Full control over the catalogue. `projects_files` is the junction behind the
// gallery field — without it the client can edit a project but every gallery
// image they add is dropped on save, with no error to explain why.
const GRANTS: Record<string, string[]> = {
  projects:       ['create', 'read', 'update', 'delete'],
  projects_files: ['create', 'read', 'update', 'delete'],
  directus_files: ['create', 'read', 'update', 'delete'],
  // No `create`: enquiries come from the public form, so anything appearing
  // here is genuinely from a visitor. Delete is for clearing spam.
  inquiries:      ['read', 'update', 'delete'],
};

const policies = await api('/policies?limit=-1&fields=id,name');
let policy = policies.find((p: any) => p.name === POLICY);
if (policy) console.log(`= policy "${POLICY}" sudah ada`);
else {
  policy = await api('/policies', 'POST', {
    name: POLICY, icon: 'badge',
    description: 'Kelola konten proyek dan lihat permintaan masuk. Tanpa akses Settings.',
    app_access: true,   // required, or the account cannot open the admin UI at all
    admin_access: false, // the whole point of the role
    enforce_tfa: false,
  });
  console.log(`+ policy "${POLICY}"`);
}

const existingPerms = await api('/permissions?limit=-1&fields=id,policy,collection,action');
for (const [collection, actions] of Object.entries(GRANTS)) {
  for (const action of actions) {
    if (existingPerms.some((p: any) => p.policy === policy.id && p.collection === collection && p.action === action)) {
      console.log(`  = ${action} ${collection}`); continue;
    }
    await api('/permissions', 'POST', {
      policy: policy.id, collection, action,
      fields: ['*'], permissions: {}, validation: {},
    });
    console.log(`  + ${action} ${collection}`);
  }
}

const roles = await api('/roles?limit=-1&fields=id,name');
let role = roles.find((r: any) => r.name === ROLE);
if (role) console.log(`= role "${ROLE}" sudah ada`);
else {
  role = await api('/roles', 'POST', { name: ROLE, icon: 'stylus_note', description: 'Pengelola konten situs' });
  console.log(`+ role "${ROLE}"`);
}

const access = await api('/access?limit=-1&fields=id,role,policy');
if (access.some((a: any) => a.role === role.id && a.policy === policy.id)) console.log('= policy sudah menempel ke role');
else { await api('/access', 'POST', { role: role.id, policy: policy.id, sort: 1 }); console.log('+ policy ditempelkan ke role'); }

console.log('\nSelesai. Buat user lewat UI: User Directory → + → email, password, Role = Editor.');
