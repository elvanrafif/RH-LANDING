import React, { useRef, useEffect } from 'react';
import './HeroTwo.css';
import heroBg from '../../assets/hero-bg.webp';

export const HeroTwo: React.FC = () => {
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const onScroll = () => {
      const p = Math.min(1, window.scrollY / window.innerHeight);
      el.style.transform = `translateY(${p * 8}%) scale(1.1)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="h2">
      <figure className="h2__bg" aria-hidden="true">
        <img
          ref={bgRef}
          className="h2__bg-img"
          src={heroBg}
          alt=""
        />
        <div className="h2__vignette" />
        <div className="h2__overlay" />
      </figure>

      <div className="h2__grain" aria-hidden="true" />
    </section>
  );
};
