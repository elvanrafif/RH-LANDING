import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';
import { CMS_URL } from '../data/projectsApi';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", whatsapp: "", project: "residential", budget: "", message: "", website: "" });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [state, setState] = useState("idle");

  const update = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value });
  const setProject = (v: string) => setForm((f) => ({ ...f, project: v }));

  useEffect(() => {
    const onSetType = (e: Event) => {
      const type = (e as CustomEvent<string>).detail;
      if (type) setProject(type);
    };
    window.addEventListener('rh:set-project-type', onSetType);
    return () => window.removeEventListener('rh:set-project-type', onSetType);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: {[key: string]: string} = {};
    if (!form.name.trim()) errs.name = t('contact.form.error_required');
    // WhatsApp is the channel people actually reply on here, so it carries the requirement.
    if (!form.whatsapp.trim()) errs.whatsapp = t('contact.form.error_required');
    else if (!/^[+\d][\d\s().-]{7,19}$/.test(form.whatsapp.trim()))
      errs.whatsapp = t('contact.form.error_whatsapp');
    if (!form.message.trim()) errs.message = t('contact.form.error_message');
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const reset = () => setTimeout(() => {
      setState("idle");
      setForm({ name: "", whatsapp: "", project: "residential", budget: "", message: "", website: "" });
    }, 3000);

    // A bot that fills every field trips the honeypot. Show it the same
    // success it would have got, so it has nothing to probe against.
    if (form.website) { setState("sent"); reset(); return; }

    setState("sending");
    try {
      const { website: _honeypot, ...payload } = form;
      const res = await fetch(`${CMS_URL}/items/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Directus ${res.status}`);
      setState("sent");
      reset();
    } catch (err) {
      console.error('[contact] gagal mengirim:', err);
      setState("error");
      setTimeout(() => setState("idle"), 5000);
    }
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
          <div className="contact__details">
            <div className="contact__detail">
              <span className="contact__detail-k mono">{t('contact.detail_studio')}</span>
              <span className="contact__detail-v">
                Ruko Puri Aster<br/>
                Jl. Boulevard Grand Depok City<br/>
                Sukmajaya, Kota Depok<br/>
                Jawa Barat 16412
              </span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-k mono">{t('contact.detail_email')}</span>
              <span className="contact__detail-v"><a href="mailto:arsitekrhstudio@gmail.com">arsitekrhstudio@gmail.com</a></span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-k mono">{t('contact.detail_phone')}</span>
              <span className="contact__detail-v"><a href="https://wa.me/6285718212121" target="_blank" rel="noopener noreferrer">085718212121</a></span>
            </div>
            <div className="contact__detail">
              <span className="contact__detail-k mono">{t('contact.detail_instagram')}</span>
              <span className="contact__detail-v"><a href="https://www.instagram.com/rh.studioarsitek/" target="_blank" rel="noopener noreferrer">@rh.studioarsitek</a></span>
            </div>
          </div>
        </div>

        <div className="contact__right">
          <form className="form" onSubmit={submit} noValidate>
            <div className="form__grid">
              <div className={"field" + (errors.name ? " field--error" : "")}>
                <label className="mono" htmlFor="contact-name">{t('contact.form.name_label')}</label>
                <input id="contact-name" type="text" value={form.name} onChange={update("name")} placeholder={t('contact.form.name_placeholder')} />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
              <div className={"field" + (errors.whatsapp ? " field--error" : "")}>
                <label className="mono" htmlFor="contact-whatsapp">{t('contact.form.whatsapp_label')}</label>
                <input id="contact-whatsapp" type="tel" inputMode="tel" autoComplete="tel" value={form.whatsapp} onChange={update("whatsapp")} placeholder={t('contact.form.whatsapp_placeholder')} />
                {errors.whatsapp && <span className="field__error">{errors.whatsapp}</span>}
              </div>
            </div>

            <div className="field">
              <label className="mono" id="contact-type-label">{t('contact.form.type_label')}</label>
              <div className="chip-row" role="group" aria-labelledby="contact-type-label">
                {projectTypes.map((c) => (
                  <button
                    type="button"
                    key={c.k}
                    className={"chip" + (form.project === c.k ? " is-active" : "")}
                    aria-pressed={form.project === c.k}
                    onClick={() => setProject(c.k)}
                  >{c.l}</button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="mono" htmlFor="contact-budget">{t('contact.form.budget_label')}</label>
              <select id="contact-budget" value={form.budget} onChange={update("budget")}>
                <option value="">{t('contact.form.budget_placeholder')}</option>
                <option value="a">{t('contact.form.budget_a')}</option>
                <option value="b">{t('contact.form.budget_b')}</option>
                <option value="c">{t('contact.form.budget_c')}</option>
                <option value="d">{t('contact.form.budget_d')}</option>
              </select>
            </div>

            <div className={"field" + (errors.message ? " field--error" : "")}>
              <label className="mono" htmlFor="contact-message">{t('contact.form.message_label')}</label>
              <textarea id="contact-message" rows={4} value={form.message} onChange={update("message")} placeholder={t('contact.form.message_placeholder')}></textarea>
              {errors.message && <span className="field__error">{errors.message}</span>}
            </div>

            {/* Honeypot: off-screen and skipped by tab and screen readers, so
                only an automated filler ever puts anything in it. */}
            <input
              type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={form.website} onChange={update("website")}
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />

            <button type="submit" className={"btn" + (state === "sent" ? " btn--sent" : "")} disabled={state !== "idle"}>
              <span>
                {state === "idle"    && t('contact.form.submit_idle')}
                {state === "sending" && t('contact.form.submit_sending')}
                {state === "sent"    && t('contact.form.submit_sent')}
                {state === "error"   && t('contact.form.submit_error')}
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
