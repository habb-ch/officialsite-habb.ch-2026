import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { Shield, Server, Headphones, Lightbulb } from 'lucide-react'

interface FeaturesSectionProps {
  locale: Locale
}

export function FeaturesSection({ locale }: FeaturesSectionProps) {
  const t = getTranslations(locale)

  const features = [
    {
      icon: Shield,
      title: t('home.features.security.title'),
      description: t('home.features.security.description'),
    },
    {
      icon: Server,
      title: t('home.features.reliability.title'),
      description: t('home.features.reliability.description'),
    },
    {
      icon: Headphones,
      title: t('home.features.support.title'),
      description: t('home.features.support.description'),
    },
    {
      icon: Lightbulb,
      title: t('home.features.innovation.title'),
      description: t('home.features.innovation.description'),
    },
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="text-habb-gray-900 mb-4">{t('home.features.title')}</h2>
          <p className="text-lg text-habb-gray-600 max-w-2xl mx-auto">
            {t('home.features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-habb-gray-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-habb-gray-200 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-swiss-red/10 flex items-center justify-center mb-6 group-hover:bg-swiss-red group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-swiss-red group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-habb-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-habb-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
