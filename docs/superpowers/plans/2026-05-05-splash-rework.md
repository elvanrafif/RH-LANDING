# Splash Screen Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dark grid-canvas splash screen with a clean cream-background intro: logo diagonal opacity sweep in → hold → sweep out → horizontal screen split revealing the hero.

**Architecture:** Two cream panels (`top` / `bottom`) cover the full screen. A centered logo sits above them, animated via CSS `mask-image` with a JS-driven custom property `--p`. After logo disappears, the panels slide away (top up, bottom down) to reveal the hero. Only `SplashScreen.tsx` and `SplashScreen.css` are touched.

**Tech Stack:** React, TypeScript, CSS mask-image, requestAnimationFrame (no new dependencies)

---

## File Map

| File | Action |
|------|--------|
| `src/features/layout/SplashScreen.tsx` | Full rewrite |
| `src/features/layout/SplashScreen.css` | Full rewrite |

---

### Task 1: Create branch

**Files:**
- No files changed

- [ ] **Step 1: Create and switch to feature branch**

```bash
git checkout -b feat/splash-rework
```

Expected output: `Switched to a new branch 'feat/splash-rework'`

---

### Task 2: Rewrite SplashScreen.css

**Files:**
- Modify: `src/features/layout/SplashScreen.css` (full rewrite)

- [ ] **Step 1: Replace the entire file with the new styles**

```css
/* ── Splash root ─────────────────────────────────────────────── */
.splash {
  position: fixed;
  inset: 0;
  z-index: 9000;
  pointer-events: none;
}

/* ── Cream panels (cover full screen, split on exit) ─────────── */
.splash__top-panel,
.splash__bottom-panel {
  position: absolute;
  left: 0;
  right: 0;
  background: #F5F1EB;
  z-index: 9000;
  transition: transform 0.9s cubic-bezier(.76, 0, .24, 1);
}

.splash__top-panel {
  top: 0;
  height: 50vh;
  transform: translateY(0);
}

.splash__bottom-panel {
  bottom: 0;
  height: 50vh;
  transform: translateY(0);
}

.splash__top-panel--exit {
  transform: translateY(-100%);
}

.splash__bottom-panel--exit {
  transform: translateY(100%);
}

/* ── Logo wrap — centered, above panels ──────────────────────── */
.splash__logo-wrap {
  position: fixed;
  inset: 0;
  z-index: 9001;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

/* ── Logo image — mask-driven diagonal sweep ─────────────────── */
.splash__logo {
  --p: -30%;
  width: clamp(140px, 18vw, 220px);
  height: auto;
  display: block;
  mask-image: linear-gradient(
    135deg,
    black var(--p),
    transparent calc(var(--p) + 30%)
  );
  -webkit-mask-image: linear-gradient(
    135deg,
    black var(--p),
    transparent calc(var(--p) + 30%)
  );
}

.splash__logo--sweep-out {
  mask-image: linear-gradient(
    135deg,
    transparent var(--p),
    black calc(var(--p) + 30%)
  );
  -webkit-mask-image: linear-gradient(
    135deg,
    transparent var(--p),
    black calc(var(--p) + 30%)
  );
}

/* ── Hero bg — stay hidden until splash exits ────────────────── */
.h2__bg-img--hidden {
  opacity: 0 !important;
  transition: none !important;
}

.h2__bg-img--reveal {
  opacity: 1 !important;
  transition: opacity 0.8s cubic-bezier(.4, 0, .2, 1) !important;
}

/* ── TextOverlay char animation paused until splashDone ──────── */
.h2__c--paused   { animation-play-state: paused !important; }
.h2__c--playing  { animation-play-state: running !important; }
.h2__c--settled  { opacity: 1 !important; transform: none !important; animation: none !important; }
```

- [ ] **Step 2: Commit CSS**

```bash
git add src/features/layout/SplashScreen.css
git commit -m "feat(splash): rewrite CSS — cream panels, logo mask sweep, split exit"
```

---

### Task 3: Rewrite SplashScreen.tsx

**Files:**
- Modify: `src/features/layout/SplashScreen.tsx` (full rewrite)

- [ ] **Step 1: Replace the entire file**

```tsx
import React, { useEffect, useRef } from 'react';
import './SplashScreen.css';
import rhLogo from '../../assets/rh-studio.png';

interface SplashScreenProps {
  onDone: () => void;
  onExiting: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onDone, onExiting }) => {
  const logoRef      = useRef<HTMLImageElement>(null);
  const topRef       = useRef<HTMLDivElement>(null);
  const bottomRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo   = logoRef.current;
    const top    = topRef.current;
    const bottom = bottomRef.current;
    if (!logo || !top || !bottom) return;

    let rafId: number;

    function easeInOut(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animateSweep(duration: number, onComplete: () => void) {
      const start = performance.now();
      function tick() {
        const progress = Math.min(1, (performance.now() - start) / duration);
        const p = -30 + easeInOut(progress) * 160; // -30% → 130%
        logo.style.setProperty('--p', `${p}%`);
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          onComplete();
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    // Hide hero bg until split
    const heroImg = document.querySelector('.h2__bg-img');
    if (heroImg) heroImg.classList.add('h2__bg-img--hidden');

    // Phase 1 — Sweep In (1200ms)
    logo.style.setProperty('--p', '-30%');
    animateSweep(1200, () => {

      // Phase 2 — Hold (600ms)
      setTimeout(() => {

        // Phase 3 — Sweep Out (1000ms)
        logo.style.setProperty('--p', '-30%');
        logo.classList.add('splash__logo--sweep-out');
        animateSweep(1000, () => {

          // Phase 4 — Split
          onExiting();
          top.classList.add('splash__top-panel--exit');
          bottom.classList.add('splash__bottom-panel--exit');

          if (heroImg) {
            heroImg.classList.remove('h2__bg-img--hidden');
            heroImg.classList.add('h2__bg-img--reveal');
          }

          setTimeout(() => onDone(), 900);
        });

      }, 600);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (heroImg) heroImg.classList.remove('h2__bg-img--hidden');
    };
  }, [onDone, onExiting]);

  return (
    <div className="splash">
      <div className="splash__top-panel"    ref={topRef} />
      <div className="splash__bottom-panel" ref={bottomRef} />
      <div className="splash__logo-wrap">
        <img
          ref={logoRef}
          className="splash__logo"
          src={rhLogo}
          alt="RH Studio"
        />
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit TSX**

```bash
git add src/features/layout/SplashScreen.tsx
git commit -m "feat(splash): rewrite component — logo sweep in/out + split reveal"
```

---

### Task 4: Visual QA

**Files:**
- No file changes

- [ ] **Step 1: Start dev server**

```bash
yarn dev
```

- [ ] **Step 2: Open browser and hard refresh**

Open `http://localhost:5173` and verify:

1. **Background cream** — screen is `#F5F1EB`, not dark
2. **Sweep In** — logo starts invisible, reveals smoothly diagonal TL→BR over ~1.2s
3. **Hold** — logo fully visible for ~0.6s
4. **Sweep Out** — logo disappears smoothly diagonal TL→BR over ~1.0s
5. **Split** — screen splits top/bottom, hero slides in underneath, transition ~0.9s smooth
6. **After split** — hero background image reveals (fade in), no leftover cream panels

- [ ] **Step 3: Test mobile viewport**

In DevTools, set viewport to 375×812 (iPhone). Verify logo size is readable and panels cover correctly.

- [ ] **Step 4: Commit if all good, or iterate on timing**

```bash
git add -p  # only if any tweaks were needed
git commit -m "fix(splash): adjust timing/sizing after visual QA"
```

---

### Task 5: Final cleanup & merge-ready commit

- [ ] **Step 1: Verify no leftover code from old splash**

Check `SplashScreen.css` has no references to `.splash__canvas`, `.splash__progress`, or gold grid styles.

```bash
grep -n "canvas\|progress\|GOLD\|grid" src/features/layout/SplashScreen.css src/features/layout/SplashScreen.tsx
```

Expected: no output.

- [ ] **Step 2: Final commit on branch**

```bash
git log --oneline feat/splash-rework ^main
```

Verify all commits are present, then branch is ready for review / merge.
