import { useState, useEffect, useCallback } from 'react';
import { Project, HeroVersion } from '../types';
import { PROJECTS } from '../data/projects';

export const useAppHandlers = (heroVersion: HeroVersion, splashExiting: boolean, splashDone: boolean) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Lock scroll while splash is active
  useEffect(() => {
    if (heroVersion !== "2" || splashExiting || splashDone) return;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    (window as any).__lenis?.stop();
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      (window as any).__lenis?.start();
    };
  }, [heroVersion, splashExiting, splashDone]);

  // Project open handler
  const onOpenProject = useCallback((p: Project) => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as any });
    }
    setActiveProject(p);
  }, []);

  // Listen for global open-project events
  useEffect(() => {
    const onOpen = (e: any) => {
      const id = e.detail?.id;
      const p = PROJECTS.find((x) => x.id === id);
      if (p) onOpenProject(p);
    };
    window.addEventListener("rh:open-project", onOpen);
    return () => window.removeEventListener("rh:open-project", onOpen);
  }, [onOpenProject]);

  // Smooth scroll with transition
  const onNav = useCallback((id: string) => {
    const target = id === "top" ? document.body : document.getElementById(id);
    if (!target) return;
    const overlay = document.getElementById("page-transition");
    if (overlay) {
      overlay.classList.add("is-active");
      setTimeout(() => {
        const y = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - 20;
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(y, { immediate: true });
        } else {
          window.scrollTo({ top: y, behavior: "instant" as any });
        }
        overlay.classList.remove("is-active");
        overlay.classList.add("is-leaving");
        setTimeout(() => overlay.classList.remove("is-leaving"), 700);
      }, 700);
    }
  }, []);

  return {
    activeProject,
    setActiveProject,
    onOpenProject,
    onNav
  };
};
