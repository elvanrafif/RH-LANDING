import React, { useState, useEffect } from 'react';
import { HeroVersion, Tweak } from '../types';

export const Tweaks: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<Tweak>(() => {
    const saved = (window as any).__TWEAKS__ || {};
    return {
      mode: saved.mode || 'light',
      accent: saved.accent || '#C96F4A',
      heroVersion: (saved.heroVersion as HeroVersion) || '1',
    };
  });

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const t = e.data && e.data.type;
      if (t === "__activate_edit_mode") setVisible(true);
      if (t === "__deactivate_edit_mode") setVisible(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");

    const onKey = (e: KeyboardEvent) => { if (e.key === "t" || e.key === "T") setVisible((v) => !v); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("message", onMsg); window.removeEventListener("keydown", onKey); };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", state.mode);
    if (state.accent) document.documentElement.style.setProperty("--accent", state.accent);
  }, [state]);

  const set = (patch: Partial<Tweak>) => {
    const next = { ...state, ...patch } as Tweak;
    setState(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
    if (patch.heroVersion !== undefined) {
      window.dispatchEvent(new CustomEvent("rh:hero-version", { detail: { version: patch.heroVersion } }));
    }
  };

  if (!visible) return (
    <button
      className="tweaks-fab"
      onClick={() => setVisible(true)}
      title="Open Tweaks (T)"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M11.54 3.05l-1.41 1.41M4.46 11.54l-1.41 1.41" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
      <span className="mono">Tweaks</span>
    </button>
  );

  return (
    <div className="tweaks is-open">
      <div className="tweaks__head">
        <span className="tweaks__title">Tweaks</span>
        <button className="tweaks__close" onClick={() => setVisible(false)}>close ×</button>
      </div>

      <div className="tweaks__group">
        <div className="tweaks__label">Mode</div>
        <div className="tweaks__options">
          <button className={"tweaks__opt" + (state.mode === "light" ? " is-active" : "")} onClick={() => set({ mode: "light" })}>Light</button>
          <button className={"tweaks__opt" + (state.mode === "dark" ? " is-active" : "")} onClick={() => set({ mode: "dark" })}>Dark</button>
        </div>
      </div>

      <div className="tweaks__group">
        <div className="tweaks__label">Accent</div>
        <div className="tweaks__swatches">
          {["#C96F4A", "#A75834", "#D98F6A", "#6E5B4E", "#2E2925"].map((c) => (
            <button
              key={c}
              className={"tweaks__swatch" + (state.accent === c ? " is-active" : "")}
              style={{background: c}}
              onClick={() => set({ accent: c })}
              aria-label={`Accent ${c}`}
            />
          ))}
        </div>
      </div>

      <div className="tweaks__group">
        <div className="tweaks__label">Hero Version</div>
        <div className="tweaks__options">
          {(["1", "2"] as HeroVersion[]).map((v) => (
            <button key={v} className={"tweaks__opt" + (state.heroVersion === v ? " is-active" : "")} onClick={() => set({ heroVersion: v })}>
              {v === "1" ? "Kinetic" : "Cinematic"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
