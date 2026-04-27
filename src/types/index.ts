export interface Project {
  id: number;
  title: string;
  titleAccent: string;
  location: string;
  year: number;
  area: string;
  type: string;
  img: string;
  client: string;
  status: string;
  duration: string;
  team: string;
  brief: string;
  brief_en: string;
  chapters: { title: string; body: string }[];
  chapters_en: { title: string; body: string }[];
  gallery: string[];
}

export interface Service {
  num: string;
  title: string;
  en: string;
  desc: string;
  desc_en: string;
  tag: string;
}

export interface Stat {
  num: number;
  sup: string;
  label: string;
  en: string;
}

export type HeroVersion = "1" | "2";

export interface Tweak {
  mode: "light" | "dark";
  accent?: string;
  heroVersion: HeroVersion;
}
