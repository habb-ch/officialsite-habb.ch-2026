import { Metadata } from 'next'
import { Locale } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/site'
import { 
  HeroSection, 
  FeaturesSection, 
  AboutSection, 
  ServicesSection, 
  CTASection 
} from '@/components/sections'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getSiteUrl()
  const isGerman = locale === 'de'
  const title = isGerman
    ? 'Habb Schweiz | KI Automation und Tech Loesungen in der Schweiz'
    : 'Habb Switzerland | AI Automation and Tech Solutions in Switzerland'
  const description = isGerman
    ? 'Habb Schweiz liefert KI-Automation und Technologie-Loesungen fuer Schweizer Unternehmen mit Fokus auf Qualitaet und Praezision.'
    : 'Habb Switzerland delivers AI automation and technology solutions for Swiss companies with a focus on quality and precision.'
  
  return {
    title,
    description,
    keywords: isGerman
      ? ['Habb Schweiz', 'Habb Switzerland', 'KI Automation Schweiz', 'Technologie Loesungen Schweiz']
      : ['Habb Switzerland', 'Habb Schweiz', 'AI automation Switzerland', 'technology solutions Switzerland'],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en-CH': `${baseUrl}/en`,
        'de-CH': `${baseUrl}/de`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      locale: isGerman ? 'de_CH' : 'en_CH',
      alternateLocale: isGerman ? 'en_CH' : 'de_CH',
      type: 'website',
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const baseUrl = getSiteUrl()
  const isGerman = locale === 'de'
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isGerman ? 'Habb Schweiz' : 'Habb Switzerland',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [],
  }
  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isGerman ? 'Habb Schweiz' : 'Habb Switzerland',
    url: `${baseUrl}/${locale}`,
    inLanguage: isGerman ? 'de-CH' : 'en-CH',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <HeroSection locale={locale} />
      <FeaturesSection locale={locale} />
      <AboutSection locale={locale} />
      <ServicesSection locale={locale} />
      <CTASection locale={locale} />
    </>
  )
}
