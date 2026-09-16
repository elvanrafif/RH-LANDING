import React from 'react';
import { useTranslation } from 'react-i18next';
import './Stats.css';
import { STATS } from '../data/projects';
import { useCounter } from '../hooks/useCounter';
import type { Stat } from '../types';

const InfinityIcon: React.FC = () => (
  <svg
    className="stat__infinity-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.178-8-12.356-8-5.096 0-5.096 8 0 8 5.178 0 7.261-8 12.356-8Z" />
  </svg>
);

const StatCell: React.FC<Stat> = ({ num, num_en, sup, label, en }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const rawTitle = isEn && num_en ? num_en : num;
  const isInfinity = rawTitle === '∞' || rawTitle === 'infinity';
  const isNumeric = typeof rawTitle === 'number' || /^\d+/.test(String(rawTitle));
  const isLongText = !isNumeric && !isInfinity && String(rawTitle).length > 2;
  const [val, ref] = useCounter(isNumeric ? rawTitle : 0);
  const text = isEn ? en : label;

  return (
    <div className={`stat ${isLongText ? 'stat--text' : ''}`} ref={ref as any}>
      <div className={`stat__num ${isLongText ? 'stat__num--text' : ''}`}>
        {isNumeric ? (
          <>
            {val}
            {sup && <span className="stat__num-sup">{sup}</span>}
          </>
        ) : isInfinity ? (
          <InfinityIcon />
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
