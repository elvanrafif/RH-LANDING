import React, { useRef, useEffect } from 'react';
import './Marquee.css';
import { MARQUEE_WORDS } from '../data/projects';

// ─── Mobile: RAF loop — kecepatan px/s tetap, immune terhadap iOS animation quirks ───
const MobileMarquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const PX_PER_SEC = 50; // Kecepatan absolut, tidak bergantung font/screen size
    let pos = 0;
    let oneSetWidth = 0;
    let lastTime: number | null = null;
    let raf = 0;
    let running = true;

    const measure = () => {
      // 2 copy di DOM → satu set = setengah scrollWidth
      oneSetWidth = track.scrollWidth / 2;
    };

    const tick = (time: number) => {
      if (!running) return;
      if (lastTime === null) lastTime = time;

      const delta = (time - lastTime) / 1000; // detik
      lastTime = time;

      pos -= PX_PER_SEC * delta;

      // Reset seamless saat sudah geser 1 set penuh
      if (oneSetWidth > 0 && pos <= -oneSetWidth) {
        pos += oneSetWidth;
      }

      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      measure();
      raf = requestAnimationFrame(tick);
    };

    // Tunggu font agar measureWidth akurat
    if (document.fonts?.ready) {
      document.fonts.ready.then(start);
    } else {
      setTimeout(start, 300);
    }

    const onResize = () => measure();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const items: React.ReactNode[] = [];
  for (let i = 0; i < 2; i++) {
    MARQUEE_WORDS.forEach((w, k) => {
      items.push(
        <span key={`${i}-${k}`} className={"marquee__item" + (k % 3 === 1 ? " marquee__item--accent" : "")}>
          {w}<span className="marquee__dot"></span>
        </span>
      );
    });
  }

  return (
    <div className="marquee">
      <div className="marquee__track marquee__track--js" ref={trackRef}>{items}</div>
    </div>
  );
};

// ─── Desktop: CSS animation + JS duration dari actual scrollWidth ───
const DesktopMarquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const PX_PER_SEC = 100;

    const applyDuration = () => {
      const distance = track.scrollWidth * 0.5; // translateX(-50%)
      track.style.animationDuration = `${(distance / PX_PER_SEC).toFixed(2)}s`;
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(applyDuration);
    } else {
      setTimeout(applyDuration, 300);
    }

    window.addEventListener('resize', applyDuration, { passive: true });
    return () => window.removeEventListener('resize', applyDuration);
  }, []);

  const items: React.ReactNode[] = [];
  for (let i = 0; i < 4; i++) {
    MARQUEE_WORDS.forEach((w, k) => {
      items.push(
        <span key={`${i}-${k}`} className={"marquee__item" + (k % 3 === 1 ? " marquee__item--accent" : "")}>
          {w}<span className="marquee__dot"></span>
        </span>
      );
    });
  }

  return (
    <div className="marquee">
      <div className="marquee__track" ref={trackRef}>{items}</div>
    </div>
  );
};

// ─── Export: pilih komponen berdasarkan device ───
export const Marquee: React.FC = () => {
  const isMobile = typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;
  return isMobile ? <MobileMarquee /> : <DesktopMarquee />;
};
