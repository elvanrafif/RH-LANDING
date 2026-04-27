import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Projects.css';
import { PROJECTS } from '../../data/projects';
import { Project } from '../../types';

interface ProjectsProps {
  onOpenProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenProject }) => {
  const { t } = useTranslation();
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const p = max > 0 ? rail.scrollLeft / max : 0;
      setProgress(p);
      setCanPrev(rail.scrollLeft > 8);
      setCanNext(rail.scrollLeft < max - 8);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => rail.removeEventListener("scroll", onScroll);
  }, []);

  const scrollBy = (dir: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector(".project");
    const step = (card ? card.getBoundingClientRect().width : 360) + 32;
    rail.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="projects" className="projects">
      <div className="projects__head">
        <div className="projects__head-label mono"><span className="kicker">{t('projects.kicker')}</span></div>
        <h2 className="projects__head-title">
          {t('projects.title_before')} <em style={{color: "var(--accent)", fontStyle: "italic"}}>{t('projects.title_accent')}</em><br/>{t('projects.title_after')}
        </h2>
        <div className="projects__head-meta mono">
          <div>{t('projects.meta_label')}</div>
          <div>{t('projects.meta_count', { count: String(PROJECTS.length).padStart(2, "0") })}</div>
        </div>
      </div>

      <div className="projects__scroller">
        <div className="projects__rail" ref={railRef}>
          {PROJECTS.map((p, i) => (
            <a key={p.id} className="project" href={`#project-${p.id}`} onClick={(e) => {
              e.preventDefault();
              onOpenProject(p);
            }} data-cursor={t('projects.view_cursor')}>
              <div className="project__media">
                <img src={p.img} alt={`${p.title} ${p.titleAccent}`} loading="lazy" />
                <span className="project__tag">{p.type}</span>
                <span className="project__num">№ {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
              </div>
              <div className="project__body">
                <div className="project__title">
                  {p.title} <em>{p.titleAccent}</em>
                </div>
                <div className="project__meta mono">
                  <div>{p.location}</div>
                  <div>{p.year} · {p.area}</div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="projects__controls">
          <div className="mono" style={{color: "#8A7F72"}}>{t('projects.drag_hint')}</div>
          <div className="projects__progress">
            <div className="projects__progress-fill" style={{width: `${Math.max(0.08, progress) * 100}%`}}></div>
          </div>
          <div className="projects__arrows">
            <button className="projects__arrow" onClick={() => scrollBy(-1)} disabled={!canPrev} aria-label={t('projects.prev')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </button>
            <button className="projects__arrow" onClick={() => scrollBy(1)} disabled={!canNext} aria-label={t('projects.next')}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
