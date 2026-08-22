# Directus

CMS for the projects catalogue and (later) contact-form submissions.
Runs on Coolify at https://cms.rhstudioarsitek.my.id — Directus 11 + Postgres.

## Rebuilding from scratch

    set -a; . ./.env.directus; set +a          # DIRECTUS_URL + DIRECTUS_TOKEN
    node --experimental-strip-types scripts/setup-directus-schema.ts
    node --experimental-strip-types scripts/seed-directus.ts

Both refuse to run against existing data, so neither can duplicate the
catalogue by accident.

`schema.yaml` is a snapshot of the live schema, exported with
`GET /schema/snapshot?export=yaml`. It is the record of what the collections
look like; regenerate it after any schema change so the repo does not drift
from the server.
