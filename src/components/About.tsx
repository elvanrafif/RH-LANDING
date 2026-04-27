import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';
import { useReveal } from '../hooks/useReveal';

export const About: React.FC = () => {
  const { t } = useTranslation();
  const ref = useReveal();
  return (
    <section id="about" className="section container divider-top" ref={ref}>
      <div className="about__grid">
        <div className="about__label mono">
          <span className="kicker">{t('about.kicker')}</span>
        </div>
        <h2 className="about__lead reveal">
          {t('about.lead_before')} <span className="accent">{t('about.lead_accent')}</span> {t('about.lead_after')}
        </h2>
        <div className="about__cols reveal">
          <div className="about__col">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
          </div>
          <div className="about__col">
            <p style={{fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".06em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 10}}>{t('about.approach_label')}</p>
            <p>{t('about.p3')}</p>
            <p>{t('about.p4')}</p>
          </div>
        </div>
        <div className="about__signature reveal">
          <div>
            <div className="mono" style={{color: "var(--muted)"}}>{t('about.principal')}</div>
            <div className="display" style={{fontSize: 28, marginTop: 4}}>Rafael Haryanto, <em style={{color: "var(--accent)"}}>IAI</em></div>
          </div>
          <div style={{textAlign: "right"}}>
            <div className="mono" style={{color: "var(--muted)"}}>{t('about.founded')}</div>
            <div className="display" style={{fontSize: 28, marginTop: 4}}>MMXIV</div>
          </div>
        </div>
      </div>
    </section>
  );
};
