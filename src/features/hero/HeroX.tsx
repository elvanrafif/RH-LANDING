import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './HeroX.css';
import { useHeroAnimation } from './useHeroAnimation';
import { useHeroImages } from '../../data/projectsApi';

const TILE_LAYOUT = [
  { depth: 18, cls: "t1" },
  { depth: 12, cls: "t2" },
  { depth: 24, cls: "t3" },
  { depth: 8, cls: "t4" },
  { depth: 16, cls: "t5" },
];

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=900&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80",
];

export const HeroX: React.FC = () => {
  const { t } = useTranslation();
  const heroImages = useHeroImages();
  const [loaded, setLoaded] = useState(false);
  const heroRef = useHeroAnimation();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="top" className={`heroX ${loaded ? 'is-loaded' : ''}`} ref={heroRef as any}>
      <div className="heroX__grid" aria-hidden="true">
        <span></span><span></span><span></span><span></span><span></span><span></span>
      </div>

      <div className="heroX__topbar">
        <div className="heroX__meta">
          <span className="mono">RH Studio Architects</span>
          <span className="mono heroX__muted">{t('hero.topbar_est')}</span>
        </div>
        <div className="heroX__meta heroX__meta--right">
          <span className="mono">06°12′S · 106°49′E</span>
          <span className="mono heroX__muted">{t('hero.topbar_edition')}</span>
        </div>
      </div>

      <div className="heroX__tiles" aria-hidden="true">
        {(heroImages.length ? heroImages.slice(0, TILE_LAYOUT.length) : FALLBACK_IMAGES).map((src, i) => {
          const tile = TILE_LAYOUT[i];
          return (
          <div key={src} className={`heroX__tile heroX__tile--${tile.cls}`} style={{ "--d": `${0.6 + i * 0.12}s` } as any} data-parallax={tile.depth}>
            <div className="heroX__tile-inner">
              <img src={src} alt="" loading="eager" />
            </div>
          </div>
          );
        })}
      </div>

      <div className="heroX__type">
        <div className="heroX__eyebrow mono">
          <span className="heroX__eyebrow-dot"></span>
          <span>{t('hero.eyebrow')}</span>
        </div>

        <h1 className="heroX__title display">
          <span className="heroX__line">
            <span className="heroX__word" style={{ "--wd": "0.15s" } as any}>{t('hero.line1_w1')}</span>
            {" "}
            <span className="heroX__word" style={{ "--wd": "0.22s" } as any}>{t('hero.line1_w2')}</span>
          </span>
          <span className="heroX__line heroX__line--2">
            <span className="heroX__word" style={{ "--wd": "0.3s" } as any}>{t('hero.line2_w1')}</span>
            {" "}
            <span className="heroX__amp display italic" style={{ "--wd": "0.38s" } as any}>&amp;</span>
            {" "}
            <span className="heroX__word heroX__word--accent italic" style={{ "--wd": "0.46s" } as any}>{t('hero.line2_w3')}</span>
          </span>
          <span className="heroX__line heroX__line--3">
            <span className="heroX__word" style={{ "--wd": "0.54s" } as any}>{t('hero.line3_pre')}</span>
            {" "}
            <span className="heroX__rotator" style={{ "--wd": "0.62s" } as any}>
              <span className="heroX__rotator-track">
                {(t('hero.rotating', { returnObjects: true }) as string[]).map((w, i) => (
                  <span key={i} className="heroX__rotator-item italic">{w}</span>
                ))}
              </span>
            </span>
          </span>
        </h1>
      </div>

      <div className="heroX__foot">
        <p className="heroX__lede">
          <span className="heroX__lede-mark">⟶</span>
          {t('hero.lede')}
        </p>

        <a href="#projects" className="heroX__cta" data-cursor={t('hero.cta_cursor')} onClick={(e) => {
          e.preventDefault();
          const el = document.getElementById("projects");
          if (el) window.scrollTo({top: el.offsetTop - 20, behavior: "smooth"});
        }}>
          <span className="heroX__cta-ring"></span>
          <span className="heroX__cta-label mono">{t('hero.cta')}</span>
          <svg className="heroX__cta-arrow" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 14 L14 4 M14 4 H6 M14 4 V12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
          </svg>
        </a>
      </div>

      <div className="heroX__scroll">
        <span className="mono heroX__muted">{t('hero.scroll')}</span>
        <span className="heroX__scroll-rail"><span className="heroX__scroll-dot"></span></span>
      </div>
    </section>
  );
};
