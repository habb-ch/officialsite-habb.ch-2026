import { Metadata } from 'next'
import { Locale } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/site'
import { organizationLd, webSiteLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/JsonLd'
import {
  HeroSection,
  NewProductSection,
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
    ? 'Habb Schweiz | KI-Automatisierung & Tech-Lösungen für Schweizer KMU'
    : 'Habb Switzerland | AI Automation & Tech Solutions for Swiss SMEs'
  const description = isGerman
    ? 'Habb Schweiz liefert KI-Automatisierung, Software und ERP-Lösungen für Schweizer KMU – entwickelt mit Schweizer Präzision, Qualität und Innovation.'
    : 'Habb Switzerland delivers AI automation, software and ERP solutions for Swiss SMEs – built with Swiss precision, quality and innovation.'

  return {
    title: { absolute: title },
    description,
    keywords: isGerman
      ? ['Habb Schweiz', 'Habb Switzerland', 'KI-Automatisierung Schweiz', 'Technologie-Lösungen Schweiz', 'ERP Schweizer KMU', 'Software Schweiz']
      : ['Habb Switzerland', 'Habb Schweiz', 'AI automation Switzerland', 'technology solutions Switzerland', 'ERP Swiss SME'],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'de-CH': `${baseUrl}/de`,
        'en-CH': `${baseUrl}/en`,
        'x-default': `${baseUrl}/de`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      locale: isGerman ? 'de_CH' : 'en_CH',
      alternateLocale: isGerman ? 'en_CH' : 'de_CH',
      type: 'website',
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: isGerman ? 'Habb Schweiz' : 'Habb Switzerland' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.png'],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  return (
    <>
      <JsonLd data={[organizationLd(locale), webSiteLd(locale)]} />
      <HeroSection locale={locale} />
      <NewProductSection locale={locale} />
      <FeaturesSection locale={locale} />
      <AboutSection locale={locale} />
      <ServicesSection locale={locale} />
      <CTASection locale={locale} />
    </>
  )
}
