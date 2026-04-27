import React from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';
import { SERVICES } from '../data/projects';

export const Services: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <section id="services" className="section container divider-top">
      <div className="services__head">
        <div className="services__head-num mono"><span className="kicker">{t('services.kicker')}</span></div>
        <h2 className="services__head-title">
          {t('services.title_before')} <em style={{fontStyle: "italic", color: "var(--accent)"}}>{t('services.title_accent')}</em>{t('services.title_after')}
        </h2>
        <div className="services__head-meta mono" style={{color: "var(--muted)"}}>
          <div>{t('services.meta_label')}</div>
          <div>{t('services.meta_count')}</div>
        </div>
      </div>

      <div>
        {SERVICES.map((s) => (
          <div key={s.num} className="service-row" data-cursor={t('services.more')}>
            <div className="service-row__num">{s.num}</div>
            <div>
              <div className="service-row__title" dangerouslySetInnerHTML={{ __html: isEn ? s.en : s.title }}></div>
              <div className="mono" style={{color: "var(--muted)", marginTop: 6}}>{isEn ? s.title.replace('<br/>', ' ') : s.en}</div>
            </div>
            <div className="service-row__desc">{isEn ? s.desc_en : s.desc}</div>
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
