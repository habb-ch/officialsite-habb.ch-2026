import { Locale } from './i18n'
import { getSiteUrl } from './site'

const NAME_DE = 'Habb Schweiz'
const NAME_EN = 'Habb Switzerland'
const EMAIL = 'info@habb.ch'
const PHONE = '+41799239772'

function orgName(locale: Locale) {
  return locale === 'de' ? NAME_DE : NAME_EN
}

/** Organization + LocalBusiness — powers the Knowledge Panel and local SEO. */
export function organizationLd(locale: Locale) {
  const baseUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: orgName(locale),
    legalName: 'Habb',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/logo.png`,
    email: EMAIL,
    telephone: PHONE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sonnheimstrasse 6',
      postalCode: '3415',
      addressLocality: 'Rüegsauschachen',
      addressRegion: 'Bern',
      addressCountry: 'CH',
    },
    areaServed: { '@type': 'Country', name: 'Switzerland' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE,
      email: EMAIL,
      contactType: 'customer service',
      availableLanguage: ['de', 'en'],
    },
    sameAs: [] as string[],
  }
}

export function webSiteLd(locale: Locale) {
  const baseUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: orgName(locale),
    url: `${baseUrl}/${locale}`,
    inLanguage: locale === 'de' ? 'de-CH' : 'en-CH',
    publisher: { '@id': `${baseUrl}/#organization` },
  }
}

interface Crumb {
  name: string
  path: string
}

export function breadcrumbLd(locale: Locale, crumbs: Crumb[]) {
  const baseUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${baseUrl}/${locale}${c.path}`,
    })),
  }
}

export function softwareApplicationLd(args: {
  locale: Locale
  name: string
  description: string
  path: string
}) {
  const baseUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: args.name,
    description: args.description,
    url: `${baseUrl}/${args.locale}${args.path}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: ['de', 'en'],
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'CHF',
      price: '0',
      description: args.locale === 'de' ? 'Auf Anfrage' : 'On request',
    },
    provider: { '@id': `${baseUrl}/#organization` },
  }
}

export function faqPageLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export function articleLd(args: {
  locale: Locale
  title: string
  description: string
  path: string
  datePublished?: string
  dateModified?: string
  image?: string
}) {
  const baseUrl = getSiteUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: args.title,
    description: args.description,
    url: `${baseUrl}/${args.locale}${args.path}`,
    inLanguage: args.locale === 'de' ? 'de-CH' : 'en-CH',
    ...(args.image ? { image: args.image } : {}),
    ...(args.datePublished ? { datePublished: args.datePublished } : {}),
    ...(args.dateModified ? { dateModified: args.dateModified } : {}),
    author: { '@id': `${baseUrl}/#organization` },
    publisher: { '@id': `${baseUrl}/#organization` },
  }
}
