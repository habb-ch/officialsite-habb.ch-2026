import type { Metadata } from 'next'
import { Locale } from './i18n'
import { getSiteUrl } from './site'

const OG_IMAGE = '/logo.png'

interface BuildMetadataArgs {
  locale: Locale
  /** Route path below the locale segment, e.g. '' for home, '/about', '/services/habb-one' */
  path: string
  title: string
  description: string
  ogType?: 'website' | 'article'
  /** Set true for thin/duplicate or legal pages that should not be indexed */
  noindex?: boolean
}

/**
 * Single source of truth for per-page SEO metadata: absolute canonical,
 * full hreflang set (de-CH / en-CH / x-default → de) and Open Graph / Twitter.
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  ogType = 'website',
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const baseUrl = getSiteUrl()
  const cleanPath = path && !path.startsWith('/') ? `/${path}` : path
  const canonical = `${baseUrl}/${locale}${cleanPath}`
  const isGerman = locale === 'de'

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        'de-CH': `${baseUrl}/de${cleanPath}`,
        'en-CH': `${baseUrl}/en${cleanPath}`,
        'x-default': `${baseUrl}/de${cleanPath}`,
      },
    },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: isGerman ? 'Habb Schweiz' : 'Habb Switzerland',
      locale: isGerman ? 'de_CH' : 'en_CH',
      alternateLocale: isGerman ? 'en_CH' : 'de_CH',
      type: ogType,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Habb Schweiz' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  }
}
