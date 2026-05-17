import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { buildPageMetadata } from '@/lib/seo'
import { softwareApplicationLd, breadcrumbLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/JsonLd'
import { Button } from '@/components/ui'
import {
  ArrowRight,
  Clock,
  Users,
  FileText,
  Calendar,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale as Locale)

  return buildPageMetadata({
    locale: locale as Locale,
    path: '/services/habb-one',
    title: t('services.habbOne.productName'),
    description: t('services.habbOne.tagline'),
  })
}

export default async function HabbOnePage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)

  const overviewParagraphs = (t('services.habbOne.overviewText') || '').split('\n').filter(Boolean)

  const keyFeatures = JSON.parse(t('services.habbOne.keyFeatures') || '[]') as {
    icon: string
    title: string
    description: string
  }[]

  const iconMap: Record<string, React.ElementType> = {
    Clock,
    Users,
    FileText,
    Calendar,
    BarChart3,
    ShieldCheck,
  }

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationLd({
            locale,
            name: t('services.habbOne.productName'),
            description: t('services.habbOne.tagline'),
            path: '/services/habb-one',
          }),
          breadcrumbLd(locale, [
            { name: t('nav.home'), path: '' },
            { name: t('nav.services'), path: '/services' },
            { name: t('services.habbOne.sectionTitle'), path: '/services/habb-one' },
          ]),
        ]}
      />
      {/* Hero / Header Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-semibold text-swiss-red uppercase tracking-widest mb-4">
                {t('services.habbOne.sectionTitle')}
              </span>
              <h1 className="text-habb-gray-900 mb-4">{t('services.habbOne.productName')}</h1>
              <p className="text-xl font-medium text-swiss-red mb-6">
                {t('services.habbOne.tagline')}
              </p>
              <p className="text-lg text-habb-gray-600 mb-8">
                {overviewParagraphs[0]}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/contact`}>
                  <Button size="lg">
                    {t('common.contactUs')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${locale}/services`}>
                  <Button size="lg" variant="outline">
                    {t('services.habbOne.backToServices')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-habb-gray-900 p-10 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                {keyFeatures.map((feature, i) => {
                  const Icon = iconMap[feature.icon] ?? CheckCircle2
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-3 rounded-xl bg-white/5 p-5 border border-white/10"
                    >
                      <div className="w-10 h-10 rounded-lg bg-swiss-red/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-swiss-red" />
                      </div>
                      <span className="text-sm font-medium text-white leading-snug">
                        {feature.title}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-habb-gray-900 mb-6">
                {t('services.habbOne.overviewTitle')}
              </h2>
              <div className="space-y-4">
                {overviewParagraphs.map((paragraph, i) => (
                  <p key={i} className="text-lg text-habb-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-3xl font-bold text-habb-gray-900 mb-6">
                {t('services.habbOne.keyFeaturesTitle')}
              </h2>
              <div className="space-y-5">
                {keyFeatures.map((feature, i) => {
                  const Icon = iconMap[feature.icon] ?? CheckCircle2
                  return (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-habb-gray-50 hover:bg-habb-gray-100 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-swiss-red/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-swiss-red" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-habb-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-habb-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-habb-gray-900 text-white">
        <div className="container-wide text-center">
          <h2 className="text-white mb-6">{t('services.habbOne.ctaTitle')}</h2>
          <p className="text-lg text-habb-gray-300 mb-10 max-w-2xl mx-auto">
            {t('services.habbOne.ctaDescription')}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="bg-swiss-red hover:bg-swiss-red-dark">
              {t('common.contactUs')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
