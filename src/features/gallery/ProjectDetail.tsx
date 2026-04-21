import React, { useEffect, useRef, useState } from 'react';
import { Project } from '../../types';
import { PROJECTS } from '../../data/projects';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    (window as any).__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { lightbox !== null ? setLightbox(null) : onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      (window as any).__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose, lightbox]);

  useEffect(() => {
    if (!project) return;
    const el = scrollRef.current;
    if (!el) return;
    const stopProp = (e: any) => e.stopPropagation();
    el.addEventListener("wheel", stopProp);
    el.addEventListener("touchmove", stopProp);
    return () => {
      el.removeEventListener("wheel", stopProp);
      el.removeEventListener("touchmove", stopProp);
    };
  }, [project]);

  if (!project) return null;
  const p = project;
  const idx = PROJECTS.findIndex((x) => x.id === p.id);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <div className="pd" role="dialog" aria-modal="true" aria-label={`${p.title} ${p.titleAccent}`}>
      <div className="pd__curtain" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>

      <div className="pd__scroll" ref={scrollRef}>
        <div className="pd__topbar">
          <div className="mono pd__crumbs">
            <span>RH Studio</span>
            <span className="pd__sep">/</span>
            <span>Proyek</span>
            <span className="pd__sep">/</span>
            <span className="pd__muted">№ ${String(idx + 1).padStart(2, "0")}</span>
          </div>
          <button className="pd__close" onClick={onClose} aria-label="Tutup">
            <span className="mono">Tutup</span>
            <span className="pd__close-x" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3 L15 15 M15 3 L3 15" stroke="currentColor" strokeWidth="1.1"/>
              </svg>
            </span>
          </button>
        </div>

        <header className="pd__hero">
          <div className="pd__hero-meta">
            <span className="mono pd__muted">{p.type} · {p.year}</span>
            <span className="mono pd__muted">{p.location}</span>
          </div>
          <h1 className="pd__title display">
            {p.title}<br/>
            <em className="italic">{p.titleAccent}.</em>
          </h1>
          <p className="pd__lede">{p.brief}</p>
        </header>

        <figure className="pd__figure pd__figure--lead" onClick={() => setLightbox(0)} data-cursor="Perbesar">
          <img src={p.gallery[0]} alt="" />
          <figcaption className="mono pd__muted">01 — Tampak utama · {p.location}</figcaption>
        </figure>

        <section className="pd__specs">
          <div className="pd__spec"><span className="mono pd__muted">Klien</span><span>{p.client}</span></div>
          <div className="pd__spec"><span className="mono pd__muted">Lokasi</span><span>{p.location}</span></div>
          <div className="pd__spec"><span className="mono pd__muted">Luas</span><span>{p.area}</span></div>
          <div className="pd__spec"><span className="mono pd__muted">Tahun</span><span>{p.year}</span></div>
          <div className="pd__spec"><span className="mono pd__muted">Durasi</span><span>{p.duration}</span></div>
          <div className="pd__spec"><span className="mono pd__muted">Tim</span><span>{p.team}</span></div>
          <div className="pd__spec"><span className="mono pd__muted">Status</span><span>{p.status}</span></div>
          <div className="pd__spec"><span className="mono pd__muted">Tipe</span><span>{p.type}</span></div>
        </section>

        <section className="pd__chapters">
          {p.chapters.map((c, i) => (
            <div key={i} className="pd__chapter">
              <div className="pd__chapter-num mono">0{i + 1} — Bab</div>
              <div className="pd__chapter-body">
                <h3 className="pd__chapter-title display italic">{c.title}</h3>
                <p>{c.body}</p>
              </div>
              <figure className="pd__chapter-fig" onClick={() => setLightbox(i + 1)} data-cursor="Perbesar">
                <img src={p.gallery[(i + 1) % p.gallery.length]} alt="" loading="lazy"/>
                <figcaption className="mono pd__muted">0{i + 2} — {c.title}</figcaption>
              </figure>
            </div>
          ))}
        </section>

        <section className="pd__gallery">
          <div className="pd__gallery-head">
            <span className="mono pd__muted">Galeri</span>
            <span className="mono pd__muted">{p.gallery.length} gambar</span>
          </div>
          <div className="pd__gallery-grid">
            {p.gallery.map((src, i) => (
              <figure key={i} className={`pd__gallery-item pd__gallery-item--${i % 3}`} onClick={() => setLightbox(i)} data-cursor="Perbesar">
                <img src={src} alt="" loading="lazy"/>
                <figcaption className="mono pd__muted">{String(i + 1).padStart(2, "0")}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="pd__next" onClick={() => {
          window.dispatchEvent(new CustomEvent("rh:open-project", { detail: { id: next.id } }));
        }} data-cursor="Proyek selanjutnya →">
          <div className="pd__next-inner">
            <span className="mono pd__muted">Proyek selanjutnya — № {String(((idx + 1) % PROJECTS.length) + 1).padStart(2, "0")}</span>
            <div className="pd__next-title display">
              {next.title} <em className="italic">{next.titleAccent}.</em>
            </div>
            <span className="mono pd__muted">{next.location} · {next.year}</span>
          </div>
          <img src={next.img} alt="" className="pd__next-img"/>
        </section>

        <footer className="pd__foot">
          <span className="mono pd__muted">RH Studio · Arsitek &amp; Interior</span>
          <button className="mono pd__back" onClick={onClose}>↑ Kembali ke beranda</button>
        </footer>
      </div>

      {lightbox != null && (
        <div className="pd__lightbox" onClick={() => setLightbox(null)}>
          <img src={p.gallery[lightbox]} alt=""/>
          <button className="pd__lightbox-close mono" onClick={() => setLightbox(null)}>Tutup ✕</button>
          <div className="pd__lightbox-nav mono">
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + p.gallery.length) % p.gallery.length); }}>← Sebelumnya</button>
            <span>{String(lightbox + 1).padStart(2, "0")} / {String(p.gallery.length).padStart(2, "0")}</span>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % p.gallery.length); }}>Selanjutnya →</button>
          </div>
        </div>
      )}
    </div>
  );
};
