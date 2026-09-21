import { useEffect, useState } from 'react';
import type { Project } from '../types';

// In dev this goes through the Vite proxy (see vite.config.ts) so requests stay
// same-origin; in production the site and Directus are separate hosts and the
// server's CORS_ORIGIN allows it. Overridable per environment either way.
export const CMS_URL = import.meta.env.VITE_DIRECTUS_URL
  ?? (import.meta.env.DEV ? '/cms' : 'https://cms.rhstudioarsitek.my.id');
const BASE = CMS_URL;

const asset = (id: string, width?: number, format?: string, quality?: number) => {
  const params = new URLSearchParams();
  if (width) params.set('width', String(width));
  if (format) params.set('format', format);
  if (quality) params.set('quality', String(quality));
  const query = params.toString();
  return `${BASE}/assets/${id}${query ? `?${query}` : ''}`;
};

const responsiveAsset = (id: string) => asset(id, 960, 'webp', 90);

export const responsiveSrcSet = (src: string) =>
  [640, 960, 1440].map((width) => `${src.replace('width=960', `width=${width}`)} ${width}w`).join(', ');

// Directus hands back `img` as a file id and `gallery` as junction rows; the
// components want plain URLs, so the shape they see stays exactly as it was
// when this data was a hardcoded array.
const toProject = (raw: any): Project => ({
  ...raw,
  img: responsiveAsset(raw.img),
  gallery: (raw.gallery ?? []).map((g: any) => responsiveAsset(g.directus_files_id)),
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
    .then((json) => (settled = json.data.filter((raw: any) => raw.is_active !== false).map(toProject)))
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

export type HeroImages = { desktop: string; responsive?: string };

let heroInFlight: Promise<HeroImages[]> | null = null;
let heroSettled: HeroImages[] | null = null;

const fileId = (value: unknown) =>
  typeof value === 'string' ? value : (value as { id?: string } | null)?.id ?? '';

export const loadHeroImages = (): Promise<HeroImages[]> =>
  (heroInFlight ??= fetch(`${BASE}/items/hero_image?limit=-1&sort=id&fields=image,image_responsive`)
    .then((r) => {
      if (!r.ok) throw new Error(`Directus ${r.status}`);
      return r.json();
    })
    .then((json) => {
      const rows = Array.isArray(json.data) ? json.data : [json.data];
      return (heroSettled = rows
        .map((item: { image?: unknown; image_responsive?: unknown }) => ({
          desktop: asset(fileId(item.image), 1920, 'webp', 90),
          responsive: item.image_responsive ? asset(fileId(item.image_responsive), 960, 'webp', 90) : undefined,
        }))
        .filter((item: HeroImages) => item.desktop));
    })
    .catch((err) => {
      console.error('[hero_image] gagal memuat dari Directus:', err);
      heroInFlight = null;
      return [];
    }));

export const useHeroImages = (): HeroImages[] => {
  const [images, setImages] = useState<HeroImages[]>(heroSettled ?? []);
  useEffect(() => {
    if (heroSettled) return;
    let alive = true;
    loadHeroImages().then((loaded) => alive && setImages(loaded));
    return () => { alive = false; };
  }, []);
  return images;
};

export type MarqueeItem = { text_id: string; text_en: string };
export type ServiceItem = {
  title_id: string;
  title_en: string;
  desc_id: string;
  desc_en: string;
  tag_id: string;
  tag_en: string;
  contact_type: string;
};

let marqueeInFlight: Promise<MarqueeItem[]> | null = null;
let marqueeSettled: MarqueeItem[] | null = null;

export const loadMarqueeItems = (): Promise<MarqueeItem[]> =>
  (marqueeInFlight ??= fetch(`${BASE}/items/marquee_items?filter[status][_eq]=published&sort=sort&fields=text_id,text_en`)
    .then((r) => {
      if (!r.ok) throw new Error(`Directus ${r.status}`);
      return r.json();
    })
    .then((json) => (marqueeSettled = Array.isArray(json.data) ? json.data : []))
    .catch((err) => {
      console.error('[marquee_items] gagal memuat dari Directus:', err);
      marqueeInFlight = null;
      return [];
    }));

export const useMarqueeItems = (): MarqueeItem[] => {
  const [items, setItems] = useState<MarqueeItem[]>(marqueeSettled ?? []);
  useEffect(() => {
    if (marqueeSettled) return;
    let alive = true;
    loadMarqueeItems().then((loaded) => alive && setItems(loaded));
    return () => { alive = false; };
  }, []);
  return items;
};

let servicesInFlight: Promise<ServiceItem[]> | null = null;
let servicesSettled: ServiceItem[] | null = null;

export const loadServices = (): Promise<ServiceItem[]> =>
  (servicesInFlight ??= fetch(`${BASE}/items/services?filter[status][_eq]=published&sort=sort&fields=title_id,title_en,desc_id,desc_en,tag_id,tag_en,contact_type`)
    .then((r) => {
      if (!r.ok) throw new Error(`Directus ${r.status}`);
      return r.json();
    })
    .then((json) => (servicesSettled = Array.isArray(json.data) ? json.data : []))
    .catch((err) => {
      console.error('[services] gagal memuat dari Directus:', err);
      servicesInFlight = null;
      return [];
    }));

export const useServices = (): ServiceItem[] => {
  const [items, setItems] = useState<ServiceItem[]>(servicesSettled ?? []);
  useEffect(() => {
    if (servicesSettled) return;
    let alive = true;
    loadServices().then((loaded) => alive && setItems(loaded));
    return () => { alive = false; };
  }, []);
  return items;
};
