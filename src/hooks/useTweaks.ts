import { useState, useEffect } from 'react';
import { Tweak, HeroVersion } from '../types';

export const useTweaks = () => {
  const [tweaks, setTweaks] = useState<Tweak>(() => {
    const saved = (window as any).__TWEAKS__ || {};
    return {
      mode: saved.mode || 'light',
      accent: saved.accent || '#C96F4A',
      heroVersion: (saved.heroVersion as HeroVersion) || '1',
    };
  });

  useEffect(() => {
    const onHeroChange = (e: any) => {
      const version = e.detail?.version;
      if (version) {
        setTweaks((prev) => ({ ...prev, heroVersion: version }));
      }
    };

    window.addEventListener('rh:hero-version', onHeroChange);
    return () => window.removeEventListener('rh:hero-version', onHeroChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-mode', tweaks.mode);
    if (tweaks.accent) {
      document.documentElement.style.setProperty('--accent', tweaks.accent);
    }
  }, [tweaks]);

  return tweaks;
};
