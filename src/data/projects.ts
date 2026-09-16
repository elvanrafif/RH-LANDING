import type { Service, Stat } from '../types';

export const SERVICES: Service[] = [
  { num: "01", title: "Arsitektur<br/>Residensial", en: "Residential Architecture", desc: "Rumah tinggal yang dirancang untuk iklim tropis, lanskap lokal, dan cara hidup pemiliknya.", desc_en: "Homes designed for the tropical climate, local landscape, and the way their owners live.", tag: "Ground-up · Renovation", contactType: "residential" },
  { num: "02", title: "Desain Interior", en: "Interior Design", desc: "Ruang dalam yang tenang — memadukan material alami, pencahayaan lembut, dan detail yang terjaga.", desc_en: "Quiet interiors — balancing natural materials, gentle light, and restrained detail.", tag: "Turnkey · Furnishing", contactType: "interior" },
  { num: "03", title: "Konsultasi Lanskap", en: "Landscape Consulting", desc: "Taman dan halaman yang tumbuh bersama rumah, menghubungkan penghuni dengan alam di sekitar.", desc_en: "Gardens and courtyards that grow with the house, connecting its inhabitants with the surrounding nature.", tag: "Garden · Courtyard", contactType: "consult" },
  { num: "04", title: "Pengawasan Pembangunan", en: "Construction Supervision", desc: "Mengawasi kualitas material dan ketepatan detail di lapangan — dari proses pembangunan hingga serah terima, sesuai jadwal dan anggaran.", desc_en: "Overseeing material quality and precision of detail on site — from groundbreaking to handover, on schedule and on budget.", tag: "Full-service", contactType: "renovation" },
];

export const STATS: Stat[] = [
  { num: "15", sup: "+", label: "Tahun Berkarya", en: "Years of practice" },
  { num: "100", sup: "+", label: "Proyek Selesai", en: "Completed projects" },
  { num: "24", sup: "", label: "Penghargaan", en: "Awards & features" },
  { num: "8", sup: "", label: "Arsitek & Desainer", en: "Architects & designers" },
];

export const MARQUEE_WORDS = [
  "Design", "Build", "Architecture", "Interior", "Residential", "Crafted", "Precision", "Timeless",
];

export const ROTATING_WORDS = ["Tenang", "Terang", "Membumi", "Puitis"];
