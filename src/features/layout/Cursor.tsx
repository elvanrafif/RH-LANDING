import React, { useEffect } from 'react';

export const Cursor: React.FC = () => {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;
    const dot = cursor.querySelector(".cursor__dot") as HTMLElement;
    const ring = cursor.querySelector(".cursor__ring") as HTMLElement;
    const label = cursor.querySelector(".cursor__label") as HTMLElement;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf: number;

    const darkSelectors = ".h2, .projects, .footer";
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (label) label.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      const el = document.elementFromPoint(mx, my);
      if (el && el.closest(darkSelectors)) {
        cursor.classList.add("is-dark");
      } else {
        cursor.classList.remove("is-dark");
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        cursor.classList.add("is-hover");
        if (label) label.textContent = t.getAttribute("data-cursor") || "";
      }
    };
    const out = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t && !t.contains(e.relatedTarget as Node)) {
        cursor.classList.remove("is-hover");
        if (label) label.textContent = "";
      }
    };
    const leave = () => cursor.classList.remove("is-hover");

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div id="cursor" className="cursor" aria-hidden="true">
      <div className="cursor__dot"></div>
      <div className="cursor__ring"></div>
      <div className="cursor__label"></div>
    </div>
  );
};
