import React, { useState, useEffect, useRef } from 'react';
import './TextOverlay.css';

interface TextOverlayProps {
  isExiting?: boolean;
  skipSplash?: boolean;
}

export const TextOverlay: React.FC<TextOverlayProps> = ({ isExiting, skipSplash }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cwRefs      = useRef<{[key: string]: HTMLSpanElement | null}>({});
  const hasFlipped  = useRef(false);
  const [heroMode, setHeroMode] = useState(!!skipSplash);

  useEffect(() => {
    if (!skipSplash || !containerRef.current) return;
    containerRef.current.classList.add('text-overlay--hero');
    Object.values(cwRefs.current).forEach(el => {
      if (!el) return;
      const c = el.querySelector('.h2__c');
      if (c) { c.classList.remove('h2__c--playing'); c.classList.add('h2__c--settled'); }
    });
    setHeroMode(true);
  }, [skipSplash]);

  useEffect(() => {
    if (!heroMode) return;
    let rafId = 0;
    let targetClip = 0;
    let currentClip = 0;
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    const render = () => {
      rafId = 0;
      const el = containerRef.current;
      if (!el) return;
      const marquee = document.querySelector('.marquee');
      if (!marquee) return;
      const marqueeTop = marquee.getBoundingClientRect().top;
      const vh = window.visualViewport?.height ?? window.innerHeight;

      // Jika marquee sudah di atas layar (hero sudah lewat), sembunyikan untuk performa
      if (marqueeTop <= 0) {
        el.style.display = 'none';
        return;
      }
      el.style.display = '';

      targetClip = Math.max(0, vh - marqueeTop);
      if (isTouchDevice) {
        currentClip += (targetClip - currentClip) * 0.16;
        if (Math.abs(targetClip - currentClip) > 0.5) {
          rafId = requestAnimationFrame(render);
        }
      } else {
        currentClip = targetClip;
      }

      el.style.clipPath = currentClip > 0 ? `inset(0 0 ${currentClip}px 0)` : '';
      el.style.opacity = '';
      el.style.transform = '';
    };

    const handle = () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    };

    window.addEventListener('scroll', handle, { passive: true });
    window.visualViewport?.addEventListener('resize', handle);
    handle();
    return () => {
      window.removeEventListener('scroll', handle);
      window.visualViewport?.removeEventListener('resize', handle);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [heroMode]);

  useEffect(() => {
    if (!isExiting || hasFlipped.current || skipSplash) return;
    hasFlipped.current = true;

    const container = containerRef.current;
    if (!container) return;
    const keys = Object.keys(cwRefs.current);

    const firsts: {[key: string]: DOMRect} = {};
    keys.forEach(key => {
      const el = cwRefs.current[key];
      if (el) firsts[key] = el.getBoundingClientRect();
    });

    container.classList.add('text-overlay--hero');
    void container.offsetHeight;

    keys.forEach(key => {
      const el = cwRefs.current[key];
      if (!el || !firsts[key]) return;
      const last = el.getBoundingClientRect();
      const dx = firsts[key].left - last.left;
      const dy = firsts[key].top  - last.top;
      el.style.transition      = 'none';
      el.style.transform       = `translate(${dx}px, ${dy}px)`;
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const ease = 'cubic-bezier(.16,1,.3,1)';
        const dur  = 900;
        keys.forEach((key, idx) => {
          const el = cwRefs.current[key];
          if (!el) return;
          el.style.transition = `transform ${dur}ms ${ease} ${idx * 20}ms`;
          el.style.transform  = '';
        });

        const totalWait = dur + keys.length * 20 + 80;
        setTimeout(() => {
          keys.forEach(key => {
            const el = cwRefs.current[key];
            if (el) { el.style.transition = ''; el.style.transform = ''; }
          });
          Object.values(cwRefs.current).forEach(el => {
            if (!el) return;
            const c = el.querySelector('.h2__c');
            if (c) { c.classList.remove('h2__c--playing'); c.classList.add('h2__c--settled'); }
          });
          setHeroMode(true);
        }, totalWait);
      });
    });
  }, [isExiting, skipSplash]);

  const row1 = ['R', 'H'];
  const row2 = ['S', 'T', 'U', 'D', 'I', 'O'];
  const setRef = (key: string) => (el: HTMLSpanElement | null) => { cwRefs.current[key] = el; };
  const cClass = skipSplash ? 'h2__c h2__c--settled' : 'h2__c h2__c--playing';

  return (
    <div ref={containerRef} className="text-overlay">
      <div className="h2__row h2__row--rh">
        {row1.map((ch, i) => (
          <span key={i} ref={setRef(`rh${i}`)} className="h2__cw">
            <span className={cClass} style={{ '--i': i } as any}>{ch}</span>
          </span>
        ))}
      </div>
      <div className="h2__row h2__row--studio">
        {row2.map((ch, i) => (
          <span key={i} ref={setRef(`st${i}`)} className="h2__cw">
            <span className={cClass} style={{ '--i': i + 3 } as any}>{ch}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
