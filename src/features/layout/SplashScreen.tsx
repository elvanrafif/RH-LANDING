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

  const t0 = useRef<ReturnType<typeof setTimeout> | null>(null);
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

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
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
        const p = -70 + easeOut(progress) * 200; // -70% → 130%
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

    const TOP_IN  = 3500;
    const BOT_IN  = 3200;
    const TOP_OUT = 3500;
    const BOT_OUT = 3200;

    // ── Sweep In ─────────────────────────────────────────────────
    // Top: t=0ms. Bottom: t=400ms. Hold 400ms after BOTH done.
    let topInDone = false;
    let botInDone = false;

    function onBothInDone() {
      if (!topInDone || !botInDone) return;
      t2.current = setTimeout(() => {

        // ── Sweep Out ───────────────────────────────────────────
        // Top: immediately. Bottom: 400ms later.
        // Split when BOTH visually gone.
        let topOutDone = false;
        let botOutDone = false;

        function onBothOutDone() {
          if (!topOutDone || !botOutDone) return;
          onExiting();
          topPanel.classList.add('splash__top-panel--exit');
          botPanel.classList.add('splash__bottom-panel--exit');
          if (heroImg) {
            heroImg.classList.remove('h2__bg-img--hidden');
            heroImg.classList.add('h2__bg-img--reveal');
          }
          t4.current = setTimeout(() => onDone(), 900);
        }

        sweepEl(logoTop, rafTop, TOP_OUT, true, () => {
          topOutDone = true;
          onBothOutDone();
        });

        t3.current = setTimeout(() => {
          sweepEl(logoBottom, rafBot, BOT_OUT, true, () => {
            botOutDone = true;
            onBothOutDone();
          });
        }, 300);

      }, 400);
    }

    // Brief blank screen before sweep in
    t0.current = setTimeout(() => {

      // Top starts at t=0
      sweepEl(logoTop, rafTop, TOP_IN, false, undefined, () => {
        topInDone = true;
        onBothInDone();
      });

      // Bottom starts at t=300ms
      t1.current = setTimeout(() => {
        sweepEl(logoBottom, rafBot, BOT_IN, false, undefined, () => {
          botInDone = true;
          onBothInDone();
        });
      }, 300);

    }, 400);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafTop.id);
      cancelAnimationFrame(rafBot.id);
      [t0, t1, t2, t3, t4].forEach(r => { if (r.current) clearTimeout(r.current); });
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
