import React from 'react';
import { useTranslation } from 'react-i18next';
import './Stats.css';
import { STATS } from '../data/projects';
import { useCounter } from '../hooks/useCounter';

const StatCell: React.FC<{ num: number; sup: string; label: string; en: string }> = ({ num, sup, label, en }) => {
  const { i18n } = useTranslation();
  const [val, ref] = useCounter(num);
  const primary   = i18n.language === 'en' ? en    : label;
  const secondary = i18n.language === 'en' ? label : en;
  return (
    <div className="stat" ref={ref as any}>
      <div className="stat__num">
        {val}
        {sup && <span className="stat__num-sup">{sup}</span>}
      </div>
      <div className="stat__label">{primary}</div>
      <div className="stat__en mono">{secondary}</div>
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
