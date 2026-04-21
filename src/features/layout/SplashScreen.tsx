import React, { useEffect, useRef } from 'react';
import './SplashScreen.css';

interface SplashScreenProps {
  onDone: () => void;
  onExiting: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDone, onExiting }) => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const bgRef        = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  const exitTimerRef = useRef<any>(null);
  const doneTimerRef = useRef<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const CELL = 36;
    const GOLD = [201, 169, 110];
    let W: number, H: number, cols: number, rows: number, cells: any[], startTime: number, globalOpacity = 0;

    function easeInOut(t: number) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement!.getBoundingClientRect();
      W = canvas.width  = rect.width;
      H = canvas.height = rect.height;
      cols = Math.ceil(W / CELL) + 1;
      rows = Math.ceil(H / CELL) + 1;
    }

    function buildCells() {
      const total = cols * rows;
      const count = Math.floor(total * 0.18);
      const indices = new Set<number>();
      while (indices.size < count) indices.add(Math.floor(Math.random() * total));
      cells = [];
      indices.forEach(idx => cells.push({
        x: (idx % cols) * CELL,
        y: Math.floor(idx / cols) * CELL,
        delay:    400  + Math.random() * 1800,
        dur:      900  + Math.random() * 600,
        peak:     0.06 + Math.random() * 0.07,
        active:   false,
        nextAt:   0,
        interval: 4000 + Math.random() * 6000,
        phaseStart: 0,
      }));
    }

    function loop() {
      if (!ctx) return;
      const now = performance.now();
      const elapsed = now - startTime;
      globalOpacity = Math.min(1, elapsed / 500);

      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},0.07)`;
      ctx.lineWidth = 1;
      ctx.globalAlpha = globalOpacity;
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) { const x = c*CELL+.5; ctx.moveTo(x,0); ctx.lineTo(x,H); }
      for (let r = 0; r <= rows; r++) { const y = r*CELL+.5; ctx.moveTo(0,y); ctx.lineTo(W,y); }
      ctx.stroke();

      cells.forEach(cell => {
        if (elapsed < cell.delay) return;
        const t = elapsed - cell.delay;
        if (!cell.active) {
          if (t >= cell.nextAt) { cell.active = true; cell.phaseStart = elapsed; }
          else return;
        }
        const p = (elapsed - cell.phaseStart) / cell.dur;
        if (p >= 1) { cell.active = false; cell.nextAt = (elapsed - cell.delay) + cell.interval; return; }
        const wave = p < 0.5 ? easeInOut(p * 2) : easeInOut((1 - p) * 2);
        const a = wave * cell.peak * globalOpacity;
        if (a < 0.005) return;
        ctx.globalAlpha = a * 2;
        ctx.strokeStyle = `rgb(${GOLD[0]},${GOLD[1]},${GOLD[2]})`;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(cell.x + 0.5, cell.y + 0.5, CELL, CELL);
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(loop);
    }

    function onResize() {
      resize();
      buildCells();
    }

    resize();
    buildCells();
    startTime = performance.now();
    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const heroImg = document.querySelector('.h2__bg-img');
    if (heroImg) heroImg.classList.add('h2__bg-img--hidden');

    exitTimerRef.current = setTimeout(() => {
      const bg       = bgRef.current;
      const canvas   = canvasRef.current;
      const progress = progressRef.current;

      if (bg)       bg.classList.add('splash__bg--exit');
      if (progress) progress.classList.add('splash__progress--exit');

      if (heroImg) {
        heroImg.classList.remove('h2__bg-img--hidden');
        heroImg.classList.add('h2__bg-img--reveal');
      }

      if (canvas) canvas.classList.add('splash__canvas--exit');

      if (onExiting) onExiting();

      doneTimerRef.current = setTimeout(() => onDone && onDone(), 1800);
    }, 2600);

    return () => {
      clearTimeout(exitTimerRef.current);
      clearTimeout(doneTimerRef.current);
      const heroImg = document.querySelector('.h2__bg-img');
      if (heroImg) heroImg.classList.remove('h2__bg-img--hidden');
    };
  }, [onDone, onExiting]);

  const fillRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (fillRef.current) fillRef.current.classList.add('splash__progress-fill--go');
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="splash">
      <div className="splash__bg" ref={bgRef} />
      <canvas className="splash__canvas" ref={canvasRef} />
      <div className="splash__progress" ref={progressRef}>
        <div className="splash__progress-fill" ref={fillRef} />
      </div>
    </div>
  );
};
