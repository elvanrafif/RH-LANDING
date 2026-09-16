import React from 'react';
import { useTranslation } from 'react-i18next';
import './Stats.css';
import { STATS } from '../data/projects';
import { useCounter } from '../hooks/useCounter';
import type { Stat } from '../types';

const StatCell: React.FC<Stat> = ({ num, num_en, sup, label, en }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const rawTitle = isEn && num_en ? num_en : num;
  const isNumeric = typeof rawTitle === 'number' || /^\d+/.test(String(rawTitle));
  const [val, ref] = useCounter(isNumeric ? rawTitle : 0);
  const text = isEn ? en : label;

  return (
    <div className={`stat ${!isNumeric ? 'stat--text' : ''}`} ref={ref as any}>
      <div className={`stat__num ${!isNumeric ? 'stat__num--text' : ''}`}>
        {isNumeric ? (
          <>
            {val}
            {sup && <span className="stat__num-sup">{sup}</span>}
          </>
        ) : (
          rawTitle
        )}
      </div>
      <div className="stat__label">{text}</div>
    </div>
  );
};

export const Stats: React.FC = () => {
  return (
    <section className="stats">
      {STATS.map((s, i) => <StatCell key={i} {...s} />)}
    </section>
  );
};
