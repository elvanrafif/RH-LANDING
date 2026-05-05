import React, { useEffect, useRef } from 'react';
import './SplashScreen.css';
import rhLogo from '../../assets/rh-studio.png';

interface SplashScreenProps {
  onDone: () => void;
  onExiting: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDone, onExiting }) => {
  const logoTopRef    = useRef<HTMLImageElement>(null);
  const logoBottomRef = useRef<HTMLImageElement>(null);
  const topPanelRef   = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);

  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t3 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t4 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const logoTop    = logoTopRef.current;
    const logoBottom = logoBottomRef.current;
    const topPanel   = topPanelRef.current;
    const botPanel   = bottomPanelRef.current;
    if (!logoTop || !logoBottom || !topPanel || !botPanel) return;

    const rafTop = { id: 0 };
    const rafBot = { id: 0 };
    let cancelled = false;

    function easeInOut(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function sweepEl(
      el: HTMLImageElement,
      raf: { id: number },
      duration: number,
      sweepOut: boolean,
      onVisuallyDone?: () => void,
      onComplete?: () => void
    ) {
      el.style.setProperty('--p', '-30%');
      if (sweepOut) el.classList.add('splash__logo--sweep-out');
      else          el.classList.remove('splash__logo--sweep-out');

      const start = performance.now();
      let visualFired = false;

      function tick() {
        if (cancelled) return;
        const progress = Math.min(1, (performance.now() - start) / duration);
        const p = -30 + easeInOut(progress) * 160; // -30% → 130%
        el.style.setProperty('--p', `${p}%`);
        if (!visualFired && p >= 100 && onVisuallyDone) {
          visualFired = true;
          onVisuallyDone();
        }
        if (progress < 1) {
          raf.id = requestAnimationFrame(tick);
        } else {
          onComplete?.();
        }
      }
      raf.id = requestAnimationFrame(tick);
    }

    const heroImg = document.querySelector('.h2__bg-img');
    if (heroImg) heroImg.classList.add('h2__bg-img--hidden');

    // Phase 1a — Sweep In: top section (2500ms)
    sweepEl(logoTop, rafTop, 2500, false, undefined, () => {

      // Phase 1b — Sweep In: bottom section (2000ms), starts 1000ms after top done
      t1.current = setTimeout(() => {
        sweepEl(logoBottom, rafBot, 2000, false, undefined, () => {

          // Phase 2 — Hold (800ms)
          t2.current = setTimeout(() => {

            // Phase 3a — Sweep Out: top section (1800ms)
            sweepEl(logoTop, rafTop, 1800, true, undefined, () => {

              // Phase 3b — Sweep Out: bottom section (1500ms), 600ms after top done
              t3.current = setTimeout(() => {
                sweepEl(logoBottom, rafBot, 1500, true, () => {

                  // Phase 4 — Split fires when bottom visually gone
                  onExiting();
                  topPanel.classList.add('splash__top-panel--exit');
                  botPanel.classList.add('splash__bottom-panel--exit');
                  if (heroImg) {
                    heroImg.classList.remove('h2__bg-img--hidden');
                    heroImg.classList.add('h2__bg-img--reveal');
                  }
                  t4.current = setTimeout(() => onDone(), 900);
                });
              }, 600);
            });

          }, 800);
        });
      }, 1000);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafTop.id);
      cancelAnimationFrame(rafBot.id);
      [t1, t2, t3, t4].forEach(r => { if (r.current) clearTimeout(r.current); });
      if (heroImg) heroImg.classList.remove('h2__bg-img--hidden');
    };
  }, [onDone, onExiting]);

  return (
    <div className="splash">
      <div className="splash__top-panel"    ref={topPanelRef} />
      <div className="splash__bottom-panel" ref={bottomPanelRef} />
      <div className="splash__logo-wrap">
        <div className="splash__logo-group">
          <img ref={logoTopRef}    className="splash__logo splash__logo--section-top"    src={rhLogo} alt="RH Studio" />
          <img ref={logoBottomRef} className="splash__logo splash__logo--section-bottom" src={rhLogo} alt="" />
        </div>
      </div>
    </div>
  );
};
