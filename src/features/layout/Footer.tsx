import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLElement>(null);
  const floatRef  = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const rowRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncHeight = () => {
      const spacer = spacerRef.current;
      const row    = rowRef.current;
      const float  = floatRef.current;
      if (!spacer || !row || !float) return;
      const pb = parseFloat(getComputedStyle(float).paddingBottom) || 0;
      spacer.style.height = (row.offsetHeight + pb) + 'px';
    };
    syncHeight();
    window.addEventListener('resize', syncHeight);
    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  useEffect(() => {
    const handle = () => {
      const el     = floatRef.current;
      const footer = footerRef.current;
      const spacer = spacerRef.current;
      if (!el || !footer || !spacer) return;
      const footerTop    = footer.getBoundingClientRect().top;
      const spacerBottom = spacer.getBoundingClientRect().bottom;
      const vh           = window.innerHeight;

      const clipTop = Math.max(0, footerTop);
      el.style.clipPath = clipTop > 0 ? `inset(${clipTop}px 0 0 0)` : '';

      const overshoot = spacerBottom < vh ? vh - spacerBottom : 0;
      el.style.transform = overshoot > 0 ? `translateY(-${overshoot}px)` : '';
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <>
      <div ref={floatRef} className="footer__float">
        <div ref={rowRef} className="footer__float-row">
          <div className="h2__row h2__row--rh">
            {['R','H'].map((ch, i) => (
              <span key={i} className="h2__cw">
                <span className="h2__c h2__c--settled">{ch}</span>
              </span>
            ))}
          </div>
          <div className="h2__row h2__row--studio footer__big-studio">
            {['S','T','U','D','I','O'].map((ch, i) => (
              <span key={i} className="h2__cw">
                <span className="h2__c h2__c--settled">{ch}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer ref={footerRef} className="footer">
        <div ref={spacerRef} className="footer__big-clip" aria-hidden="true" />
        <div className="footer__grid">
          <div className="footer__col">
            <h4>{t('footer.col_studio')}</h4>
            <p>Jl. Senopati No. 42<br/>Jakarta Selatan 12190<br/>Indonesia</p>
          </div>
          <div className="footer__col">
            <h4>{t('footer.col_contact')}</h4>
            <a href="mailto:halo@rhstudio.id">halo@rhstudio.id</a>
            <a href="tel:+622175904412">+62 21 7590 4412</a>
          </div>
          <div className="footer__col">
            <h4>{t('footer.col_social')}</h4>
            <a href="#">Instagram</a>
            <a href="#">Behance</a>
            <a href="#">LinkedIn</a>
          </div>
          <div className="footer__col">
            <h4>{t('footer.col_nav')}</h4>
            <a href="#about">{t('footer.nav_studio')}</a>
            <a href="#services">{t('footer.nav_services')}</a>
            <a href="#projects">{t('footer.nav_projects')}</a>
            <a href="#contact">{t('footer.nav_contact')}</a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>{t('footer.copyright')}</span>
        </div>
      </footer>
    </>
  );
};
