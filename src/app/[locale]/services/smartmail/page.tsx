import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { Button } from '@/components/ui'
import {
  ArrowRight,
  Mail,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Zap,
  Database,
} from 'lucide-react'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale as Locale)

  return {
    title: t('services.smartmail.productName'),
    description: t('services.smartmail.tagline'),
  }
}

export default async function SmartMailPage({ params }: PageProps) {
  const { locale: localeParam } = await params
  const locale = localeParam as Locale
  const t = getTranslations(locale)

  const overviewParagraphs = (t('services.smartmail.overviewText') || '').split('\n').filter(Boolean)

  const keyFeatures = JSON.parse(t('services.smartmail.keyFeatures') || '[]') as {
    icon: string
    title: string
    description: string
  }[]

  const iconMap: Record<string, React.ElementType> = {
    Mail,
    FileText,
    Zap,
    CheckCircle2,
    ShieldCheck,
    Database,
  }

  return (
    <>
      {/* Hero / Header Section */}
      <section className="section-padding bg-gradient-to-br from-habb-gray-50 via-white to-habb-gray-50">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sm font-semibold text-swiss-red uppercase tracking-widest mb-4">
                {t('services.smartmail.sectionTitle')}
              </span>
              <h1 className="text-habb-gray-900 mb-4">{t('services.smartmail.productName')}</h1>
              <p className="text-xl font-medium text-swiss-red mb-6">
                {t('services.smartmail.tagline')}
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
                    {t('services.smartmail.backToServices')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/habb-smartmail.png"
                alt={t('services.smartmail.productName')}
                width={700}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
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
                {t('services.smartmail.overviewTitle')}
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
                {t('services.smartmail.keyFeaturesTitle')}
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
          <h2 className="text-white mb-6">{t('services.smartmail.ctaTitle')}</h2>
          <p className="text-lg text-habb-gray-300 mb-10 max-w-2xl mx-auto">
            {t('services.smartmail.ctaDescription')}
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
