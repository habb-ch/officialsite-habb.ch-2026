import Link from 'next/link'
import { Locale } from '@/lib/i18n'
import { getTranslations } from '@/lib/translations'
import { Button } from '@/components/ui'
import { Sparkles, ArrowRight } from 'lucide-react'

interface NewProductSectionProps {
  locale: Locale
}

export function NewProductSection({ locale }: NewProductSectionProps) {
  const t = getTranslations(locale)

  const keyFeatures = JSON.parse(t('services.habbOne.keyFeatures') || '[]') as {
    icon: string
    title: string
    description: string
  }[]

  return (
    <section className="section-padding bg-habb-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-swiss-red/20 via-transparent to-transparent pointer-events-none" />
      <div className="container-wide relative">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-swiss-red px-4 py-1.5 text-sm font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            {t('services.habbOne.badge')}
          </span>
          <h2 className="text-white mb-4">{t('services.habbOne.teaserTitle')}</h2>
          <p className="text-xl text-habb-gray-300 mb-8 max-w-2xl">
            {t('services.habbOne.teaserText')}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {keyFeatures.map((feature, i) => (
              <span
                key={i}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-habb-gray-200"
              >
                {feature.title}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/services/habb-one`}>
              <Button size="lg" className="bg-swiss-red hover:bg-swiss-red-dark">
                {t('services.habbOne.teaserCta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/contact`}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {t('common.contactUs')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
