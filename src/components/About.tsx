import React from 'react';
import './About.css';
import { useReveal } from '../hooks/useReveal';

export const About: React.FC = () => {
  const ref = useReveal();
  return (
    <section id="about" className="section container divider-top" ref={ref}>
      <div className="about__grid">
        <div className="about__label mono">
          <span className="kicker">01 / Studio</span>
        </div>
        <h2 className="about__lead reveal">
          Kami percaya bahwa rumah yang baik adalah rumah yang <span className="accent">mendengarkan</span> — pada iklim, pada lanskap, dan pada ritme harian penghuninya.
        </h2>
        <div className="about__cols reveal">
          <div className="about__col">
            <p>
              RH Studio didirikan di Jakarta pada 2014 oleh Rafael Haryanto. Selama satu dekade, kami telah merancang lebih dari 80 rumah dan interior di Indonesia — dari vila di tepi tebing Uluwatu hingga apartemen kecil di tengah kota.
            </p>
            <p>
              Setiap proyek dimulai dengan satu pertanyaan sederhana: bagaimana ruang ini akan dihidupi dua puluh tahun dari sekarang?
            </p>
          </div>
          <div className="about__col">
            <p style={{fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".06em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 10}}>— Approach</p>
            <p>
              We work quietly, slowly, and with care. Our projects balance native materials — teak, terracotta, hand-cast concrete — with the restraint of modern lines.
            </p>
            <p>
              Design is a long conversation, not a single drawing.
            </p>
          </div>
        </div>
        <div className="about__signature reveal">
          <div>
            <div className="mono" style={{color: "var(--muted)"}}>Principal Architect</div>
            <div className="display" style={{fontSize: 28, marginTop: 4}}>Rafael Haryanto, <em style={{color: "var(--accent)"}}>IAI</em></div>
          </div>
          <div style={{textAlign: "right"}}>
            <div className="mono" style={{color: "var(--muted)"}}>Year founded</div>
            <div className="display" style={{fontSize: 28, marginTop: 4}}>MMXIV</div>
          </div>
        </div>
      </div>
    </section>
  );
};
