import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HeroVersion } from '../../types';
import "./Nav.css";

interface NavProps {
  onNav: (target: string) => void;
  heroVersion: HeroVersion;
}

export const Nav: React.FC<NavProps> = ({ onNav, heroVersion }) => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(window.scrollY > 80);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroDark = heroVersion === "2";
  const lastY = useRef(0);

  useEffect(() => {
    // Pakai threshold px tetap (bukan innerHeight * multiplier) agar stabil
    // saat browser chrome mobile muncul/hilang dan innerHeight berubah
    const SCROLL_THRESHOLD = 80;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > SCROLL_THRESHOLD);
      if (y > 240 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (menuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [menuOpen]);

  const cls = [
    "nav",
    scrolled ? "is-scrolled" : "",
    hidden   ? "is-hidden"   : "",
    heroDark ? "nav--dark"   : "",
    menuOpen ? "is-menu-open" : "",
  ].filter(Boolean).join(" ");

  const overlayCls = `nav__overlay${menuOpen ? ' nav__overlay--open' : ''}`;

  const handleNav = (id: string) => {
    setMenuOpen(false);
    onNav(id);
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'id' ? 'en' : 'id');
  };

  const links = (
    <>
      <a href="#about"    className="nav__link" onClick={(e) => { e.preventDefault(); handleNav("about"); }}>
        <span className="nav__link-num">01</span><span>{t('nav.studio')}</span>
      </a>
      <a href="#services" className="nav__link" onClick={(e) => { e.preventDefault(); handleNav("services"); }}>
        <span className="nav__link-num">02</span><span>{t('nav.services')}</span>
      </a>
      <a href="#projects" className="nav__link" onClick={(e) => { e.preventDefault(); handleNav("projects"); }}>
        <span className="nav__link-num">03</span><span>{t('nav.projects')}</span>
      </a>
      <a href="#contact"  className="nav__link" onClick={(e) => { e.preventDefault(); handleNav("contact"); }}>
        <span className="nav__link-num">04</span><span>{t('nav.contact')}</span>
      </a>
    </>
  );

  return (
    <>
      <nav className={cls}>
        <div className="nav__inner">
          <div className="nav__col-left" />

          <div className="nav__links">
            {links}
          </div>

          <div className="nav__col-right">
            <button
              className="nav__lang mono"
              onClick={toggleLang}
              aria-label="Toggle language"
            >
              <span className={i18n.language === 'en' ? 'is-active' : ''}>EN</span>
              <span className="nav__lang-separator">/</span>
              <span className={i18n.language === 'id' ? 'is-active' : ''}>ID</span>
            </button>
            <button
              className="nav__toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="nav__toggle-label">{menuOpen ? t('nav.close') : t('nav.menu')}</span>
              <div className="nav__toggle-icon">
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div className={overlayCls}>
        {links}
      </div>
    </>
  );
};
