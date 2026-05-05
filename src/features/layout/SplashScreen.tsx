import React, { useEffect, useRef } from 'react';
import './SplashScreen.css';
import rhLogo from '../../assets/rh-studio.png';

interface SplashScreenProps {
  onDone: () => void;
  onExiting: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDone, onExiting }) => {
  const logoRef   = useRef<HTMLImageElement>(null);
  const topRef    = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const logo   = logoRef.current;
    const top    = topRef.current;
    const bottom = bottomRef.current;
    if (!logo || !top || !bottom) return;

    let rafId: number;

    function easeInOut(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function animateSweep(duration: number, onComplete: () => void) {
      const start = performance.now();
      function tick() {
        const progress = Math.min(1, (performance.now() - start) / duration);
        const p = -30 + easeInOut(progress) * 160; // -30% → 130%
        logo.style.setProperty('--p', `${p}%`);
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          onComplete();
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    // Hide hero bg until split
    const heroImg = document.querySelector('.h2__bg-img');
    if (heroImg) heroImg.classList.add('h2__bg-img--hidden');

    // Phase 1 — Sweep In (2200ms)
    logo.style.setProperty('--p', '-30%');
    animateSweep(2200, () => {

      // Phase 2 — Hold (800ms)
      holdTimerRef.current = setTimeout(() => {

        // Phase 3 — Sweep Out (1800ms) + Phase 4 Split fires simultaneously on complete
        logo.style.setProperty('--p', '-30%');
        logo.classList.add('splash__logo--sweep-out');
        animateSweep(1800, () => {

          // Phase 4 — Split (fires at exact same moment sweep out ends)
          onExiting();
          top.classList.add('splash__top-panel--exit');
          bottom.classList.add('splash__bottom-panel--exit');

          if (heroImg) {
            heroImg.classList.remove('h2__bg-img--hidden');
            heroImg.classList.add('h2__bg-img--reveal');
          }

          doneTimerRef.current = setTimeout(() => onDone(), 900);
        });

      }, 800);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (doneTimerRef.current) clearTimeout(doneTimerRef.current);
      if (heroImg) heroImg.classList.remove('h2__bg-img--hidden');
    };
  }, [onDone, onExiting]);

  return (
    <div className="splash">
      <div className="splash__top-panel"    ref={topRef} />
      <div className="splash__bottom-panel" ref={bottomRef} />
      <div className="splash__logo-wrap">
        <img
          ref={logoRef}
          className="splash__logo"
          src={rhLogo}
          alt="RH Studio"
        />
      </div>
    </div>
  );
};
