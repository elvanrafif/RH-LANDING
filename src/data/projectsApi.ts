import { useEffect, useState } from 'react';
import type { Project } from '../types';

// In dev this goes through the Vite proxy (see vite.config.ts) so requests stay
// same-origin; in production the site and Directus are separate hosts and the
// server's CORS_ORIGIN allows it. Overridable per environment either way.
const BASE = import.meta.env.VITE_DIRECTUS_URL
  ?? (import.meta.env.DEV ? '/cms' : 'https://cms.rhstudioarsitek.my.id');

const asset = (id: string, width?: number) =>
  `${BASE}/assets/${id}${width ? `?width=${width}` : ''}`;

// Directus hands back `img` as a file id and `gallery` as junction rows; the
// components want plain URLs, so the shape they see stays exactly as it was
// when this data was a hardcoded array.
const toProject = (raw: any): Project => ({
  ...raw,
  img: asset(raw.img, 1600),
  gallery: (raw.gallery ?? []).map((g: any) => asset(g.directus_files_id, 1600)),
});

// One request per page load, shared by every caller. `settled` lets a
// component that mounts later (ProjectDetail) start with the data already in
// hand instead of rendering one empty frame first.
let inFlight: Promise<Project[]> | null = null;
let settled: Project[] | null = null;

export const loadProjects = (): Promise<Project[]> =>
  (inFlight ??= fetch(`${BASE}/items/projects?limit=-1&sort=id&fields=*,gallery.directus_files_id`)
    .then((r) => {
      if (!r.ok) throw new Error(`Directus ${r.status}`);
      return r.json();
    })
    .then((json) => (settled = json.data.map(toProject)))
    .catch((err) => {
      console.error('[projects] gagal memuat dari Directus:', err);
      inFlight = null; // let a later mount retry
      return [];
    }));

export const useProjects = (): Project[] => {
  const [projects, setProjects] = useState<Project[]>(settled ?? []);
  useEffect(() => {
    if (settled) return;
    let alive = true;
    loadProjects().then((p) => alive && setProjects(p));
    return () => { alive = false; };
  }, []);
  return projects;
};
