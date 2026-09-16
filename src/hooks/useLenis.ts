import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Di mobile / touch device, JANGAN inisialisasi Lenis sama sekali!
    // iOS Safari & Android sudah memiliki 120Hz native momentum scroll hardware-accelerated.
    // Menjalankan Lenis di iOS dengan rAF loop dan limit calculation adalah penyebab
    // utama konflik scroll height dan whitespace di bawah footer pada iPhone real device.
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice) {
      delete (window as any).__lenis;
      return;
    }

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    (window as any).__lenis = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, []);
};
