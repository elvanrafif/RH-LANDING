import React, { useState, useEffect, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import { useTweaks } from './hooks/useTweaks';
import { Project } from './types';
import { PROJECTS } from './data/projects';

// Components
import { SplashScreen } from './features/layout/SplashScreen';
import { TextOverlay } from './features/hero/TextOverlay';
import { Cursor } from './features/layout/Cursor';
import { Nav } from './features/layout/Nav';
import { HeroX } from './features/hero/HeroX';
import { HeroTwo } from './features/hero/HeroTwo';
import { Marquee } from './components/Marquee';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { Services } from './components/Services';
import { Projects } from './features/gallery/Projects';
import { Contact } from './components/Contact';
import { Footer } from './features/layout/Footer';
import { Tweaks } from './components/Tweaks';
import { ProjectDetail } from './features/gallery/ProjectDetail';

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [splashDone, setSplashDone] = useState(false);
  const [splashExiting, setSplashExiting] = useState(false);

  // Custom hooks
  useLenis();
  const tweaks = useTweaks();
  const heroVersion = tweaks.heroVersion;

  // Sync splashDone if heroVersion is kinetic (1) on mount
  useEffect(() => {
    const saved = (window as any).__TWEAKS__ || {};
    if (saved.heroVersion !== "2") {
      setSplashDone(true);
    }
  }, []);

  // Handle hero version change scrolling
  useEffect(() => {
    const onHeroChange = () => {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" as any });
      }
    };
    window.addEventListener("rh:hero-version", onHeroChange);
    return () => window.removeEventListener("rh:hero-version", onHeroChange);
  }, []);

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

  // Mark body for nav/cursor adaptation
  useEffect(() => {
    document.body.dataset.heroVersion = heroVersion;
  }, [heroVersion]);

  // Listen for project open events
  useEffect(() => {
    const onOpen = (e: any) => {
      const id = e.detail?.id;
      const p = PROJECTS.find((x) => x.id === id);
      if (p) {
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo({ top: 0, behavior: "instant" as any });
        }
        setActiveProject(p);
      }
    };
    window.addEventListener("rh:open-project", onOpen);
    return () => window.removeEventListener("rh:open-project", onOpen);
  }, []);

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

  // Intersection observer for .reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add("is-in");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [splashDone]);

  return (
    <React.Fragment>
      {heroVersion === "2" && !splashDone && (
        <SplashScreen
          onDone={() => setSplashDone(true)}
          onExiting={() => setSplashExiting(true)}
        />
      )}
      {heroVersion === "2" && (
        <TextOverlay
          isExiting={splashExiting}
          skipSplash={splashDone && !splashExiting}
        />
      )}
      <Cursor />
      <Nav onNav={onNav} />
      {heroVersion === "2" ? <HeroTwo /> : <HeroX />}
      <Marquee />
      <About />
      <Stats />
      <Services />
      <Projects />
      <Contact />
      <Footer />
      <Tweaks />
      <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />

      {/* Page transition overlay */}
      <div id="page-transition" className="page-transition" aria-hidden="true">
        <div className="page-transition__panel"></div>
        <div className="page-transition__panel"></div>
        <div className="page-transition__panel"></div>
        <div className="page-transition__panel"></div>
      </div>
    </React.Fragment>
  );
}

export default App;
