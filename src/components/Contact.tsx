import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';
import { CMS_URL } from '../data/projectsApi';

const MAX_NAME_LENGTH = 50;
const MAX_WHATSAPP_LENGTH = 11;
const MAX_AREA_LENGTH = 50;
const MAX_ADDRESS_LENGTH = 500;
const INDONESIAN_WHATSAPP = /^8\d{8,10}$/;
const UNSAFE_TEXT = /[<>]/;
const FIELD_LIMITS: Record<string, number> = {
  name: MAX_NAME_LENGTH,
  whatsapp: MAX_WHATSAPP_LENGTH,
  area: MAX_AREA_LENGTH,
  address: MAX_ADDRESS_LENGTH,
};

const clean = (value: string) => value.trim().replace(/\s+/g, ' ');
const normalizedPhone = (value: string) => value.replace(/[\s().-]/g, '');

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", whatsapp: "", area: "", need: "design", address: "", website: "" });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [state, setState] = useState("idle");

  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const limit = FIELD_LIMITS[k];
    const rawValue = k === 'whatsapp' ? e.target.value.replace(/\D/g, '') : e.target.value;
    const value = limit ? rawValue.slice(0, limit) : rawValue;
    setForm((current) => ({ ...current, [k]: value }));
  };
  const setNeed = (v: string) => setForm((f) => ({ ...f, need: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: {[key: string]: string} = {};
    const name = clean(form.name);
    const whatsapp = normalizedPhone(clean(form.whatsapp));
    const fullWhatsapp = `+62${whatsapp}`;
    const area = clean(form.area);
    const address = clean(form.address);
    if (!name) errs.name = t('contact.form.error_required');
    else if (name.length > MAX_NAME_LENGTH || UNSAFE_TEXT.test(name)) errs.name = t('contact.form.error_name');
    // WhatsApp is the channel people actually reply on here, so it carries the requirement.
    if (!whatsapp) errs.whatsapp = t('contact.form.error_required');
    else if (!INDONESIAN_WHATSAPP.test(whatsapp))
      errs.whatsapp = t('contact.form.error_whatsapp');
    if (!area) errs.area = t('contact.form.error_required');
    else if (area.length > MAX_AREA_LENGTH || UNSAFE_TEXT.test(area)) errs.area = t('contact.form.error_area');
    if (!address) errs.address = t('contact.form.error_required');
    else if (address.length > MAX_ADDRESS_LENGTH || UNSAFE_TEXT.test(address)) errs.address = t('contact.form.error_address');
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const reset = () => setTimeout(() => {
      setState("idle");
      setForm({ name: "", whatsapp: "", area: "", need: "design", address: "", website: "" });
    }, 3000);

    // A bot that fills every field trips the honeypot. Show it the same
    // success it would have got, so it has nothing to probe against.
    if (form.website) { setState("sent"); reset(); return; }

    const text = [
      `Nama: ${name}`,
      `No. Whatsapp: ${fullWhatsapp}`,
      `Luas area: ${area}`,
      `Kebutuhan: ${t(`contact.form.need_${form.need}`)}`,
      `Alamat: ${address}`,
    ].join('\n');
    setState("sending");
    window.open(`https://wa.me/6285718212121?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    try {
      const res = await fetch(`${CMS_URL}/items/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          whatsapp: fullWhatsapp,
          area,
          need: ['design', 'build', 'design_build'].includes(form.need) ? form.need : 'design',
          address,
        }),
      });
      if (!res.ok) throw new Error(`Directus ${res.status}`);
      setState("sent");
      reset();
    } catch (err) {
      console.error('[contact] gagal menyimpan inquiry:', err);
      setState("error");
      setTimeout(() => setState("idle"), 5000);
    }
  };

  const needs = [
    { k: "design", l: t('contact.form.need_design') },
    { k: "build", l: t('contact.form.need_build') },
    { k: "design_build", l: t('contact.form.need_design_build') },
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
                <a href="https://maps.app.goo.gl/uKBteHkghdgAUyhN7" target="_blank" rel="noopener noreferrer">
                  Ruko Puri Aster<br/>
                  Jl. Boulevard Grand Depok City<br/>
                  Sukmajaya, Kota Depok<br/>
                  Jawa Barat 16412
                </a>
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
                <input id="contact-name" type="text" maxLength={MAX_NAME_LENGTH} value={form.name} onChange={update("name")} placeholder={t('contact.form.name_placeholder')} />
                {errors.name && <span className="field__error">{errors.name}</span>}
              </div>
              <div className={"field" + (errors.whatsapp ? " field--error" : "")}>
                <label className="mono" htmlFor="contact-whatsapp">{t('contact.form.whatsapp_label')}</label>
                <div className="phone-input">
                  <span className="phone-input__prefix" aria-hidden="true">+62</span>
                  <input id="contact-whatsapp" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={MAX_WHATSAPP_LENGTH} value={form.whatsapp} onChange={update("whatsapp")} placeholder={t('contact.form.whatsapp_placeholder')} />
                </div>
                {errors.whatsapp && <span className="field__error">{errors.whatsapp}</span>}
              </div>
            </div>

            <div className={"field" + (errors.area ? " field--error" : "")}>
              <label className="mono" htmlFor="contact-area">{t('contact.form.area_label')}</label>
              <input id="contact-area" type="text" maxLength={MAX_AREA_LENGTH} value={form.area} onChange={update("area")} placeholder={t('contact.form.area_placeholder')} />
              {errors.area && <span className="field__error">{errors.area}</span>}
            </div>

            <div className="field">
              <label className="mono" id="contact-need-label">{t('contact.form.need_label')}</label>
              <div className="chip-row" role="group" aria-labelledby="contact-need-label">
                {needs.map((c) => (
                  <button
                    type="button"
                    key={c.k}
                    className={"chip" + (form.need === c.k ? " is-active" : "")}
                    aria-pressed={form.need === c.k}
                    onClick={() => setNeed(c.k)}
                  >{c.l}</button>
                ))}
              </div>
            </div>

            <div className={"field" + (errors.address ? " field--error" : "")}>
              <label className="mono" htmlFor="contact-address">{t('contact.form.address_label')}</label>
              <textarea id="contact-address" rows={4} maxLength={MAX_ADDRESS_LENGTH} value={form.address} onChange={update("address")} placeholder={t('contact.form.address_placeholder')}></textarea>
              {errors.address && <span className="field__error">{errors.address}</span>}
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
