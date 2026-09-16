import { useEffect, useRef, useState } from 'react';

export const useCounter = (target: number | string, duration = 1800) => {
  const ref = useRef<any>(null);
  const [value, setValue] = useState<string | number>(() => {
    return typeof target === 'number' ? 0 : '0';
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parse numeric value, prefix, and suffix (e.g. "100+" -> num: 100, suffix: "+")
    let targetNum = 0;
    let suffix = '';
    let prefix = '';

    if (typeof target === 'number') {
      targetNum = target;
    } else {
      const match = target.match(/^([^\d]*)(\d+)(.*)$/);
      if (match) {
        prefix = match[1] || '';
        targetNum = parseInt(match[2], 10);
        suffix = match[3] || '';
      } else {
        setValue(target);
        return;
      }
    }

    let started = false;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const currentNum = Math.round(targetNum * eased);
            setValue(prefix || suffix ? `${prefix}${currentNum}${suffix}` : currentNum);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return [value, ref] as const;
};
