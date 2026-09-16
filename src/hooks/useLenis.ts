import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Deteksi touch device — biarkan native iOS/Android scroll handle touch.
    // Lenis + native momentum scroll fighting = efek zoom/karet di HP real.
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      // Di touch device: matikan touch handling Lenis sepenuhnya.
      // syncTouch: false (default) tapi pastikan touchMultiplier tidak ikut campur.
      touchMultiplier: isTouchDevice ? 0 : 1.5,
    });

    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};
