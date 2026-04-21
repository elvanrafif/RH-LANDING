import React, { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { useTweaks } from './hooks/useTweaks';
import { useAppHandlers } from './hooks/useAppHandlers';

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
  const [splashDone, setSplashDone] = useState(false);
  const [splashExiting, setSplashExiting] = useState(false);

  // Custom hooks
  useLenis();
  const tweaks = useTweaks();
  const heroVersion = tweaks.heroVersion;

  const {
    activeProject,
    setActiveProject,
    onOpenProject,
    onNav
  } = useAppHandlers(heroVersion, splashExiting, splashDone);

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

  // Mark body for nav/cursor adaptation
  useEffect(() => {
    document.body.dataset.heroVersion = heroVersion;
  }, [heroVersion]);

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
      <ProjectDetail project={activeProject} onClose={() => setActiveProject(null)} />
      
      <Cursor />
      
      {!activeProject && (heroVersion !== "2" || splashDone) && (
        <Nav onNav={onNav} heroVersion={heroVersion} />
      )}
      
      {heroVersion === "2" ? <HeroTwo /> : <HeroX />}
      <Marquee />
      <About />
      <Stats />
      <Services />
      <Projects onOpenProject={onOpenProject} />
      <Contact />
      <Footer />
      <Tweaks />

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
