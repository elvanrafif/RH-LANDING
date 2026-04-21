import React from 'react';
import { MARQUEE_WORDS } from '../data/projects';

export const Marquee: React.FC = () => {
  const items: React.ReactNode[] = [];
  for (let i = 0; i < 2; i++) {
    MARQUEE_WORDS.forEach((w, k) => {
      items.push(
        <span key={`${i}-${k}`} className={"marquee__item" + (k % 3 === 1 ? " marquee__item--accent" : "")}>
          {w}
          <span className="marquee__dot"></span>
        </span>
      );
    });
  }
  return (
    <div className="marquee">
      <div className="marquee__track">{items}</div>
    </div>
  );
};
