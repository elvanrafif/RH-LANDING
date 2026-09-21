import React, { useRef, useEffect } from 'react';
import './HeroTwo.css';
import heroBg from '../../assets/hero-bg.webp';
import { useHeroImages } from '../../data/projectsApi';


export const HeroTwo: React.FC = () => {
  const heroImages = useHeroImages();
  const heroImage = heroImages[0];
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    // Parallax hanya di non-touch (desktop). Di mobile: tidak perlu, malah
    // bisa jadi sumber glitch karena scroll events di touch bisa rapid-fire.
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const onScroll = () => {
      const p = Math.min(1, window.scrollY / window.innerHeight);
      el.style.transform = `translateY(${p * 6}%)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="h2">
      <figure ref={bgRef} className="h2__bg" aria-hidden="true">
        <picture>
          {heroImage?.responsive && <source media="(max-width: 700px)" srcSet={heroImage.responsive} />}
          <img
            className="h2__bg-img"
            src={heroImage?.desktop ?? heroBg}
            alt=""
          />
        </picture>
        <div className="h2__vignette" />
        <div className="h2__overlay" />
      </figure>

      <div className="h2__grain" aria-hidden="true" />
    </section>
  );
};
