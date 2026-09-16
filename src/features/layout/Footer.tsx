import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLElement>(null);
  const outerRef  = useRef<HTMLDivElement>(null); // fixed: clipPath saja
  const innerRef  = useRef<HTMLDivElement>(null); // absolute: transform saja
  const spacerRef = useRef<HTMLDivElement>(null);
  const rowRef    = useRef<HTMLDivElement>(null);

  // Sync spacer height ke tinggi floating row (hanya desktop/mouse pointer)
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      if (spacerRef.current) spacerRef.current.style.height = '0px';
      return;
    }

    const syncHeight = () => {
      const spacer = spacerRef.current;
      const row    = rowRef.current;
      const inner  = innerRef.current;
      if (!spacer || !row || !inner) return;
      const pb = parseFloat(getComputedStyle(inner).paddingBottom) || 0;
      spacer.style.height = `${Math.round(row.offsetHeight + pb)}px`;
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(syncHeight);
    } else {
      syncHeight();
    }
    window.addEventListener('resize', syncHeight);
    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  // Scroll reveal + overshoot positioning (hanya desktop/mouse pointer)
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let rafId = 0;
    const handle = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const outer  = outerRef.current;
        const inner  = innerRef.current;
        const footer = footerRef.current;
        const spacer = spacerRef.current;
        if (!outer || !inner || !footer || !spacer) return;

        const footerTop    = footer.getBoundingClientRect().top;
        const spacerBottom = spacer.getBoundingClientRect().bottom;
        const vh           = window.innerHeight;

        if (footerTop >= vh) {
          outer.style.display = 'none';
          return;
        } else {
          outer.style.display = '';
        }

        const clipTop = Math.max(0, footerTop);
        outer.style.clipPath = clipTop > 0 ? `inset(${clipTop}px 0 0 0)` : '';

        const overshoot = spacerBottom < vh ? vh - spacerBottom : 0;
        inner.style.transform = overshoot > 0 ? `translate3d(0, -${overshoot}px, 0)` : '';
      });
    };

    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => {
      window.removeEventListener('scroll', handle);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const rhStudioContent = (
    <div className="footer__big-text-row">
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
  );

  return (
    <>
      {/* Desktop only: Floating overlay with clip-path transition */}
      <div ref={outerRef} className="footer__float footer__float--desktop" aria-hidden="true">
        <div ref={innerRef} className="footer__float-inner">
          <div ref={rowRef} className="footer__float-row">
            {rhStudioContent}
          </div>
        </div>
      </div>

      <footer ref={footerRef} className="footer">
        {/* Mobile only: Static text directly in DOM flow, perfectly responsive & zero phantom whitespace */}
        <div className="footer__static-hero">
          {rhStudioContent}
        </div>

        {/* Desktop spacer */}
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

