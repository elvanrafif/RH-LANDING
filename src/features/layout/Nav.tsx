import React, { useState, useEffect, useRef } from 'react';
import { HeroVersion } from '../../types';

interface NavProps {
  onNav: (target: string) => void;
  heroVersion: HeroVersion;
}

export const Nav: React.FC<NavProps> = ({ onNav, heroVersion }) => {
  const [scrolled, setScrolled] = useState(window.scrollY > window.innerHeight * 0.85);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroDark = heroVersion === "2";
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > window.innerHeight * 0.85);
      if (y > 240 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const cls = [
    "nav",
    scrolled ? "is-scrolled" : "",
    hidden   ? "is-hidden"   : "",
    heroDark ? "nav--dark"   : "",
    menuOpen ? "is-menu-open" : "",
  ].filter(Boolean).join(" ");

  const handleNav = (id: string) => {
    setMenuOpen(false);
    onNav(id);
  };

  return (
    <nav className={cls}>
      <div className={heroDark ? "nav__inner nav__inner--slim" : "nav__inner"}>
        <div className="nav__col-left">
          {(!heroDark || menuOpen) && (
            <a href="#top" className="nav__logo" onClick={(e) => { e.preventDefault(); handleNav("top"); }}>
              <span className="nav__logo-mark" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="1" y="1" width="20" height="20" stroke="currentColor" strokeWidth="1.1"/>
                  <path d="M1 8 H21 M8 1 V21" stroke="currentColor" strokeWidth="1.1"/>
                  <circle cx="8" cy="8" r="1.6" fill="currentColor"/>
                </svg>
              </span>
              <span className="nav__logo-text">RH Studio<sup>®</sup></span>
            </a>
          )}
          {heroDark && !menuOpen && (
            <div className="nav__mobile-logo">
              <a href="#top" className="nav__logo" onClick={(e) => { e.preventDefault(); handleNav("top"); }}>
                <span className="nav__logo-mark" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="1" y="1" width="20" height="20" stroke="currentColor" strokeWidth="1.1"/>
                    <path d="M1 8 H21 M8 1 V21" stroke="currentColor" strokeWidth="1.1"/>
                    <circle cx="8" cy="8" r="1.6" fill="currentColor"/>
                  </svg>
                </span>
                <span className="nav__logo-text">RH Studio<sup>®</sup></span>
              </a>
            </div>
          )}
        </div>
        
        <div className="nav__links">
          <a href="#about"    className="nav__link" onClick={(e) => { e.preventDefault(); handleNav("about"); }}>
            <span className="nav__link-num">01</span><span>Studio</span>
          </a>
          <a href="#services" className="nav__link" onClick={(e) => { e.preventDefault(); handleNav("services"); }}>
            <span className="nav__link-num">02</span><span>Layanan</span>
          </a>
          <a href="#projects" className="nav__link" onClick={(e) => { e.preventDefault(); handleNav("projects"); }}>
            <span className="nav__link-num">03</span><span>Proyek</span>
          </a>
          <a href="#contact"  className="nav__link" onClick={(e) => { e.preventDefault(); handleNav("contact"); }}>
            <span className="nav__link-num">04</span><span>Kontak</span>
          </a>
        </div>

        <div className="nav__col-right">
          <button 
            className="nav__toggle" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="nav__toggle-label">{menuOpen ? "Tutup" : "Menu"}</span>
            <div className="nav__toggle-icon">
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};
