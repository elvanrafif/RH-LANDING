import { useState, useEffect, useCallback } from 'react';
import { Project, HeroVersion } from '../types';
import { useProjects } from '../data/projectsApi';

export const useAppHandlers = (heroVersion: HeroVersion, splashExiting: boolean, splashDone: boolean) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const projects = useProjects();

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

  // Project open handler — pushes a real history entry so the browser
  // Back button and shareable #project-N links both work.
  const onOpenProject = useCallback((p: Project) => {
    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as any });
    }
    if (window.location.hash !== `#project-${p.id}`) {
      window.history.pushState({ projectId: p.id }, "", `#project-${p.id}`);
    }
    setActiveProject(p);
  }, []);

  // Closing goes back through history when the open project came from a
  // pushed state, so Back/Forward and the in-page close control agree.
  const closeProject = useCallback(() => {
    if (window.location.hash.startsWith("#project-")) {
      window.history.back();
    } else {
      setActiveProject(null);
    }
  }, []);

  // Listen for global open-project events
  useEffect(() => {
    const onOpen = (e: any) => {
      const id = e.detail?.id;
      const p = projects.find((x) => x.id === id);
      if (p) onOpenProject(p);
    };
    window.addEventListener("rh:open-project", onOpen);
    return () => window.removeEventListener("rh:open-project", onOpen);
  }, [onOpenProject, projects]);

  // Open/close in sync with browser navigation (Back/Forward) and
  // direct links carrying a #project-N hash.
  useEffect(() => {
    const applyHash = () => {
      const match = window.location.hash.match(/^#project-(\d+)$/);
      const p = match ? projects.find((x) => x.id === Number(match[1])) : null;
      setActiveProject(p || null);
    };
    window.addEventListener("popstate", applyHash);
    applyHash();
    return () => window.removeEventListener("popstate", applyHash);
  }, [projects]);

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
    closeProject,
    onNav
  };
};
