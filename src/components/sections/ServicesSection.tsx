import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { Cloud, Users, Code, Shield, Settings, Database, ArrowRight } from 'lucide-react'

interface ServicesSectionProps {
  locale: Locale
}

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = getTranslations(locale)

  const services = [
    {
      icon: Cloud,
      title: t('services.cloud.title'),
      description: t('services.cloud.description'),
      href: `/${locale}/services#cloud`,
    },
    {
      icon: Users,
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
      href: `/${locale}/services#consulting`,
    },
    {
      icon: Code,
      title: t('services.development.title'),
      description: t('services.development.description'),
      href: `/${locale}/services#development`,
    },
    {
      icon: Shield,
      title: t('services.security.title'),
      description: t('services.security.description'),
      href: `/${locale}/services#security`,
    },
    {
      icon: Settings,
      title: t('services.managed.title'),
      description: t('services.managed.description'),
      href: `/${locale}/services#managed`,
    },
    {
      icon: Database,
      title: t('services.data.title'),
      description: t('services.data.description'),
      href: `/${locale}/services#data`,
    },
  ]

  return (
    <section className="section-padding bg-habb-gray-50">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-habb-gray-900 mb-4">{t('home.services.title')}</h2>
          <p className="text-lg text-habb-gray-600 max-w-2xl mx-auto">
            {t('home.services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group bg-white rounded-2xl p-8 border border-habb-gray-200 hover:border-swiss-red/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-swiss-red/10 flex items-center justify-center mb-6 group-hover:bg-swiss-red transition-colors">
                <service.icon className="w-7 h-7 text-swiss-red group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-habb-gray-900 mb-3 group-hover:text-swiss-red transition-colors">
                {service.title}
              </h3>
              <p className="text-habb-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>
              <span className="inline-flex items-center text-swiss-red font-medium text-sm group-hover:gap-2 transition-all">
                {t('common.learnMore')}
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 text-swiss-red font-semibold hover:gap-3 transition-all"
          >
            {t('home.services.viewAll')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
