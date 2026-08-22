---
name: RH Studio
description: Editorial architecture-studio landing page in cream and terracotta
colors:
  cream: "#F5F1EB"
  cream-2: "#EDE6DB"
  ink: "#1A1714"
  ink-2: "#2E2925"
  muted: "#7A716A"
  line: "#D9D2C7"
  accent: "#C96F4A"
  accent-deep: "#A75834"
  surface: "#FFFFFF"
  error: "#C85353"
typography:
  display:
    fontFamily: "Instrument Serif, Times New Roman, serif"
    fontSize: "clamp(2.5rem, 7vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter Tight, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  pill: "999px"
  sm: "2px"
  md: "8px"
  lg: "16px"
spacing:
  gutter: "clamp(20px, 4vw, 56px)"
  section: "clamp(80px, 10vw, 160px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "18px 28px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  chip-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.cream}"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    typography: "{typography.body}"
    padding: "12px 0"
---

# Design System: RH Studio

## 1. Overview

**Creative North Star: "Quiet Terracotta"**

RH Studio's site is built on warmth held in restraint: a sun-baked cream-and-terracotta material palette, paired with serif display type that delivers each statement once and lets it sit. The aesthetic philosophy is editorial, not promotional. Italic serif accents in terracotta carry emphasis where a corporate site would reach for bold or a gradient. Monospace labels, numbered service rows, and signature blocks borrow the discipline of a drawing set: every element knows its column, its number, its hairline.

This system explicitly rejects the SaaS-template reflex (no hero-metric blocks, no gradient text, no identical icon-card grids, no glassmorphism) and the corporate-firm reflex (no stock photography, no dense institutional copy, no sterile blue-and-gray formality). Confidence here comes from negative space, a single warm accent used sparingly, and motion that never hurries.

**Key Characteristics:**
- Warm neutral ground (cream/ink) with terracotta as the only saturated color, used at low frequency
- Display serif (Instrument Serif) for every headline-weight statement, sans body for reading, mono for all labels/metadata
- Twelve-column editorial grid with sticky labels and asymmetric column spans, not a centered container
- Flat surfaces divided by 1px hairlines; shadows reserved for floating UI chrome only
- Reveal-on-scroll and underline/wipe hover states as the entire motion vocabulary; no bounce, no choreography beyond staggered fades

## 2. Colors

The palette is Restrained: tinted cream-and-ink neutrals carrying the page, terracotta appearing only as the single accent.

### Primary
- **Terracotta** (`#C96F4A`): the one saturated color in the system. Used for italic emphasis words in headlines, active chip/tag states, link hovers, selection highlight, and the hover-wipe fill on the primary button. Never used as a background for body text or large surfaces.
- **Deep Terracotta** (`#A75834`): hover/pressed state for the primary accent where a darker step is needed (rare; most hovers use the full accent).

### Neutral
- **Cream** (`#F5F1EB`): primary background. In dark mode this role flips to a near-black `#1E1915`.
- **Cream Deep** (`#EDE6DB`): secondary surface tint, used for hover backgrounds on rows (e.g. service list hover) and subtle section separation.
- **Ink** (`#1A1714`): primary text and the footer/nav-scrolled background. Near-white `#F0E9DD` in dark mode.
- **Ink Soft** (`#2E2925`): secondary text weight, body copy in two-column layouts.
- **Muted** (`#7A716A`): labels, metadata, eyebrow text, placeholder text.
- **Line** (`#D9D2C7`): all hairline borders and dividers. The system's only border color.
- **Surface** (`#FFFFFF`): the rare true-white surface (e.g. the floating Tweaks panel), distinct from the warm cream background.
- **Error** (`#C85353`): form validation only.

### Named Rules
**The One Accent Rule.** Terracotta appears on a small minority of any given screen: an italic word, an active state, a hover fill. If more than one element on screen is terracotta at rest (not hover), the palette has been over-applied.

## 3. Typography

**Display Font:** Instrument Serif (with Times New Roman, serif fallback)
**Body Font:** Inter Tight (with system sans fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace fallback)

**Character:** A serif built for short, declarative statements paired with a humanist sans for reading and a mono for system-level annotation, mirroring an architect's drawing set: bold gestural lines, precise margin notes.

### Hierarchy
- **Display** (400 weight, `clamp(2.5rem, 7vw, 8rem)`, line-height 0.88-0.95): section headlines and the contact CTA. Tight letter-spacing (-0.02em to -0.025em). Italic terracotta spans carry emphasis within a headline rather than a second color or weight.
- **Title** (400 weight, `clamp(28px, 3.5vw, 48px)`, line-height 1): service-row titles and stat numbers; switches to italic terracotta on hover/interaction.
- **Body** (400 weight, 16px, line-height 1.55-1.6, max 44ch): paragraph copy in two-column layouts. Ink-soft color, not full-strength ink.
- **Label** (400 weight, 10-11px, letter-spacing 0.08-0.16em, uppercase): mono. Eyebrows, kickers, nav links, form labels, footer columns, button text. Carries nearly all of the system's structural/wayfinding load.

### Named Rules
**The One Voice Per Element Rule.** A single element never mixes display and mono type; display carries meaning, mono carries metadata. They sit adjacent, never combined in one string.

## 4. Elevation

Flat-by-default, shadow-as-utility. Page content (sections, rows, cards, the contact form) has no shadow at any state; depth and separation come entirely from 1px hairline borders (`var(--line)`) and background tint shifts (cream to cream-2 on hover). Shadows appear only on UI chrome that floats above the page and needs to read as detached: the Tweaks settings panel and its FAB, and the scrolled-state nav's blurred backdrop.

### Shadow Vocabulary
- **Floating panel** (`box-shadow: 0 20px 40px rgba(0,0,0,.08)`): the Tweaks settings panel. Soft, diffuse, low-opacity; signals "this sits above the page," not "this is interactive."
- **Floating control** (`box-shadow: 0 4px 20px rgba(0,0,0,.25)`): the Tweaks FAB. Tighter and darker than the panel shadow since it's a smaller, higher-contrast target.

### Named Rules
**The Hairline-Over-Shadow Rule.** If a new component needs visual separation from its neighbor, reach for a 1px `var(--line)` border first. A shadow is only correct when the element is meant to read as floating independently above the document flow.

## 5. Components

Tactile restraint: components stay quiet at rest, with no border-radius drama or color at idle, and confirm themselves through a single deliberate motion on interaction (a color wipe, an underline sweep, an arrow shift) rather than through decoration.

### Buttons
- **Shape:** full pill (`border-radius: 999px`)
- **Primary:** ink background, cream mono label text, `18px 28px` padding. On hover, a terracotta layer wipes up from the bottom edge over 0.5s (`var(--ease)`) rather than a flat background swap.
- **Hover / Focus:** color-wipe via an absolutely positioned `::after` layer (`transform: translateY(100%)` to `translateY(0)`), content stays on a `z-index: 1` layer above it.
- **Sent/success state:** background switches directly to terracotta (`.btn--sent`), no wipe needed since the action already completed.

### Chips
- **Style:** transparent background, 1px `var(--line)` border, full pill shape, mono uppercase label, `8px 14px` padding.
- **State:** hover darkens the border to `var(--fg)`. Active/selected state fills solid terracotta with cream text and a matching terracotta border.

### Cards / Containers
This system avoids the card pattern. Content lives directly in the editorial grid, separated by hairline borders (`divider-top`/`divider-bottom` utility classes) rather than boxed containers. The one exception is the floating Tweaks panel, which uses a `16px` radius, white surface, and the floating-panel shadow because it genuinely needs to read as a layer above the page.

### Inputs / Fields
- **Style:** transparent background, no border box; a single 1px `var(--line)` bottom border is the entire field chrome. `12px 0` padding, sans body type at 16px.
- **Focus:** bottom border color shifts to terracotta, no glow or outline ring.
- **Error:** bottom border shifts to `#C85353`; an uppercase mono error label appears absolutely positioned beneath the field.

### Navigation
Transparent and borderless at the top of the page; on scroll, gains a translucent ink background (`rgba(13,10,8,.6)`) with `saturate(180%) blur(20px)` backdrop-filter and a hairline bottom border, the system's only deliberate use of glass, reserved for the persistent nav chrome, not decorative cards. Links are mono-uppercase with a terracotta number prefix and an underline that sweeps in from the left on hover (`right: 100%` to `right: 0`). Mobile collapses to a full-bleed ink overlay with display-serif links revealed via staggered clip-path/opacity.

## 6. Do's and Don'ts

### Do:
- **Do** keep terracotta to a single accent role: italic emphasis words, active states, hover fills. Treat its rarity as the point.
- **Do** use hairline `var(--line)` borders as the default separator between sections, rows, and fields instead of cards or shadows.
- **Do** route all structural/metadata text (labels, eyebrows, nav, footer columns, form labels) through the mono label type, uppercase, letter-spaced.
- **Do** confirm every interactive element with one deliberate motion (wipe, underline sweep, arrow shift) using `var(--ease)` or `var(--ease-out)`, never a default linear or bounce easing.
- **Do** respect `prefers-reduced-motion`, already implemented globally in `src/index.css`.

### Don't:
- **Don't** build generic SaaS-template patterns: no hero-metric blocks, no gradient text, no identical icon-card grids, no glassmorphism used decoratively on content cards.
- **Don't** reach for stock photography, dense institutional paragraphs, or a sterile blue-and-gray corporate palette; warmth and restraint carry the studio's credibility instead.
- **Don't** add card containers with shadows for ordinary content; this system has no card-shadow vocabulary outside the floating Tweaks panel and nav.
- **Don't** use `border-left`/`border-right` as a colored accent stripe; the system has zero instances of this pattern and a hairline-or-nothing border doctrine.
- **Don't** mix display-serif and mono type within a single text element; they sit side by side, never combined in one string.
