import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'

interface AboutSectionProps {
  locale: Locale
}

export function AboutSection({ locale }: AboutSectionProps) {
  const t = getTranslations(locale)

  const stats = [
    { value: '35+', label: t('home.about.stat1') },
    { value: '40+', label: t('home.about.stat2') },
    { value: '4+', label: t('home.about.stat3') },
    { value: '99.9%', label: t('home.about.stat4') },
  ]

  return (
    <section className="section-padding bg-habb-gray-900 text-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-white mb-6">{t('home.about.title')}</h2>
            <p className="text-lg text-habb-gray-300 leading-relaxed mb-8">
              {t('home.about.description')}
            </p>
            
            {/* Swiss design element */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <rect x="2" y="2" width="36" height="36" rx="4" fill="#DA291C" />
                  <rect x="16" y="8" width="8" height="24" fill="white" />
                  <rect x="8" y="16" width="24" height="8" fill="white" />
                </svg>
              </div>
              <span className="text-habb-gray-400 text-sm">
                Swiss Quality • Swiss Precision • Swiss Reliability
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-habb-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-habb-gray-700/50 hover:border-swiss-red/50 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-bold text-swiss-red mb-2">
                  {stat.value}
                </div>
                <div className="text-habb-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
