import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { Button } from '@/components/ui'
import { Cloud, Users, Code, Shield, Settings, Database, Check, ArrowRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale as Locale)
  
  return {
    title: t('services.hero.title'),
    description: t('services.hero.subtitle'),
  }
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)

  const services = [
    {
      id: 'cloud',
      icon: Cloud,
      title: t('services.cloud.title'),
      description: t('services.cloud.description'),
      features: JSON.parse(t('services.cloud.features') || '[]'),
    },
    {
      id: 'consulting',
      icon: Users,
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
      features: JSON.parse(t('services.consulting.features') || '[]'),
    },
    {
      id: 'development',
      icon: Code,
      title: t('services.development.title'),
      description: t('services.development.description'),
      features: JSON.parse(t('services.development.features') || '[]'),
    },
    {
      id: 'security',
      icon: Shield,
      title: t('services.security.title'),
      description: t('services.security.description'),
      features: JSON.parse(t('services.security.features') || '[]'),
    },
    {
      id: 'managed',
      icon: Settings,
      title: t('services.managed.title'),
      description: t('services.managed.description'),
      features: JSON.parse(t('services.managed.features') || '[]'),
    },
    {
      id: 'data',
      icon: Database,
      title: t('services.data.title'),
      description: t('services.data.description'),
      features: JSON.parse(t('services.data.features') || '[]'),
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-habb-gray-900 mb-6">{t('services.hero.title')}</h1>
            <p className="text-xl text-habb-gray-600">{t('services.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 rounded-2xl bg-swiss-red/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-swiss-red" />
                  </div>
                  <h2 className="text-3xl font-bold text-habb-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-habb-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-habb-gray-700">
                        <Check className="w-5 h-5 text-swiss-red flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${locale}/contact`}>
                    <Button>
                      {t('common.contactUs')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="aspect-video bg-gradient-to-br from-habb-gray-100 to-habb-gray-50 rounded-2xl flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-habb-gray-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-habb-gray-900 text-white">
        <div className="container-wide text-center">
          <h2 className="text-white mb-6">{t('services.cta.title')}</h2>
          <p className="text-lg text-habb-gray-300 mb-10 max-w-2xl mx-auto">
            {t('services.cta.description')}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="bg-swiss-red hover:bg-swiss-red-dark">
              {t('services.cta.button')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
