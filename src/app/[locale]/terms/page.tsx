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
    title: t('terms.title'),
  }
}

export default async function TermsPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)

  const sections = [
    {
      title: t('terms.sections.acceptance.title'),
      content: t('terms.sections.acceptance.content'),
    },
    {
      title: t('terms.sections.services.title'),
      content: t('terms.sections.services.content'),
    },
    {
      title: t('terms.sections.intellectual.title'),
      content: t('terms.sections.intellectual.content'),
    },
    {
      title: t('terms.sections.liability.title'),
      content: t('terms.sections.liability.content'),
    },
    {
      title: t('terms.sections.governing.title'),
      content: t('terms.sections.governing.content'),
    },
    {
      title: t('terms.sections.changes.title'),
      content: t('terms.sections.changes.content'),
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-habb-gray-900 mb-4">{t('terms.title')}</h1>
            <p className="text-habb-gray-500">
              {t('terms.lastUpdated', { date: 'January 1, 2026' })}
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
                    {index + 1}. {section.title}
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
                {locale === 'de' ? 'Rechtliche Fragen' : 'Legal Inquiries'}
              </h3>
              <div className="text-habb-gray-600 space-y-2">
                <p>Habb.ch AG</p>
                <p>Bahnhofstrasse 1</p>
                <p>8001 Zürich, {locale === 'de' ? 'Schweiz' : 'Switzerland'}</p>
                <p className="mt-4">
                  <a href="mailto:legal@habb.ch" className="text-swiss-red hover:underline">
                    legal@habb.ch
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
