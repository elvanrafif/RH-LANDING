import React from 'react';
import './Stats.css';
import { STATS } from '../data/projects';
import { useCounter } from '../hooks/useCounter';

const StatCell: React.FC<{ num: number; sup: string; label: string; en: string }> = ({ num, sup, label, en }) => {
  const [val, ref] = useCounter(num);
  return (
    <div className="stat" ref={ref as any}>
      <div className="stat__num">
        {val}
        {sup && <span className="stat__num-sup">{sup}</span>}
      </div>
      <div className="stat__label">{label}</div>
      <div className="stat__en mono">{en}</div>
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
