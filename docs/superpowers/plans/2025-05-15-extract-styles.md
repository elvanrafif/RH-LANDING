# Extract Component Styles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the project by extracting styles from `src/index.css` into component-specific CSS files and importing them in the corresponding components.

**Architecture:** For each component, identify its styles in `src/index.css`, create a new `.css` file in the component's directory, and add an import statement in the component's `.tsx` file.

**Tech Stack:** React, TypeScript, CSS.

---

### Task 1: Nav Styles Extraction

**Files:**
- Create: `src/features/layout/Nav.css`
- Modify: `src/features/layout/Nav.tsx`

- [ ] **Step 1: Extract Nav styles from src/index.css**
Copy styles from `/* ============ Nav ============ */` section in `src/index.css` (around L1576) into `src/features/layout/Nav.css`.

- [ ] **Step 2: Import Nav.css in Nav.tsx**
Add `import "./Nav.css";` at the top of `src/features/layout/Nav.tsx`.

---

### Task 2: HeroTwo Styles Extraction

**Files:**
- Create: `src/features/hero/HeroTwo.css`
- Modify: `src/features/hero/HeroTwo.tsx`

- [ ] **Step 1: Extract HeroTwo styles from src/index.css**
Copy styles from `/* HERO TWO — Fullscreen cinematic */` section in `src/index.css` (around L906) into `src/features/hero/HeroTwo.css`.

- [ ] **Step 2: Import HeroTwo.css in HeroTwo.tsx**
Add `import "./HeroTwo.css";` at the top of `src/features/hero/HeroTwo.tsx`.

---

### Task 3: HeroX Styles Extraction

**Files:**
- Create: `src/features/hero/HeroX.css`
- Modify: `src/features/hero/HeroX.tsx`

- [ ] **Step 1: Extract HeroX styles from src/index.css**
Copy styles from `/* ============ Hero (outstanding) ============ */` section in `src/index.css` (around L1719) into `src/features/hero/HeroX.css`.

- [ ] **Step 2: Import HeroX.css in HeroX.tsx**
Add `import "./HeroX.css";` at the top of `src/features/hero/HeroX.tsx`.

---

### Task 4: TextOverlay Styles Extraction

**Files:**
- Create: `src/features/hero/TextOverlay.css`
- Modify: `src/features/hero/TextOverlay.tsx`

- [ ] **Step 1: Extract TextOverlay styles from src/index.css**
Copy styles from `/* ── Text Overlay: shared between splash and hero ── */` section in `src/index.css` (around L1078) into `src/features/hero/TextOverlay.css`.

- [ ] **Step 2: Import TextOverlay.css in TextOverlay.tsx**
Add `import "./TextOverlay.css";` at the top of `src/features/hero/TextOverlay.tsx`.

---

### Task 5: Marquee Styles Extraction

**Files:**
- Create: `src/components/Marquee.css`
- Modify: `src/components/Marquee.tsx`

- [ ] **Step 1: Extract Marquee styles from src/index.css**
Copy styles from `/* ============ Marquee ============ */` section in `src/index.css` (around L347 or L1990) into `src/components/Marquee.css`.

- [ ] **Step 2: Import Marquee.css in Marquee.tsx**
Add `import "./Marquee.css";` at the top of `src/components/Marquee.tsx`.

---

### Task 6: About Styles Extraction

**Files:**
- Create: `src/components/About.css`
- Modify: `src/components/About.tsx`

- [ ] **Step 1: Extract About styles from src/index.css**
Copy styles from `/* ============ About ============ */` section in `src/index.css` (around L383 or L2026) into `src/components/About.css`.

- [ ] **Step 2: Import About.css in About.tsx**
Add `import "./About.css";` at the top of `src/components/About.tsx`.

---

### Task 7: Stats Styles Extraction

**Files:**
- Create: `src/components/Stats.css`
- Modify: `src/components/Stats.tsx`

- [ ] **Step 1: Extract Stats styles from src/index.css**
Copy styles from `/* ============ Stats / counters ============ */` section in `src/index.css` (around L422 or L2065) into `src/components/Stats.css`.

- [ ] **Step 2: Import Stats.css in Stats.tsx**
Add `import "./Stats.css";` at the top of `src/components/Stats.tsx`.

---

### Task 8: Services Styles Extraction

**Files:**
- Create: `src/components/Services.css`
- Modify: `src/components/Services.tsx`

- [ ] **Step 1: Extract Services styles from src/index.css**
Copy styles from `/* ============ Services ============ */` section in `src/index.css` (around L458 or L2101) into `src/components/Services.css`.

- [ ] **Step 2: Import Services.css in Services.tsx**
Add `import "./Services.css";` at the top of `src/components/Services.tsx`.

---

### Task 9: Projects Styles Extraction

**Files:**
- Create: `src/features/gallery/Projects.css`
- Modify: `src/features/gallery/Projects.tsx`

- [ ] **Step 1: Extract Projects styles from src/index.css**
Copy styles from `/* ============ Projects (horizontal scroll) ============ */` section in `src/index.css` (around L524 or L2167) into `src/features/gallery/Projects.css`.

- [ ] **Step 2: Import Projects.css in Projects.tsx**
Add `import "./Projects.css";` at the top of `src/features/gallery/Projects.tsx`.

---

### Task 10: ProjectDetail Styles Extraction

**Files:**
- Create: `src/features/gallery/ProjectDetail.css`
- Modify: `src/features/gallery/ProjectDetail.tsx`

- [ ] **Step 1: Extract ProjectDetail styles from src/index.css**
Copy styles from `/* ============ Project Detail (overlay page) ============ */` section in `src/index.css` (around L2500) into `src/features/gallery/ProjectDetail.css`.

- [ ] **Step 2: Import ProjectDetail.css in ProjectDetail.tsx**
Add `import "./ProjectDetail.css";` at the top of `src/features/gallery/ProjectDetail.tsx`.

---

### Task 11: Contact Styles Extraction

**Files:**
- Create: `src/components/Contact.css`
- Modify: `src/components/Contact.tsx`

- [ ] **Step 1: Extract Contact styles from src/index.css**
Copy styles from `/* ============ Contact ============ */` section in `src/index.css` (around L656 or L2299) into `src/components/Contact.css`.

- [ ] **Step 2: Import Contact.css in Contact.tsx**
Add `import "./Contact.css";` at the top of `src/components/Contact.tsx`.

---

### Task 12: Footer Styles Extraction

**Files:**
- Create: `src/features/layout/Footer.css`
- Modify: `src/features/layout/Footer.tsx`

- [ ] **Step 1: Extract Footer styles from src/index.css**
Copy styles from `/* ============ Footer ============ */` section in `src/index.css` (around L748 or L2391) into `src/features/layout/Footer.css`.

- [ ] **Step 2: Import Footer.css in Footer.tsx**
Add `import "./Footer.css";` at the top of `src/features/layout/Footer.tsx`.

---

### Task 13: Cursor Styles Extraction

**Files:**
- Create: `src/features/layout/Cursor.css`
- Modify: `src/features/layout/Cursor.tsx`

- [ ] **Step 1: Extract Cursor styles from src/index.css**
Copy styles from `/* ============ Cursor ============ */` section in `src/index.css` (around L94 or L1495) into `src/features/layout/Cursor.css`.

- [ ] **Step 2: Import Cursor.css in Cursor.tsx**
Add `import "./Cursor.css";` at the top of `src/features/layout/Cursor.tsx`.

---

### Task 14: SplashScreen Styles Extraction

**Files:**
- Create: `src/features/layout/SplashScreen.css`
- Modify: `src/features/layout/SplashScreen.tsx`

- [ ] **Step 1: Extract SplashScreen styles from src/index.css**
Copy styles from `/* SPLASH SCREEN */` section in `src/index.css` (around L1295) into `src/features/layout/SplashScreen.css`.

- [ ] **Step 2: Import SplashScreen.css in SplashScreen.tsx**
Add `import "./SplashScreen.css";` at the top of `src/features/layout/SplashScreen.tsx`.

---

### Task 15: Tweaks Styles Extraction

**Files:**
- Create: `src/components/Tweaks.css`
- Modify: `src/components/Tweaks.tsx`

- [ ] **Step 1: Extract Tweaks styles from src/index.css**
Copy styles from `/* ============ Tweaks panel ============ */` section in `src/index.css` (around L840 or L2450) into `src/components/Tweaks.css`.

- [ ] **Step 2: Import Tweaks.css in Tweaks.tsx**
Add `import "./Tweaks.css";` at the top of `src/components/Tweaks.tsx`.
