import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLangSync } from '../hooks/useLangSync';
import { useProjects } from '../data/projectsApi';

const SITE_URL = 'https://rhstudioarsitek.my.id';
const COPY = {
  id: {
    title: 'RH Studio — Arsitektur & Desain Interior Indonesia',
    description:
      'RH Studio adalah studio arsitektur dan desain interior yang merancang rumah dan ruang personal di Indonesia. Layanan kami mencakup arsitektur residensial, desain interior, dan manajemen konstruksi.',
    locale: 'id_ID',
  },
  en: {
    title: 'RH Studio — Architecture & Interior Design Indonesia',
    description:
      'RH Studio is an architecture and interior design studio creating homes and personal spaces across Indonesia. Our services include residential architecture, interior design, and construction management.',
    locale: 'en_US',
  },
} as const;

export const SEO: React.FC = () => {
  useLangSync();
  const { i18n } = useTranslation();
  const projects = useProjects();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  const copy = COPY[lang];
  const canonicalUrl = lang === 'en' ? `${SITE_URL}/?lang=en` : `${SITE_URL}/`;

  const projectsJsonLd = projects.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: lang === 'en' ? 'RH Studio — Selected Works' : 'RH Studio — Karya Pilihan',
        itemListElement: projects.slice(0, 24).map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: `${project.title} ${project.titleAccent}`.trim(),
            image: project.img,
            locationCreated: project.location,
            dateCreated: String(project.year),
            about: lang === 'en' ? project.brief_en : project.brief,
          },
        })),
      }
    : null;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{copy.title}</title>
      <meta name="description" content={copy.description} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="theme-color" content="#d2a95d" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="id" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/?lang=en`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="RH Studio" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={copy.title} />
      <meta property="og:description" content={copy.description} />
      <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="RH Studio — architecture and interior design" />
      <meta property="og:locale" content={copy.locale} />
      <meta property="og:locale:alternate" content={lang === 'en' ? 'id_ID' : 'en_US'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={copy.title} />
      <meta name="twitter:description" content={copy.description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />
      {projectsJsonLd && (
        <script type="application/ld+json">{JSON.stringify(projectsJsonLd)}</script>
      )}
    </Helmet>
  );
};
