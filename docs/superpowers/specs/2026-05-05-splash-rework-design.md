# Splash Screen Rework — Design Spec
**Date:** 2026-05-05  
**Branch:** feat/splash-rework  
**Approach:** Pure CSS + minimal JS (no new dependencies)

---

## Goal

Replace the existing dark grid-canvas splash screen with a clean, elegant intro inspired by minaleandmann.com — cream background, logo diagonal sweep in/out, then a horizontal screen split that reveals the hero.

---

## Phase Structure

| Phase | Duration | Description |
|-------|----------|-------------|
| 1 — Sweep In | ~1.2s | Logo reveals via diagonal opacity sweep (top-left → bottom-right) |
| 2 — Hold | ~0.6s | Logo fully visible, static |
| 3 — Sweep Out | ~1.0s | Logo disappears via same diagonal sweep (top-left → bottom-right) |
| 4 — Split | ~0.9s | Top panel slides up, bottom panel slides down, hero revealed |

Total duration: ~3.7s

---

## Visual Design

- **Background:** `#F5F1EB` (cream) — both panels
- **Logo:** `src/assets/rh-studio.png`, centered, width ~180–220px
- **Hero behind:** existing `HeroTwo` component, unchanged

---

## Component Structure

```
<SplashScreen>
  ├── .splash__top-panel       (cream, covers top 50vh, z-index 9000)
  ├── .splash__bottom-panel    (cream, covers bottom 50vh, z-index 9000)
  └── .splash__logo-wrap       (fixed center, z-index 9001)
        └── <img rh-studio.png>
```

The two panels sit above everything. The logo is on its own layer above the panels so it's visible against the cream background during phases 1–3, then fades before the split.

---

## Animation Technique

### Logo Sweep (Phases 1 & 3)

CSS `mask-image` with an animated custom property `--p`:

```css
.splash__logo {
  mask-image: linear-gradient(
    135deg,
    black var(--p),
    transparent calc(var(--p) + 30%)
  );
}
```

- **Sweep In:** `--p` animates from `-30%` → `130%` over 1.2s with `easeInOut`
- **Sweep Out:** `--p` animates from `-30%` → `130%` again over 1.0s with `easeInOut`
- Driven by `requestAnimationFrame` + JS easing, no CSS `@keyframes` (easier to sequence phases)

### Split (Phase 4)

```css
.splash__top-panel {
  transform: translateY(-100%);
  transition: transform 0.9s cubic-bezier(.76, 0, .24, 1);
}
.splash__bottom-panel {
  transform: translateY(100%);
  transition: transform 0.9s cubic-bezier(.76, 0, .24, 1);
}
```

Triggered by adding a `.is-splitting` class to both panels via JS after phase 3 completes.

---

## JS Orchestration

Single `useEffect` in `SplashScreen.tsx` drives the full sequence:

```
t=0ms      Start sweep in (rAF loop, ~1200ms)
t=1200ms   Hold (setTimeout 600ms)
t=1800ms   Start sweep out (rAF loop, ~1000ms)
t=2800ms   Trigger split (add .is-splitting class)
t=2800ms   Call onExiting()
t=3700ms   Call onDone()
```

---

## Files Changed

| File | Change |
|------|--------|
| `src/features/layout/SplashScreen.tsx` | Full rewrite |
| `src/features/layout/SplashScreen.css` | Full rewrite |
| `src/assets/rh-studio.png` | Used as-is (already exists) |
| `src/App.tsx` | No changes needed |

---

## Out of Scope

- Mobile-specific timing adjustments (can be iterated later)
- Skip-splash button
- Any changes to HeroTwo, TextOverlay, or other components
