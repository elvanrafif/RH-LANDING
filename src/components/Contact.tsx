import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", project: "residential", budget: "", message: "" });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [state, setState] = useState("idle");

  const update = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  const setProject = (v: string) => setForm({ ...form, project: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: {[key: string]: string} = {};
    if (!form.name.trim()) errs.name = "Wajib diisi";
    if (!form.email.trim()) errs.email = "Wajib diisi";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = "Email tidak valid";
    if (!form.message.trim()) errs.message = "Ceritakan proyek Anda";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState("sending");
    setTimeout(() => {
      setState("sent");
      setTimeout(() => {
        setState("idle");
        setForm({ name: "", email: "", project: "residential", budget: "", message: "" });
      }, 3000);
    }, 900);
  };

  return (
    <section id="contact" className="container divider-top">
      <div className="contact">
        <div className="contact__left">
          <div>
            <div className="eyebrow kicker" style={{marginBottom: 20}}>04 / Kontak</div>
            <h2 className="contact__title">
              Mari kita<br/>mulai <em>bersama</em>.
            </h2>
          </div>
          <p style={{maxWidth: "40ch", color: "var(--ink-2)", fontSize: 18, lineHeight: 1.5}}>
            Kami menerima proyek baru untuk kuartal ketiga 2026. Ceritakan tentang lokasi, brief, dan garis waktu Anda — kami akan membalas dalam tiga hari kerja.
          </p>
          <div className="contact__details">
            <div className="contact__detail">
              <span className="contact__detail-k mono">Studio</span>
              <span className="contact__detail-v">Jl. Senopati No. 42,<br/>Jakarta Selatan 12190</span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-k mono">Email</span>
              <span className="contact__detail-v">halo@rhstudio.id</span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-k mono">Telepon</span>
              <span className="contact__detail-v">+62 21 7590 4412</span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-k mono">Instagram</span>
              <span className="contact__detail-v">@rhstudio.arsitek</span>
            </div>
          </div>
        </div>

        <div className="contact__right">
          <form className="form" onSubmit={submit} noValidate>
            <div className="form__grid">
              <div className={"field" + (errors.name ? " field--error" : "")}>
                <label className="mono">Nama / Name</label>
                <input type="text" value={form.name} onChange={update("name")} placeholder="Nama lengkap Anda" />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
              <div className={"field" + (errors.email ? " field--error" : "")}>
                <label className="mono">Email</label>
                <input type="email" value={form.email} onChange={update("email")} placeholder="anda@contoh.com" />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>
            </div>

            <div className="field">
              <label className="mono">Jenis Proyek / Project type</label>
              <div className="chip-row">
                {[
                  { k: "residential", l: "Rumah Tinggal" },
                  { k: "interior", l: "Interior" },
                  { k: "renovation", l: "Renovasi" },
                  { k: "consult", l: "Konsultasi" },
                ].map((c) => (
                  <button
                    type="button"
                    key={c.k}
                    className={"chip" + (form.project === c.k ? " is-active" : "")}
                    onClick={() => setProject(c.k)}
                  >{c.l}</button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="mono">Kisaran Budget / Budget range</label>
              <select value={form.budget} onChange={update("budget")}>
                <option value="">— Pilih kisaran —</option>
                <option value="a">Rp 1 – 3 Miliar</option>
                <option value="b">Rp 3 – 7 Miliar</option>
                <option value="c">Rp 7 – 15 Miliar</option>
                <option value="d">Di atas Rp 15 Miliar</option>
              </select>
            </div>

            <div className={"field" + (errors.message ? " field--error" : "")}>
              <label className="mono">Ceritakan Proyek Anda / Tell us about the project</label>
              <textarea rows={4} value={form.message} onChange={update("message")} placeholder="Lokasi, luasan, timeline, referensi visual…"></textarea>
              {errors.message && <span className="field__error">{errors.message}</span>}
            </div>

            <button type="submit" className={"btn" + (state === "sent" ? " btn--sent" : "")} disabled={state !== "idle"} data-cursor="Kirim">
              <span>
                {state === "idle" && "Kirim permintaan"}
                {state === "sending" && "Mengirim…"}
                {state === "sent" && "Terkirim — terima kasih"}
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
