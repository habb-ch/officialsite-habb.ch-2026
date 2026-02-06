import { Header, Footer } from '@/components/layout'
import { Locale, isValidLocale, defaultLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

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
