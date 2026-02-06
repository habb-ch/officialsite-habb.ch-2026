import { Metadata } from 'next'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
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
  const t = getTranslations(locale as Locale)
  
  return {
    title: t('home.hero.title'),
    description: t('home.hero.subtitle'),
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale

  return (
    <>
      <HeroSection locale={locale} />
      <FeaturesSection locale={locale} />
      <AboutSection locale={locale} />
      <ServicesSection locale={locale} />
      <CTASection locale={locale} />
    </>
  )
}
