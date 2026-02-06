import { Metadata } from 'next'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale as Locale)
  
  return {
    title: t('privacy.title'),
  }
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)

  const sections = [
    {
      title: t('privacy.sections.intro.title'),
      content: t('privacy.sections.intro.content'),
    },
    {
      title: t('privacy.sections.collection.title'),
      content: t('privacy.sections.collection.content'),
    },
    {
      title: t('privacy.sections.usage.title'),
      content: t('privacy.sections.usage.content'),
    },
    {
      title: t('privacy.sections.security.title'),
      content: t('privacy.sections.security.content'),
    },
    {
      title: t('privacy.sections.rights.title'),
      content: t('privacy.sections.rights.content'),
    },
    {
      title: t('privacy.sections.contact.title'),
      content: t('privacy.sections.contact.content'),
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-habb-gray-900 mb-4">{t('privacy.title')}</h1>
            <p className="text-habb-gray-500">
              {t('privacy.lastUpdated', { date: 'January 1, 2026' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-semibold text-habb-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-lg text-habb-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-16 p-8 bg-habb-gray-50 rounded-2xl">
              <h3 className="text-xl font-semibold text-habb-gray-900 mb-4">
                {locale === 'de' ? 'Datenschutzbeauftragter' : 'Data Protection Officer'}
              </h3>
              <div className="text-habb-gray-600 space-y-2">
                <p>Habb.ch</p>
                <p>Sonnheimstrasse 6</p>
                <p>3415 Rüegsauschachen, {locale === 'de' ? 'Schweiz' : 'Switzerland'}</p>
                <p className="mt-4">
                  <a href="mailto:privacy@habb.ch" className="text-swiss-red hover:underline">
                    privacy@habb.ch
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
