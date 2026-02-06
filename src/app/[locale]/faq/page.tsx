import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { supabase } from '@/lib/supabase'
import { getLocalizedContent } from '@/lib/utils'
import { Button } from '@/components/ui'
import { FAQList } from '@/components/FAQList'
import { ArrowRight, HelpCircle } from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale as Locale)
  
  return {
    title: t('faq.title'),
    description: t('faq.subtitle'),
  }
}

async function getFAQs() {
  try {
    const table = process.env.SUPABASE_FAQ_TABLE || 'Faq'
    const { data, error } = await supabase.from(table).select('*').eq('visible', true).order('order', { ascending: true })
    if (error) {
      console.error('Supabase fetch faqs error:', error)
      return []
    }
    return data || []
  } catch (err) {
    console.error('getFAQs error:', err)
    return []
  }
}

export default async function FAQPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)
  const faqs = await getFAQs()

  const localizedFaqs = faqs.map((faq) => ({
    id: faq.id,
    question: getLocalizedContent(faq.questionEn, faq.questionDe, locale),
    answer: getLocalizedContent(faq.answerEn, faq.answerDe, locale),
  }))

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h1 className="text-habb-gray-900 mb-6">{t('faq.title')}</h1>
            <p className="text-xl text-habb-gray-600">{t('faq.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            {localizedFaqs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-habb-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HelpCircle className="w-12 h-12 text-habb-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-habb-gray-900 mb-2">
                  {t('faq.noFaqs')}
                </h3>
              </div>
            ) : (
              <FAQList faqs={localizedFaqs} />
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-habb-gray-50">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-habb-gray-900 mb-4">{t('faq.contact.title')}</h2>
            <p className="text-lg text-habb-gray-600 mb-8">
              {t('faq.contact.description')}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button size="lg">
                {t('faq.contact.button')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
