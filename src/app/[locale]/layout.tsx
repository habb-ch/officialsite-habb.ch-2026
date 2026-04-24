import { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import { Locale, isValidLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://habb.ch'
  const isGerman = locale === 'de'
  
  const siteTitle = isGerman ? 'Habb Schweiz | Fuehrende KI & Tech Loesungen' : 'Habb Switzerland | Leading AI & Tech Solutions'
  const description = isGerman
    ? 'Habb Schweiz bietet erstklassige Technologie- und KI-Lösungen, die mit Schweizer Präzision und Innovation entwickelt wurden.' 
    : 'Habb Switzerland provides enterprise-grade technology and AI solutions built with Swiss precision and innovation.'

  return {
    title: {
      default: siteTitle,
      template: `%s | ${isGerman ? 'Habb Schweiz' : 'Habb Switzerland'}`,
    },
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en-CH': `${baseUrl}/en`,
        'de-CH': `${baseUrl}/de`,
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
