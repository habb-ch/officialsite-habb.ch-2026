import { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import { Locale, isValidLocale } from '@/lib/i18n'
import { getSiteUrl } from '@/lib/site'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = getSiteUrl()
  const isGerman = locale === 'de'
  
  const siteTitle = isGerman
    ? 'Habb Schweiz | Führende KI- & Tech-Lösungen aus der Schweiz'
    : 'Habb Switzerland | Leading AI & Tech Solutions'
  const description = isGerman
    ? 'Habb Schweiz bietet erstklassige Technologie- und KI-Lösungen, entwickelt mit Schweizer Präzision und Innovation. Automatisierung, Software & ERP für Schweizer KMU.'
    : 'Habb Switzerland provides enterprise-grade technology and AI solutions built with Swiss precision and innovation. Automation, software & ERP for Swiss SMEs.'

  return {
    title: {
      default: siteTitle,
      template: `%s | ${isGerman ? 'Habb Schweiz' : 'Habb Switzerland'}`,
    },
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'de-CH': `${baseUrl}/de`,
        'en-CH': `${baseUrl}/en`,
        'x-default': `${baseUrl}/de`,
      },
    },
    openGraph: {
      title: siteTitle,
      description,
      url: `${baseUrl}/${locale}`,
      locale: isGerman ? 'de_CH' : 'en_CH',
      alternateLocale: isGerman ? 'en_CH' : 'de_CH',
      siteName: isGerman ? 'Habb Schweiz' : 'Habb Switzerland',
      type: 'website',
      images: [{ url: '/logo.png', width: 1200, height: 630, alt: isGerman ? 'Habb Schweiz' : 'Habb Switzerland' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description,
      images: ['/logo.png'],
    },
  }
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params
  
  if (!isValidLocale(localeParam)) {
    notFound()
  }
  
  const locale = localeParam as Locale

  return (
    <>
      <Header locale={locale} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer locale={locale} />
    </>
  )
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }]
}
