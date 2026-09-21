import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useLangSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const next = i18n.language === 'en' ? 'en' : null;
    const current = url.searchParams.get('lang');

    if (current === next) return;
    if (next) url.searchParams.set('lang', next);
    else url.searchParams.delete('lang');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }, [i18n.language]);
}
