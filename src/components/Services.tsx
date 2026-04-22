import React from 'react';
import './Services.css';
import { SERVICES } from '../data/projects';

export const Services: React.FC = () => {
  return (
    <section id="services" className="section container divider-top">
      <div className="services__head">
        <div className="services__head-num mono"><span className="kicker">02 / Layanan</span></div>
        <h2 className="services__head-title">
          Apa yang kami <em style={{fontStyle: "italic", color: "var(--accent)"}}>kerjakan</em>.
        </h2>
        <div className="services__head-meta mono" style={{color: "var(--muted)"}}>
          <div>Services</div>
          <div>04 disiplin</div>
        </div>
      </div>

      <div>
        {SERVICES.map((s) => (
          <div key={s.num} className="service-row" data-cursor="Selengkapnya →">
            <div className="service-row__num">{s.num}</div>
            <div>
              <div className="service-row__title" dangerouslySetInnerHTML={{ __html: s.title }}></div>
              <div className="mono" style={{color: "var(--muted)", marginTop: 6}}>{s.en}</div>
            </div>
            <div className="service-row__desc">{s.desc}</div>
            <div className="service-row__tag">{s.tag}</div>
            <div className="service-row__arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
