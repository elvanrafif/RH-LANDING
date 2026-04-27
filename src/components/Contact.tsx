import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", project: "residential", budget: "", message: "" });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [state, setState] = useState("idle");

  const update = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  const setProject = (v: string) => setForm({ ...form, project: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: {[key: string]: string} = {};
    if (!form.name.trim()) errs.name = t('contact.form.error_required');
    if (!form.email.trim()) errs.email = t('contact.form.error_required');
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) errs.email = t('contact.form.error_email');
    if (!form.message.trim()) errs.message = t('contact.form.error_message');
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

  const projectTypes = [
    { k: "residential", l: t('contact.form.type_residential') },
    { k: "interior",    l: t('contact.form.type_interior') },
    { k: "renovation",  l: t('contact.form.type_renovation') },
    { k: "consult",     l: t('contact.form.type_consult') },
  ];

  return (
    <section id="contact" className="container divider-top">
      <div className="contact">
        <div className="contact__left">
          <div>
            <div className="eyebrow kicker" style={{marginBottom: 20}}>{t('contact.kicker')}</div>
            <h2 className="contact__title">
              {t('contact.title_line1')}<br/>{t('contact.title_line2')} <em>{t('contact.title_accent')}</em>.
            </h2>
          </div>
          <p style={{maxWidth: "40ch", color: "var(--ink-2)", fontSize: 18, lineHeight: 1.5}}>
            {t('contact.subtitle')}
          </p>
          <div className="contact__details">
            <div className="contact__detail">
              <span className="contact__detail-k mono">{t('contact.detail_studio')}</span>
              <span className="contact__detail-v">Jl. Senopati No. 42,<br/>Jakarta Selatan 12190</span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-k mono">{t('contact.detail_email')}</span>
              <span className="contact__detail-v">halo@rhstudio.id</span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-k mono">{t('contact.detail_phone')}</span>
              <span className="contact__detail-v">+62 21 7590 4412</span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-k mono">{t('contact.detail_instagram')}</span>
              <span className="contact__detail-v">@rhstudio.arsitek</span>
            </div>
          </div>
        </div>

        <div className="contact__right">
          <form className="form" onSubmit={submit} noValidate>
            <div className="form__grid">
              <div className={"field" + (errors.name ? " field--error" : "")}>
                <label className="mono">{t('contact.form.name_label')}</label>
                <input type="text" value={form.name} onChange={update("name")} placeholder={t('contact.form.name_placeholder')} />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
              <div className={"field" + (errors.email ? " field--error" : "")}>
                <label className="mono">{t('contact.form.email_label')}</label>
                <input type="email" value={form.email} onChange={update("email")} placeholder={t('contact.form.email_placeholder')} />
                {errors.email && <span className="field__error">{errors.email}</span>}
              </div>
            </div>

            <div className="field">
              <label className="mono">{t('contact.form.type_label')}</label>
              <div className="chip-row">
                {projectTypes.map((c) => (
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
              <label className="mono">{t('contact.form.budget_label')}</label>
              <select value={form.budget} onChange={update("budget")}>
                <option value="">{t('contact.form.budget_placeholder')}</option>
                <option value="a">{t('contact.form.budget_a')}</option>
                <option value="b">{t('contact.form.budget_b')}</option>
                <option value="c">{t('contact.form.budget_c')}</option>
                <option value="d">{t('contact.form.budget_d')}</option>
              </select>
            </div>

            <div className={"field" + (errors.message ? " field--error" : "")}>
              <label className="mono">{t('contact.form.message_label')}</label>
              <textarea rows={4} value={form.message} onChange={update("message")} placeholder={t('contact.form.message_placeholder')}></textarea>
              {errors.message && <span className="field__error">{errors.message}</span>}
            </div>

            <button type="submit" className={"btn" + (state === "sent" ? " btn--sent" : "")} disabled={state !== "idle"}>
              <span>
                {state === "idle"    && t('contact.form.submit_idle')}
                {state === "sending" && t('contact.form.submit_sending')}
                {state === "sent"    && t('contact.form.submit_sent')}
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
