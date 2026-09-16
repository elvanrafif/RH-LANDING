import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLElement>(null);
  const outerRef  = useRef<HTMLDivElement>(null); // fixed: clipPath saja, TIDAK ada transform
  const innerRef  = useRef<HTMLDivElement>(null); // absolute: transform saja (aman di iOS)
  const spacerRef = useRef<HTMLDivElement>(null);
  const rowRef    = useRef<HTMLDivElement>(null);

  // Sync spacer height ke tinggi floating row (setelah font load agar akurat)
  useEffect(() => {
    const syncHeight = () => {
      const spacer = spacerRef.current;
      const row    = rowRef.current;
      const inner  = innerRef.current;
      if (!spacer || !row || !inner) return;
      const pb = parseFloat(getComputedStyle(inner).paddingBottom) || 0;
      // Gunakan Math.round dan pastikan tidak melebihi tinggi wajar baris teks
      const calculatedHeight = Math.round(row.offsetHeight + pb);
      spacer.style.height = `${calculatedHeight}px`;
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(syncHeight);
    } else {
      syncHeight();
    }
    window.addEventListener('resize', syncHeight);
    window.visualViewport?.addEventListener('resize', syncHeight);
    return () => {
      window.removeEventListener('resize', syncHeight);
      window.visualViewport?.removeEventListener('resize', syncHeight);
    };
  }, []);

  // Scroll reveal + overshoot positioning
  useEffect(() => {
    let rafId = 0;
    const handle = () => {
      // RAF throttle — scroll events bisa >60fps, tapi update visual cukup 1x per frame
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
        const vh           = window.visualViewport?.height ?? window.innerHeight;

        // Jika footer belum terlihat sama sekali, sembunyikan outer floating container
        if (footerTop >= vh) {
          outer.style.display = 'none';
          return;
        } else {
          outer.style.display = '';
        }

        // clipPath pada outer FIXED element — tidak ada transform di sini
        // → tidak terjadi iOS phantom scroll height
        const clipTop = Math.max(0, footerTop);
        outer.style.clipPath = clipTop > 0 ? `inset(${clipTop}px 0 0 0)` : '';

        // transform pada inner ABSOLUTE element — aman di iOS, tidak inflate scroll height
        const overshoot = spacerBottom < vh ? vh - spacerBottom : 0;
        inner.style.transform = overshoot > 0 ? `translate3d(0, -${overshoot}px, 0)` : '';
      });
    };

    window.addEventListener('scroll', handle, { passive: true });
    window.visualViewport?.addEventListener('resize', handle);
    handle();
    return () => {
      window.removeEventListener('scroll', handle);
      window.visualViewport?.removeEventListener('resize', handle);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Outer: position:fixed, HANYA clipPath — tidak ada transform agar iOS tidak inflate scroll height */}
      <div ref={outerRef} className="footer__float">
        {/* Inner: position:absolute, transform di sini aman untuk iOS */}
        <div ref={innerRef} className="footer__float-inner">
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

