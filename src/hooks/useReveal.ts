import { useEffect, useRef } from 'react';

interface RevealOptions {
  repeat?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export const useReveal = (options: RevealOptions = {}) => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            if (!options.repeat) obs.unobserve(el);
          } else if (options.repeat) {
            el.classList.remove("is-in");
          }
        });
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? "0px 0px -10% 0px"
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options.repeat, options.threshold, options.rootMargin]);

  return ref;
};
